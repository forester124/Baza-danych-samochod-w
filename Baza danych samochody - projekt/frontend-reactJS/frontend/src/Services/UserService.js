import axios from "axios";

const BASE_URL = "http://localhost:8080/demo_war_exploded/user-servlet";

class UserService {

    getUserById(id) {
        return axios.get(`${BASE_URL}?akcja=zwrocUzytkownikaPoId&id=${id}`);
    }

    editUser(user) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user)
        };
        return fetch(`${BASE_URL}?akcja=edytujUzytkownika`, requestOptions);
    }

    getAllUsers() {
        return axios.get(`${BASE_URL}?akcja=listaUzytkownikow`);
    }

    deleteById(id) {
        const requestOptions = {
            method: 'POST',
        };
        return fetch(`${BASE_URL}?akcja=usunUzytkownika&id=${id}`, requestOptions);
    }

    addToFavourites(carId, user) {
        console.log(user);
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user)
        }
        return fetch(`${BASE_URL}?akcja=dodajUlubionySamochod&idSamochodu=${carId}`, requestOptions);
    }

    deleteFromFavourites(carId, user) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user)
        }
        return fetch(`${BASE_URL}?akcja=usunUlubionySamochod&idSamochodu=${carId}`, requestOptions);
    }

    zmienStatus(id) {
        const requestOptions = {
            method: 'POST'
        }
        return fetch(`${BASE_URL}?akcja=zmienStatus&id=${id}`, requestOptions);
    }

}

export default new UserService();