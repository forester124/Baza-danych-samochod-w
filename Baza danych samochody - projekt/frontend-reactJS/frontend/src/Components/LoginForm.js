import React, {Component} from "react";
import LoginService from "../Services/LoginService";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            haslo: '',
            msg: ''
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.hasloHandler = this.hasloHandler.bind(this);
        this.showRegisterForm = this.showRegisterForm.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    emailHandler(e) {
        this.setState({email: e.target.value});
    }

    hasloHandler(e) {
        this.setState({haslo: e.target.value});
    }

    showRegisterForm(e) {
        this.props.history.push("/register");
    }

    logIn(e) {
        e.preventDefault();
        LoginService.login(this.state.email, this.state.haslo).then(res => {
            res.json().then(data => {
                if (data.status) {
                    LoginService.registerSuccessfulLogin(data);
                    this.props.setCurrentUser(data);
                    this.props.history.push('/');
                } else {
                    this.setState({msg: <div className="alert alert-danger text-center">Konto jest zablokowane!</div>})
                }
            }).catch(err => {
                this.setState({msg: <div className="alert alert-danger text-center">Nieprawidłowy e-mail lub hasło</div>})
            })
        }).catch(err => {
            console.log("err");
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div style={{marginTop: "20px"}}>
                    {this.state.msg}
                </div>
                <form onSubmit={this.logIn} style={{maxWidth: '500px', margin: '0 auto'}}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">E-mail:</label>
                        <input type="email" className="form-control" id="email" placeholder="E-mail" required
                               onChange={this.emailHandler}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="haslo" className="form-label">Hasło:</label>
                        <input type="password" className="form-control" id="haslo" placeholder="Hasło" required
                               onChange={this.hasloHandler}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Zaloguj</button>
                        <button type="button" className="btn btn-link" onClick={this.showRegisterForm}>Zarejestruj
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;