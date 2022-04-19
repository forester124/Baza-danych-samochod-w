import axios from "axios";

const BASE_URL = "http://localhost:8080/demo_war_exploded/hello-servlet"

class CarService {

    // saveCar(car) {
    //     const config = {
    //         method: 'POST',
    //         body: JSON.stringify(car)
    //     }
    //     return axios.post(`http://localhost:8080/demo_war_exploded/hello-servlet?akcja=dodajSamochod`, JSON.stringify(car));
    // }

    saveCar2(car) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(car)
        };
        return fetch(`${BASE_URL}?akcja=dodajSamochod`, requestOptions);
    }

    getCars() {
        return axios.get(`${BASE_URL}?akcja=listaSamochodow`);
    }

    getCarById(id) {
        return axios.get(`${BASE_URL}?akcja=zwrocSamochodPoId&id=${id}`);
    }

    deleteById(id) {
        const requestOptions = {
            method: 'POST'
        };
        return fetch(`${BASE_URL}?akcja=usunSamochod&id=${id}`, requestOptions);
    }

    edit(car) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(car)
        };
        return fetch(`${BASE_URL}?akcja=edytujSamochod`, requestOptions);
    }

    getFavouritesCar(id) {
        return axios.get(`${BASE_URL}?akcja=listaUlubionychSamochodow&id=${id}`);
    }

}

export default new CarService();