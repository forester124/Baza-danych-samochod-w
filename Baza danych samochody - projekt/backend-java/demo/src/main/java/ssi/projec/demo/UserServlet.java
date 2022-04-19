package ssi.projec.demo;

import model.Car;
import model.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet(name = "userServlet", value = "/user-servlet")
public class UserServlet extends HttpServlet {
    private static final String USER_DB_PATH = "C:\\Users\\Damian\\Desktop\\IdeasProjects\\SSI_Projekt\\demo\\src\\main\\resources\\listaUzytkownikow.json";

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
            case "listaUzytkownikow":
                try (FileReader reader = new FileReader(USER_DB_PATH))
                {
                    //Read JSON file
                    Object obj = jsonParser.parse(reader);

                    JSONArray listaUzytkownikow= (JSONArray) obj;

                    out.print(listaUzytkownikow);

                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                break;
            case "zwrocUzytkownikaPoId":
                Integer   idUzytkownika = Integer.valueOf(request.getParameter("id"));
                JSONObject user = parseJSONObject(zwrocUzytkownikaPoId(idUzytkownika));
                out.print(user);
                break;
        }
        out.flush();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =  response.getWriter();
        String akcja = request.getParameter("akcja");
        response.addHeader("Access-Control-Allow-Origin","http://localhost:3000");
        JSONParser jsonParser = new JSONParser();

        switch(akcja){
            case "dodajUzytkownika":
                JSONObject user = null;
                String obiekt = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    user = (JSONObject) jsonParser.parse(obiekt);
                    user.put("id", zwrocNajwiekszeIdUzytkownikaBD() + 1) ;
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                JSONArray listaUzytkownikow = getListaUzytkownikowBD();
                if(unikalnyEmail((String) user.get("email"))){
                    listaUzytkownikow.add(user);
                }else{
                    response.setStatus(420);
                }

                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;
            case "edytujUzytkownika":
                JSONObject user1 = null;
                String obiekt1 = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    user1 = (JSONObject) jsonParser.parse(obiekt1);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                listaUzytkownikow = getListaUzytkownikowBD();

                listaUzytkownikow = removeUserFromJsonArray1(user1,listaUzytkownikow);
                listaUzytkownikow.add(user1);
                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;
            case "usunUzytkownika":
                Integer idUzytkownikaDoUsuniecia = Integer.valueOf(request.getParameter("id"));
                listaUzytkownikow = getListaUzytkownikowBD();
                User userToDel = zwrocUzytkownikaPoId(idUzytkownikaDoUsuniecia);

                listaUzytkownikow = removeUserFromJsonArray(parseJSONObject(userToDel),listaUzytkownikow);

                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;
            case "zaloguj":
                JSONObject creds = null;
                String credentals = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    creds = (JSONObject) jsonParser.parse(credentals);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                String credsEmail = (String) creds.get("email");
                String credsHaslo = (String) creds.get("haslo");
                System.out.println(credsEmail + " " + credsHaslo);
                List<User> parsedListaUzytkownikow= odczytajListeUzytkownikow();
                System.out.println(parsedListaUzytkownikow);
                boolean isUserLogged = false;
                for (User u: parsedListaUzytkownikow) {
                    if(u.getEmail().equals(credsEmail) && u.getHaslo().equals(credsHaslo)){
                        out.print(parseJSONObject(u));
                        isUserLogged = true;
                        System.out.println(isUserLogged);
                    }
                }
                if(!isUserLogged){
                    response.setStatus(420);
                }
            case "dodajUlubionySamochod":
                Long idSamochoduDodanegoDoUlubionych = Long.valueOf(request.getParameter("idSamochodu"));
                JSONObject user3 = null;
                String obiekt2 = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    user3 = (JSONObject) jsonParser.parse(obiekt2);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                listaUzytkownikow = getListaUzytkownikowBD();
                listaUzytkownikow = removeUserFromJsonArray1(user3,listaUzytkownikow);

                User parsedUser3 = parseUserObject(user3);
                parsedUser3.dodajUlubionySamochod(idSamochoduDodanegoDoUlubionych);
                user3 = parseJSONObject(parsedUser3);

                listaUzytkownikow.add(user3);
                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;
            case "usunUlubionySamochod":
                Long idSamochoduUsunietegoZUlubionych = Long.valueOf(request.getParameter("idSamochodu"));
                JSONObject user4 = null;
                String obiekt3 = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
                try {
                    user4 = (JSONObject) jsonParser.parse(obiekt3);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                listaUzytkownikow = getListaUzytkownikowBD();
                listaUzytkownikow = removeUserFromJsonArray1(user4, listaUzytkownikow);
                User parsedUser4 = parseUserObject(user4);

                parsedUser4.usunUlubionySamochod(idSamochoduUsunietegoZUlubionych);
                user4 = parseJSONObject(parsedUser4);
                listaUzytkownikow.add(user4);
                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;

            case "zmienStatus":
                Integer idUzytkownika = Integer.valueOf(request.getParameter("id"));
                listaUzytkownikow = getListaUzytkownikowBD();
                User userToChangeStatus = zwrocUzytkownikaPoId(idUzytkownika);
                listaUzytkownikow = removeUserFromJsonArray(parseJSONObject(userToChangeStatus),listaUzytkownikow);
                userToChangeStatus.setStatus(!userToChangeStatus.isStatus());
                listaUzytkownikow.add(parseJSONObject(userToChangeStatus));
                zapiszStanBDUzytkownikow(listaUzytkownikow);
                break;


        }
        out.flush();
    }

    private JSONArray removeUserFromJsonArray(JSONObject user3, JSONArray listaUzytkownikow) {

        for (int i = 0; i < listaUzytkownikow.size(); i++) {
            if(((Long) ((JSONObject)listaUzytkownikow.get(i)).get("id")).intValue() == ((Integer) user3.get("id"))){
                listaUzytkownikow.remove(i);
            }
        }
        return listaUzytkownikow;
    }
    private JSONArray removeUserFromJsonArray1(JSONObject user3, JSONArray listaUzytkownikow) {

        for (int i = 0; i < listaUzytkownikow.size(); i++) {
            if(((Long) ((JSONObject)listaUzytkownikow.get(i)).get("id")).intValue() == (((Long) user3.get("id")).intValue())){
                listaUzytkownikow.remove(i);
            }
        }
        return listaUzytkownikow;
    }

    private boolean unikalnyEmail(String email) {
        List<User> listaUzytkownikow = odczytajListeUzytkownikow();
        return listaUzytkownikow.stream()
                .filter(user -> user.getEmail().equals(email)).collect(Collectors.toList()).isEmpty();
    }


    static User zwrocUzytkownikaPoId(Integer id) {
        List<User> listaUzytkownikow = odczytajListeUzytkownikow();
        return listaUzytkownikow.stream()
                .filter(car -> car.getId() == id).collect(Collectors.toList())
                .get(0);

    }

    private void zapiszStanBDUzytkownikow(JSONArray listaUzytkownikow) {
        try (FileWriter file = new FileWriter(USER_DB_PATH)) {
            //We can write any JSONArray or JSONObject instance to the file
            file.write(listaUzytkownikow.toJSONString());
            file.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Integer zwrocNajwiekszeIdUzytkownikaBD() {
        List<User> listaUzytkownikow = odczytajListeUzytkownikow();
        return listaUzytkownikow.stream()
                .sorted(Comparator.comparingInt(User::getId).reversed())
                .limit(1).collect(Collectors.toList()).get(0).getId();
    }

    private JSONArray getListaUzytkownikowBD() {
        JSONParser jsonParser = new JSONParser();
        JSONArray listaUzytkownikow = null;
        try (FileReader reader = new FileReader(USER_DB_PATH))
        {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            listaUzytkownikow = (JSONArray) obj;


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return listaUzytkownikow;
    }

    private static List<User> odczytajListeUzytkownikow(){
        JSONParser jsonParser = new JSONParser();
        List<User> listaUzytkownikowZw = new ArrayList<>();
        try (FileReader reader = new FileReader(USER_DB_PATH))
        {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            JSONArray listaSamochodow = (JSONArray) obj;


            listaUzytkownikowZw = (List<User>) listaSamochodow.stream().map(user -> parseUserObject((JSONObject) user )).collect(Collectors.toList());


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return listaUzytkownikowZw;
    }

    private static User parseUserObject(JSONObject user) {
        User parsedUser = new User();
        Long val = (Long) user.get("id");
        parsedUser.setId(val.intValue());
        parsedUser.setImie((String) user.get("imie"));
        parsedUser.setNazwisko((String) user.get("nazwisko"));
        parsedUser.setEmail((String) user.get("email"));
        parsedUser.setRola((String) user.get("rola"));
        parsedUser.setStatus((Boolean) user.get("status"));
        parsedUser.setHaslo((String) user.get("haslo"));
        parsedUser.setListaUlubionychSamochodow((List<Long>) user.get("listaUlubionychSamochodow"));

        return parsedUser;
    }
    private JSONObject parseJSONObject(User user) {
        JSONObject  parsedUser = new JSONObject();
        parsedUser.put("id" ,user.getId());
        parsedUser.put("imie" ,user.getImie());
        parsedUser.put("nazwisko" ,user.getNazwisko());
        parsedUser.put("email" ,user.getEmail());
        parsedUser.put("haslo" ,user.getHaslo());
        parsedUser.put("status" ,user.isStatus());
        parsedUser.put("rola" ,user.getRola());
        parsedUser.put("listaUlubionychSamochodow" ,user.getListaUlubionychSamochodow());

        return parsedUser;
    }
}
