import React, {Component} from "react";
import LoginService from "../Services/LoginService";

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            imie: '',
            nazwisko: '',
            haslo: ''
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.imieHandler = this.imieHandler.bind(this);
        this.nazwiskoHandler = this.nazwiskoHandler.bind(this);
        this.hasloHandler = this.hasloHandler.bind(this);
        this.save = this.save.bind(this);
    }

    emailHandler(e) {
        this.setState({email: e.target.value});
    }

    imieHandler(e) {
        this.setState({imie: e.target.value});
    }

    nazwiskoHandler(e) {
        this.setState({nazwisko: e.target.value});
    }

    hasloHandler(e) {
        this.setState({haslo: e.target.value});
        ;
    }

    save(e) {
        e.preventDefault();
        let user = {
            id: 0,
            email: this.state.email,
            imie: this.state.imie,
            nazwisko: this.state.nazwisko,
            haslo: this.state.haslo,
            listaUlubionychSamochodow: [],
            rola: "user",
            status: true
        };
        LoginService.register(user).then(res => {
            this.props.history.push("/login");
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Rejestracja</h1>
                <form onSubmit={this.save} style={{maxWidth: '500px', margin: '0 auto'}}>
                    <div className="form-group">
                        <label className="control-label"> Imię </label>
                        <input id="imie" className="form-control" required autoFocus="autofocus"
                               onChange={this.imieHandler}/>
                    </div>

                    <div className="form-group">
                        <label className="control-label"> Nazwisko </label> <input
                        id="nazwisko" className="form-control" required autoFocus="autofocus"
                        onChange={this.nazwiskoHandler}/>
                    </div>

                    <div className="form-group">
                        <label className="control-label"> E-mail </label> <input
                        id="email" className="form-control" required autoFocus="autofocus"
                        onChange={this.emailHandler}/>
                    </div>

                    <div className="form-group">
                        <label className="control-label"> Hasło </label> <input
                        id="haslo" className="form-control" type="password" required autoFocus="autofocus"
                        onChange={this.hasloHandler}/>
                    </div>

                    <div className="form-group" style={{marginTop: "10px"}}>
                        <button type="submit" className="btn btn-primary">Zarejestruj</button>
                        <span>Masz już konto? <a href="/login">Zaloguj</a></span>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;