import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080/demo_war_exploded/user-servlet";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class LoginService {
    register(user) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user)
        };
        return fetch(`${BASE_URL}?akcja=dodajUzytkownika`, requestOptions);
    }

    login(email, haslo) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({email: email, haslo: haslo})
        };
        return fetch(`${BASE_URL}?akcja=zaloguj`, requestOptions);
    }


    registerSuccessfulLogin(user) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, user.id);
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return null;
        return user
    }
}

export default new LoginService();