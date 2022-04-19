import React, {Component} from "react";
import CarService from "../Services/CarService";
import LoginService from "../Services/LoginService";
import UserService from "../Services/UserService";
import CarComponent from "./CarComponent";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            model: true,
            marka: false,
            typNadwozia: false,
            rokProdukcji: false,
            pojemnoscSilnika: false,
            search: "",
            currentUser: {}
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.delete = this.delete.bind(this);
        this.addToFavourites = this.addToFavourites.bind(this);
        this.deleteFromFavourites = this.deleteFromFavourites.bind(this);
    }

    componentDidMount() {
        let pathname = window.location.pathname;
        if (pathname === `/` || pathname === '/cars') {
            CarService.getCars().then(res => {
                this.setState({cars: res.data});
                this.setState({currentUser: this.props.getCurrentUser()});
            }).catch(err => {
                console.log(err);
            });
        } else if (pathname === `/cars/favourites`) {
            let userId = LoginService.getLoggedInUserName();
            let user;
            UserService.getUserById(userId).then(res => {
                user = res.data;
                CarService.getFavouritesCar(user.id).then(res => {
                    this.setState({cars: res.data});
                    this.setState({currentUser: user});
                }).catch(err => {
                    console.log(err);
                });
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentUser !== this.state.currentUser) {
            let pathname = window.location.pathname;
            if (pathname === `/` || pathname === '/cars') {
                CarService.getCars().then(res => {
                    this.setState({cars: res.data});
                    this.setState({currentUser: this.props.getCurrentUser()});
                })
            } else if (pathname === `/cars/favourites`) {
                CarService.getFavouritesCar(this.state.currentUser.id).then(res => {
                    this.setState({cars: res.data});
                    this.setState({currentUser: this.props.getCurrentUser()});
                });
            }
        }
    }

    addToFavourites(carId) {
        UserService.addToFavourites(carId, this.props.getCurrentUser()).then(res => {
            let user = this.state.currentUser;
            user.listaUlubionychSamochodow[user.listaUlubionychSamochodow.length] = carId;
            this.setState({currentUser: user});
        }).catch(err => {
            console.log(err);
        });
    }

    deleteFromFavourites(carId) {
        UserService.deleteFromFavourites(carId, this.props.getCurrentUser()).then(res => {
            let user = this.state.currentUser;
            user.listaUlubionychSamochodow = user.listaUlubionychSamochodow.filter(i => i !== carId);
            let pathname = window.location.pathname;
            if (pathname === `/cars/favourites`) {
                this.setState({cars: this.state.cars.filter(car => car.id !== carId)});
            }
            this.setState({currentUser: user});
        }).catch(err => {
            console.log(err);
        });
    }

    wyzeruj() {
        if (this.state.model === true) {
            this.setState({model: false});
        } else if (this.state.marka === true) {
            this.setState({marka: false});
        } else if (this.state.typNadwozia === true) {
            this.setState({typNadwozia: false});
        } else if (this.state.rokProdukcji === true) {
            this.setState({rokProdukcji: false});
        } else if (this.state.pojemnoscSilnika === true) {
            this.setState({pojemnoscSilnika: false});
        }
    }

    onChangeValue(e) {
        this.wyzeruj();
        switch (e.target.value) {
            case "model":
                this.setState({model: true});
                break;
            case "marka":
                this.setState({marka: true});
                break;
            case "typNadwozia":
                this.setState({typNadwozia: true});
                break;
            case "rokProdukcji":
                this.setState({rokProdukcji: true});
                break;
            case "pojemnoscSilnika":
                this.setState({pojemnoscSilnika: true});
                break;
        }
    }

    changeSearch(e) {
        this.setState({search: e.target.value});
    }

    filtruj() {
        if (this.state.model === true) {
            return this.state.cars.filter(c => c.model.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        } else if (this.state.marka === true) {
            return this.state.cars.filter(c => c.marka.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        } else if (this.state.typNadwozia === true) {
            return this.state.cars.filter(c => c.typNadwozia.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        } else if (this.state.rokProdukcji === true) {
            return this.state.cars.filter(c => c.rokProdukcji.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        } else if (this.state.pojemnoscSilnika === true) {
            return this.state.cars.filter(c => c.pojemnoscSilnika.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        } else {
            return this.state.cars;
        }
    }

    showEditForm(href) {
        this.props.history.push(href);
    }

    delete(id) {
        CarService.deleteById(id).then(res => {
            this.setState({cars: this.state.cars.filter(car => car.id !== id)});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center">
                    <div className="input-group" style={{width: "500px", marginTop: "30px"}}>
                        <input className="form-control rounded" type="search" onChange={this.changeSearch}
                               placeholder="wyszukaj"/>
                        <div>
                            <select className="form-control" onChange={this.onChangeValue}>
                                <option value="model">model</option>
                                <option value="marka">marka</option>
                                <option value="typNadwozia">typ nadwozia</option>
                                <option value="rokProdukcji">rok produkcji</option>
                                <option value="pojemnoscSilnika">pojemność silnika</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    <div className="card-group" style={{marginBottom: "20px", marginTop: "20px"}}>
                        {this.filtruj().map(
                            car =>
                                <CarComponent key={car.id} getCurrentUser={this.props.getCurrentUser} car={car}
                                              delete={this.delete.bind(this)} edit={this.showEditForm.bind(this)}
                                              addToFavourites={this.addToFavourites}
                                              deleteFromFavourites={this.deleteFromFavourites}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default CarList;