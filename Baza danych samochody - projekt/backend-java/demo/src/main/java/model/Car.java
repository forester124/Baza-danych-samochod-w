package model;

import java.util.List;
import java.util.Objects;

public class Car {
    private Long id;
    private String marka;
    private String model;
    private String typNadwozia;
    private String rodzajPaliwa;
    private int rokProdukcji;
    private int pojemnoscSilnika;
    private String urlGlowneZdjecie;
    private List<String> urlWszystkieZdjecia;


    public String getUrlGlowneZdjecie() {
        return urlGlowneZdjecie;
    }

    public void setUrlGlowneZdjecie(String urlGlowneZdjecie) {
        this.urlGlowneZdjecie = urlGlowneZdjecie;
    }

    public List<String> getUrlWszystkieZdjecia() {
        return urlWszystkieZdjecia;
    }

    public void setUrlWszystkieZdjecia(List<String> urlWszystkieZdjecia) {
        this.urlWszystkieZdjecia = urlWszystkieZdjecia;
    }

    public Car(Long id, String marka, String model, String typNadwozia, String rodzajPaliwa, String urlGlowneZdjecie, List<String> urlWszystkieZdjecia, int rokProdukcji, int pojemnoscSilnika) {
        this.id = id;
        this.marka = marka;
        this.model = model;
        this.typNadwozia = typNadwozia;
        this.rodzajPaliwa = rodzajPaliwa;
        this.urlGlowneZdjecie = urlGlowneZdjecie;
        this.urlWszystkieZdjecia = urlWszystkieZdjecia;
        this.rokProdukcji = rokProdukcji;
        this.pojemnoscSilnika = pojemnoscSilnika;
    }



    public Car(Long id, String marka, String model, String typNadwozia, String rodzajPaliwa, int rokProdukcji, int pojemnoscSilnika) {
        this.id = id;
        this.marka = marka;
        this.model = model;
        this.typNadwozia = typNadwozia;
        this.rodzajPaliwa = rodzajPaliwa;
        this.rokProdukcji = rokProdukcji;
        this.pojemnoscSilnika = pojemnoscSilnika;
    }

    public Car() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getTypNadwozia() {
        return typNadwozia;
    }

    public void setTypNadwozia(String typNadwozia) {
        this.typNadwozia = typNadwozia;
    }

    public String getRodzajPaliwa() {
        return rodzajPaliwa;
    }

    public void setRodzajPaliwa(String rodzajPaliwa) {
        this.rodzajPaliwa = rodzajPaliwa;
    }

    public int getRokProdukcji() {
        return rokProdukcji;
    }

    public void setRokProdukcji(int rokProdukcji) {
        this.rokProdukcji = rokProdukcji;
    }

    public int getPojemnoscSilnika() {
        return pojemnoscSilnika;
    }

    public void setPojemnoscSilnika(int pojemnoscSilnika) {
        this.pojemnoscSilnika = pojemnoscSilnika;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return rokProdukcji == car.rokProdukcji && pojemnoscSilnika == car.pojemnoscSilnika && Objects.equals(id, car.id) && Objects.equals(marka, car.marka) && Objects.equals(model, car.model) && Objects.equals(typNadwozia, car.typNadwozia) && Objects.equals(rodzajPaliwa, car.rodzajPaliwa) && Objects.equals(urlGlowneZdjecie, car.urlGlowneZdjecie) && Objects.equals(urlWszystkieZdjecia, car.urlWszystkieZdjecia);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, marka, model, typNadwozia, rodzajPaliwa, rokProdukcji, pojemnoscSilnika, urlGlowneZdjecie, urlWszystkieZdjecia);
    }
}
