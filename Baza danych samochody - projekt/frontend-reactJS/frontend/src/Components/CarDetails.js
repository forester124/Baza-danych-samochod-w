import React, {Component} from "react";
import CarService from "../Services/CarService";

class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: null
        }
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
        CarService.getCarById(id).then(res => {
            this.setState({car: res.data})
        }).catch(err => {
            console.log(err);
        });
    }

    getIndicators() {
        let buttons = [];
        let ile;
        if (this.state.car) {
            ile = this.state.car.urlWszystkieZdjecia.length;
        } else {
            ile = 0;
        }
        for (let i = 0; i < ile; i++) {
            if (i === 0) {
                buttons[i] = <button key={i} type="button" data-bs-target="#demo" data-bs-slide-to={i} className="active"/>
            } else {
                buttons[i] = <button key={i} type="button" data-bs-target="#demo" data-bs-slide-to={i}/>
            }
        }
        return buttons;
    }
    getImages() {
        let images = [];
        let ile;
        if (this.state.car) {
            ile = this.state.car.urlWszystkieZdjecia.length;
        } else {
            ile = 0;
        }
        for (let i = 0; i < ile; i++) {
            if (i === 0) {
                images[i] = <div key={i} className="carousel-item active"><img src={this.state.car.urlWszystkieZdjecia[i]} alt={i}
                                                                       className="d-block w-100"/></div>
            } else {
                images[i] =
                    <div key={i} className="carousel-item"><img src={this.state.car.urlWszystkieZdjecia[i]} alt={i} className="d-block w-100"/>
                    </div>
            }
        }
        return images;
    }


    render() {
        return (
            <div className="container">
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {this.getIndicators().map(
                            i =>
                                i
                        )}
                    </div>

                    <div className="carousel-inner">
                        {this.getImages().map(
                            img =>
                                img
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"/>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"/>
                    </button>
                </div>
            </div>
        );
    }
}

export default CarDetails;