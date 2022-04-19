import React, {Component} from "react";
import LoginService from "../Services/LoginService";

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    isUserAdmin(user) {
        if (user === null) {
            return false;
        } else if (user.rola !== 'admin') {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const isUserLoggedIn = LoginService.isUserLoggedIn();
        let user = this.props.getCurrentUser();
        let name = "";
        let href = "";
        if (user !== null) {
            name = user.imie + " " + user.nazwisko;
            href = "/user/edit/" + user.id;
        }
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-info justify-content-center">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Samochody</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        {isUserLoggedIn ?
                            <ul className="navbar-nav me-auto">
                                {this.isUserAdmin(user) ?
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/car/new">Dodaj samochód</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/users">Użytkownicy</a>
                                        </li>
                                    </>
                                    :
                                    ""
                                }
                                <li className="nav-item">
                                    <a className="nav-link" href="/cars/favourites">Ulubione</a>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav me-auto"></ul>
                        }
                        {isUserLoggedIn ?
                            <div className="d-flex">
                                <div className="nav-item">
                                    <a className="nav-link" href={href} style={{color: "black"}}>Edytuj</a>
                                </div>
                                <div className="nav-item">
                                    <a className="nav-link" href="/logout" onClick={LoginService.logout}
                                       style={{color: "black"}}>Wyloguj</a>
                                </div>
                            </div>
                            :
                            <div className="nav-item">
                                <a className="nav-link" href="/login" style={{color: "black"}}>Zaloguj</a>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;