import React, {Component} from "react";
import CarService from "../Services/CarService";
import LoginService from "../Services/LoginService";


class CarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            car: {}
        }
        this.delete = this.delete.bind(this);
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

    isCarInFavourites(id) {
        let user = this.props.getCurrentUser();
        if (user !== null) {
            for (let i = 0; i < user.listaUlubionychSamochodow.length; i++) {
                if (user.listaUlubionychSamochodow[i] === id) {
                    return true;
                }
            }
        }
        return false;
    }

    componentDidMount() {
        this.setState({car: this.props.car});
    }

    delete(id) {
        this.props.delete(id);
    }


    render() {
        return (
            <div>
                <div className="card"
                     style={{width: "18rem", marginLeft: "10px", marginBottom: "10px"}}>
                    <a href={`/car/${this.state.car.id}`} style={{textDecoration: "none", color: "black"}}>
                        <img src={this.state.car.urlGlowneZdjecie} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.car.marka} {this.state.car.model}</h5>
                            <p>{this.state.car.rokProdukcji} * {this.state.car.rodzajPaliwa} * {this.state.car.pojemnoscSilnika} cm3</p>
                        </div>
                    </a>
                    {LoginService.isUserLoggedIn() ?
                        <>
                            {
                                this.isCarInFavourites(this.state.car.id) ?
                                    <button type="button" className="btn btn-warning"
                                            onClick={() => this.props.deleteFromFavourites(this.state.car.id)}>Usuń z
                                        ulubionych</button>
                                    :
                                    <button type="button" className="btn btn-info"
                                            onClick={() => this.props.addToFavourites(this.state.car.id)}>Dodaj do
                                        ulubionych</button>
                            }
                            {
                                this.isUserAdmin(this.props.getCurrentUser()) ?
                                    <>
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => this.props.edit(`/car/edit/${this.state.car.id}`)}>edytuj
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={() => this.delete(this.state.car.id)}>usuń
                                        </button>
                                    </>
                                    :
                                    ""
                            }
                        </>
                        :
                        ""
                    }
                </div>
            </div>
        );
    }
}

export default CarComponent;