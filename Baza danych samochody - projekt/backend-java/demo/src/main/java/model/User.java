package model;

import java.util.List;
import java.util.Objects;

public class User {
    private int id;
    private String imie;
    private String nazwisko;
    private String rola;
    private String email;
    private String haslo;
    private boolean status;
    private List<Long> listaUlubionychSamochodow;


    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public User(int id, String imie, String nazwisko, String rola, String email, String haslo, List<Long> listaUlubionychSamochodow) {
        this.id = id;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.rola = rola;
        this.email = email;
        this.haslo = haslo;
        this.status = true;
        this.listaUlubionychSamochodow = listaUlubionychSamochodow;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getRola() {
        return rola;
    }

    public void setRola(String rola) {
        this.rola = rola;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHaslo() {
        return haslo;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public List<Long> getListaUlubionychSamochodow() {
        return listaUlubionychSamochodow;
    }

    public void setListaUlubionychSamochodow(List<Long> listaUlubionychSamochodow) {
        this.listaUlubionychSamochodow = listaUlubionychSamochodow;
    }
    public void dodajUlubionySamochod(Long carId){
        this.listaUlubionychSamochodow.add(carId);
    }
    public void usunUlubionySamochod(Long carId){
        this.listaUlubionychSamochodow.remove(carId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && imie.equals(user.imie) && nazwisko.equals(user.nazwisko) && rola.equals(user.rola) && email.equals(user.email) && haslo.equals(user.haslo) && listaUlubionychSamochodow.equals(user.listaUlubionychSamochodow);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, imie, nazwisko, rola, email, haslo, listaUlubionychSamochodow);
    }
}
