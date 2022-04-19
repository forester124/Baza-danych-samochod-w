package ssi.projec.demo;

import model.Car;
import model.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.Proxy;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private static final String CARS_DB_PATH = "C:\\Users\\Damian\\Desktop\\IdeasProjects\\SSI_Projekt\\demo\\src\\main\\resources\\listaSamochodow.json";
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Access-Control-Allow-Origin","http://localhost:3000");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
        JSONParser jsonParser = new JSONParser();
        PrintWriter out =  response.getWriter();
       String akcja = request.getParameter("akcja");
       switch (akcja){
           case "listaSamochodow":
               try (FileReader reader = new FileReader(CARS_DB_PATH))
               {
                   //Read JSON file
                   Object obj = jsonParser.parse(reader);

                   JSONArray listaSamochodow = (JSONArray) obj;

                   out.print(listaSamochodow);


               } catch (FileNotFoundException e) {
                   e.printStackTrace();
               } catch (IOException e) {
                   e.printStackTrace();
               } catch (ParseException e) {
                   e.printStackTrace();
               }

               break;
           case "zwrocSamochodPoId":
               Long idSamochodu = Long.parseLong(request.getParameter("id"));
               Car samochodDoZwrotu = null;
               samochodDoZwrotu = zwrocSamochodPoId(idSamochodu);
               out.print(parseJSONObject(samochodDoZwrotu));
               break;
           case "listaUlubionychSamochodow":
               Integer idUzytkownika = Integer.valueOf(request.getParameter("id"));
               User user = UserServlet.zwrocUzytkownikaPoId(idUzytkownika);
               List<Long> idUlubionychSamochodow = user.getListaUlubionychSamochodow();
               List<Car> listaSamochodow = odczytajListeSamochodow();
               List<Car> listaUlubionychSamochodow = new ArrayList<>();
               for (Car car: listaSamochodow) {
                    if(idUlubionychSamochodow.contains(car.getId())){
                        listaUlubionychSamochodow.add(car);
                    }
               }
               JSONArray parsedListaUlubionychSamochodow = new JSONArray();
               for (Car car :listaUlubionychSamochodow) {
                   JSONObject parsedCar = parseJSONObject(car);
                   parsedListaUlubionychSamochodow.add(parsedCar);
               }
               out.print(parsedListaUlubionychSamochodow);
       }
       out.flush();
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String akcja = request.getParameter("akcja");
        response.addHeader("Access-Control-Allow-Origin","http://localhost:3000");
        JSONParser jsonParser = new JSONParser();

        switch(akcja){
            case "dodajSamochod":
                JSONObject car = null;
                String obiekt = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                     car = (JSONObject) jsonParser.parse(obiekt);
                     car.put("id", zwrocNajwiekszeIdSamochoduBD() + 1) ;
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                JSONArray listaSamochodow = getlistaSamochodowBD();
                listaSamochodow.add(car);
                zapiszStanBDSamochodow(listaSamochodow);
                break;
            case "edytujSamochod":
                JSONObject car1 = null;
                String obiekt1 = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    car1 = (JSONObject) jsonParser.parse(obiekt1);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                listaSamochodow = getlistaSamochodowBD();
                listaSamochodow = removeCarFromJsonArray(car1, listaSamochodow);
                listaSamochodow.add(car1);
                zapiszStanBDSamochodow(listaSamochodow);
                break;
            case "usunSamochod":
                Long idSamochoduDoUsuniecia = Long.valueOf(request.getParameter("id"));
                listaSamochodow = getlistaSamochodowBD();
                Car carToDelete = zwrocSamochodPoId(idSamochoduDoUsuniecia);
                listaSamochodow = removeCarFromJsonArray(parseJSONObject(carToDelete), listaSamochodow);

                zapiszStanBDSamochodow(listaSamochodow);
                break;





        }
    }
    public void destroy() {
    }
    private JSONArray removeCarFromJsonArray(JSONObject car, JSONArray listaSamochodow) {
        for (int i = 0; i < listaSamochodow.size(); i++) {
            if(((Long) ((JSONObject)listaSamochodow.get(i)).get("id")).intValue() == ((Long) car.get("id"))){
                listaSamochodow.remove(i);
            }
        }
        return listaSamochodow;
    }

    private Long zwrocNajwiekszeIdSamochoduBD(){
        List<Car> listaSamochodow = odczytajListeSamochodow();
        return listaSamochodow.stream()
                .sorted(Comparator.comparingLong(Car::getId).reversed())
                .limit(1).collect(Collectors.toList()).get(0).getId();
    }
    public  Car zwrocSamochodPoId(Long id){
        List<Car> listaSamochodow = odczytajListeSamochodow();
        return listaSamochodow.stream()
                .filter(car -> car.getId() == id).collect(Collectors.toList())
                .get(0);
    }
    private  List<Car> odczytajListeSamochodow(){
        JSONParser jsonParser = new JSONParser();
        List<Car> listaSamochodowZw = new ArrayList<>();
        try (FileReader reader = new FileReader(CARS_DB_PATH))
        {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            JSONArray listaSamochodow = (JSONArray) obj;


            listaSamochodowZw = (List<Car>) listaSamochodow.stream().map(car -> parseCarObject((JSONObject) car )).collect(Collectors.toList());


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return listaSamochodowZw;
    }
    private JSONArray getlistaSamochodowBD(){
        JSONParser jsonParser = new JSONParser();
        JSONArray listaSamochodow = null;
        try (FileReader reader = new FileReader(CARS_DB_PATH))
        {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            listaSamochodow = (JSONArray) obj;



        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return listaSamochodow;
    }
    private void zapiszStanBDSamochodow(JSONArray listaSamochodow){
        try (FileWriter file = new FileWriter(CARS_DB_PATH)) {
            //We can write any JSONArray or JSONObject instance to the file
            file.write(listaSamochodow.toJSONString());
            file.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private  Car parseCarObject(JSONObject car) {

        Car parsedCar = new Car();

        parsedCar.setId(((Long) car.get("id")));
        parsedCar.setMarka((String) car.get("marka"));
        parsedCar.setModel((String) car.get("model"));
        Long h2 = (Long) car.get("rokProdukcji");
        parsedCar.setPojemnoscSilnika(h2.intValue());
        parsedCar.setTypNadwozia((String) car.get("typNadwozia"));
        parsedCar.setRodzajPaliwa((String) car.get("rodzajPaliwa"));
        Long h1 = (Long) car.get("rokProdukcji");
        parsedCar.setRokProdukcji(h1.intValue());
        parsedCar.setUrlGlowneZdjecie((String) car.get("urlGlowneZdjecie"));
        parsedCar.setUrlWszystkieZdjecia((List<String>) car.get("urlWszystkieZdjecia"));
        return parsedCar;
    }
    private JSONObject parseJSONObject(Car car) {
        JSONObject  parsedCar = new JSONObject();
        parsedCar.put("id" ,car.getId());
        parsedCar.put("marka", car.getMarka());
        parsedCar.put("model", car.getModel());
        parsedCar.put("pojemnoscSilnika", car.getPojemnoscSilnika());
        parsedCar.put("typNadwozia", car.getTypNadwozia());
        parsedCar.put("rodzajPaliwa", car.getRodzajPaliwa());
        parsedCar.put("rokProdukcji", car.getRokProdukcji());
        parsedCar.put("urlGlowneZdjecie", car.getUrlGlowneZdjecie());
        parsedCar.put("urlWszystkieZdjecia", car.getUrlWszystkieZdjecia());

        return parsedCar;
    }
    private List<String> parseJSONArrayToListOfStrings(JSONArray array){
        List<String> listToReturn = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            listToReturn.add((String) array.get(i));
        }
        return listToReturn;
    }


}