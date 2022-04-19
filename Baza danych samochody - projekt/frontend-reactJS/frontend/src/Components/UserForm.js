import React, {Component} from "react";
import UserService from "../Services/UserService";

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            imie: "",
            nazwisko: "",
            email: "",
            haslo: "",
            rola: "",
            status: true,
            listaUlubionychSamochodow: []
        }

        this.imieHandler = this.imieHandler.bind(this);
        this.nazwiskoHandler = this.nazwiskoHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.hasloHandler = this.hasloHandler.bind(this);
        this.rolaHandler = this.rolaHandler.bind(this);
        this.save = this.save.bind(this);
    }

    reverseStr(str) {
        return str.split("").reverse().join("");
    }

    getId(pathname) {
        let id = '';
        for (let i = pathname.length - 1; i > 0; i--) {
            if (pathname.includes('/', i)) {
                break;
            }
            id = id + pathname[i];
        }
        id = this.reverseStr(id);
        return id;
    }

    componentDidMount() {
        let pathname = window.location.pathname;
        let id = this.getId(pathname);
        UserService.getUserById(id).then(res => {
            this.setState({
                id: res.data.id,
                imie: res.data.imie,
                nazwisko: res.data.nazwisko,
                email: res.data.email,
                haslo: res.data.haslo,
                rola: res.data.rola,
                status: res.data.status,
                listaUlubionychSamochodow: res.data.listaUlubionychSamochodow
            });
        }).catch(err => {
            console.log(err);
        });
    }

    isAdmin() {
        if (this.props.getCurrentUser() !== null) {
            if (this.props.getCurrentUser().rola === 'admin') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    imieHandler(e) {
        this.setState({imie: e.target.value});
    }

    nazwiskoHandler(e) {
        this.setState({nazwisko: e.target.value});
    }

    emailHandler(e) {
        this.setState({email: e.target.value});
    }

    cancel() {
        this.props.history.push("/");
    }

    hasloHandler(e) {
        this.setState({haslo: e.target.value});
    }

    rolaHandler(e) {
        this.setState({rola: e.target.value});
    }

    save(e) {
        e.preventDefault();
        let user = {
            imie: this.state.imie,
            nazwisko: this.state.nazwisko,
            email: this.state.email,
            haslo: this.state.haslo,
            rola: this.state.rola,
            id: this.state.id,
            status: this.state.status,
            listaUlubionychSamochodow: this.state.listaUlubionychSamochodow
        }
        UserService.editUser(user).then(res => {
            if (this.isAdmin()) {
                this.props.history.push("/users");
            } else {
                this.props.history.push("/");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-center"><h2>Edytuj użytkownika</h2></div>
                <form style={{maxWidth: '500px', margin: '0 auto'}} onSubmit={this.save}>
                    {this.state.message}
                    <div className="border border-secondary rounded p-3">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Imię</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required minLength="1"
                                       value={this.state.imie} onChange={this.imieHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Nazwisko</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required
                                       minLength="1" value={this.state.nazwisko} onChange={this.nazwiskoHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">E-mail</label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" required
                                       minLength="1" value={this.state.email} onChange={this.emailHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Hasło</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" required
                                       minLength="1" value={this.state.haslo}
                                       onChange={this.hasloHandler}/>
                            </div>
                        </div>
                        {this.isAdmin() ?
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Rola</label>
                                <div className="col-sm-8">
                                    <select className="form-control" value={this.state.rola}
                                            onChange={this.rolaHandler}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                            </div>
                            :
                            ""
                        }
                        <div className="text-end">
                            <button className="btn btn-primary m-2">Zapisz</button>
                            <button className="btn btn-secondary m-2" onClick={this.cancel}>Anuluj
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserForm;