import React, {Component} from "react";
import CarService from "../Services/CarService";

class NewCarForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            marka: "",
            model: "",
            typNadwozia: "",
            rodzajPaliwa: "",
            rokProdukcji: 0,
            pojemnoscSilnika: 0,
            urlGlowneZdjecie: "",
            urlWszystkieZdjecia: [],
            zdjecieGaleriaPole: [],
            idx: -1
        }

        this.markaHandler = this.markaHandler.bind(this);
        this.modelHandler = this.modelHandler.bind(this);
        this.typNadwoziaHandler = this.typNadwoziaHandler.bind(this);
        this.rodzajPaliwaHandler = this.rodzajPaliwaHandler.bind(this);
        this.rokProdukcjiHandler = this.rokProdukcjiHandler.bind(this);
        this.pojemnoscSilnikaHandler = this.pojemnoscSilnikaHandler.bind(this);
        this.zdjecieGlowneHandler = this.zdjecieGlowneHandler.bind(this);
        this.pomocniczyUrlHandler = this.pomocniczyUrlHandler.bind(this);
        this.dodajZdjecie = this.dodajZdjecie.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.usunZdjecie = this.usunZdjecie.bind(this);
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
        if (pathname === `/car/edit/${id}`) {
            this.setState({title: "Edytuj samochód"});
            CarService.getCarById(id).then(res => {
                this.setState({
                    marka: res.data.marka,
                    model: res.data.model,
                    typNadwozia: res.data.typNadwozia,
                    rodzajPaliwa: res.data.rodzajPaliwa,
                    rokProdukcji: res.data.rokProdukcji,
                    pojemnoscSilnika: res.data.pojemnoscSilnika,
                    urlGlowneZdjecie:  res.data.urlGlowneZdjecie,
                    urlWszystkieZdjecia: res.data.urlWszystkieZdjecia
                });
                let pole = [];
                for (let i = 0; i < res.data.urlWszystkieZdjecia.length; i++) {
                    pole[i] = <div key={i} className="form-group row">
                        <label className="col-sm-4 col-form-label">Zdjęcie do galerii</label>
                        <div className="col-sm-8">
                            <input key={i} type="text" className="form-control" i={i}
                                   minLength="1" defaultValue={this.state.urlWszystkieZdjecia[i]}
                                   onChange={this.pomocniczyUrlHandler} onFocus={this.onFocusHandler}/>
                        </div>
                    </div>
                }
                this.setState({zdjecieGaleriaPole: pole});
            }).catch(err => {
                console.log(err);
            });
        } else if (pathname === `/car/new`) {
            let pole = [];
            pole[0] = <div key={0} className="form-group row">
                <label className="col-sm-4 col-form-label">Zdjęcie do galerii</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" i={0}
                           minLength="1" defaultValue={this.state.urlWszystkieZdjecia[0]}
                           onChange={this.pomocniczyUrlHandler} onFocus={this.onFocusHandler}/>
                </div>
            </div>
            this.setState({title: 'Dodaj samochód', zdjecieGaleriaPole: pole});
        }
    }

    onFocusHandler(e) {
        this.setState({idx: e.target.getAttribute('i')})
    }

    markaHandler(e) {
        this.setState({marka: e.target.value});
    }

    modelHandler(e) {
        this.setState({model: e.target.value});
    }

    typNadwoziaHandler(e) {
        this.setState({typNadwozia: e.target.value});
    }

    rodzajPaliwaHandler(e) {
        this.setState({rodzajPaliwa: e.target.value});
    }

    rokProdukcjiHandler(e) {
        this.setState({rokProdukcji: e.target.value});
    }

    pojemnoscSilnikaHandler(e) {
        this.setState({pojemnoscSilnika: e.target.value});
    }

    zdjecieGlowneHandler(e) {
        this.setState({urlGlowneZdjecie: e.target.value});
    }

    pomocniczyUrlHandler(e) {
        let zdjecia = this.state.urlWszystkieZdjecia;
        zdjecia[e.target.getAttribute('i')] = e.target.value;
        this.setState({urlWszystkieZdjecia: zdjecia});
    }

    dodajZdjecie(e) {
        e.preventDefault();
        let zdjecia = this.state.urlWszystkieZdjecia;
        let pola = this.state.zdjecieGaleriaPole;
        let j = pola.length;
        pola[j] = <div key={j} className="form-group row">
            <label className="col-sm-4 col-form-label">Zdjęcie do galerii</label>
            <div className="col-sm-8">
                <input key={j} type="text" className="form-control" i={j}
                       minLength="1" defaultValue={this.state.urlWszystkieZdjecia[j]}
                       onChange={this.pomocniczyUrlHandler} onFocus={this.onFocusHandler}/>
            </div>
        </div>
        this.setState({urlWszystkieZdjecia: zdjecia});
    }

    usunZdjecie(e) {
        e.preventDefault();
        // let zdjecia = [];
        // let pola = [];
        let zdjecia = this.state.urlWszystkieZdjecia;
        let pola = this.state.zdjecieGaleriaPole;
        let idx = parseInt(this.state.idx);
        zdjecia[idx] = undefined;
        pola[idx] = undefined;
        // for (let i = 0; i < this.state.urlWszystkieZdjecia.length; i++) {
        //     if (i !== idx) {
        //         pola[i] = this.state.zdjecieGaleriaPole[i];
        //         zdjecia[i] = this.state.urlWszystkieZdjecia[i];
        //     }
        // }
        zdjecia = zdjecia.filter(zdj => zdj !== undefined);
        pola = pola.filter(pol => pol !== undefined);
        this.setState({urlWszystkieZdjecia: zdjecia});
        this.setState({zdjecieGaleriaPole: pola});
    }

    save(e) {
        e.preventDefault();
        let pathname = window.location.pathname;
        let id = this.getId(pathname);
        if (!(pathname === `/car/edit/${id}`)) {
            id = 0;
        }
        let car = {
            id: parseInt(id),
            marka: this.state.marka,
            model: this.state.model,
            typNadwozia: this.state.typNadwozia,
            rodzajPaliwa: this.state.rodzajPaliwa,
            rokProdukcji: parseInt(this.state.rokProdukcji),
            pojemnoscSilnika: parseInt(this.state.pojemnoscSilnika),
            urlGlowneZdjecie: this.state.urlGlowneZdjecie,
            urlWszystkieZdjecia: this.state.urlWszystkieZdjecia
        }
        if (pathname === `/car/edit/${id}`) {
            CarService.edit(car).then(res => {
                this.props.history.push('/');
            }).catch(err => {
                console.log(err)
            })
        } else {
            CarService.saveCar2(car).then(res => {
                this.props.history.push('/');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    cancel() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="text-center"><h2>{this.state.title}</h2></div>
                <form style={{maxWidth: '500px', margin: '0 auto'}} onSubmit={this.save}>
                    {this.state.message}
                    <div className="border border-secondary rounded p-3">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Marka</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required minLength="1"
                                       value={this.state.marka} onChange={this.markaHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Model</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required
                                       minLength="1" value={this.state.model} onChange={this.modelHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Typ nadwozia</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required
                                       minLength="1" value={this.state.typNadwozia} onChange={this.typNadwoziaHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Rodzaj paliwa</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required
                                       minLength="1" value={this.state.rodzajPaliwa}
                                       onChange={this.rodzajPaliwaHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Rok produkcji</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" required maxLength="4"
                                       minLength="4" value={this.state.rokProdukcji}
                                       onChange={this.rokProdukcjiHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Pojemność silnika</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" required
                                       minLength="1" value={this.state.pojemnoscSilnika}
                                       onChange={this.pojemnoscSilnikaHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">URL do zdjęcia głównego</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required
                                       minLength="1" value={this.state.urlGlowneZdjecie}
                                       onChange={this.zdjecieGlowneHandler}/>
                            </div>
                        </div>
                        {this.state.zdjecieGaleriaPole.map(zdj => zdj)}
                        <div>Liczba zdjęć w galerii: {this.state.urlWszystkieZdjecia.length}</div>
                        <div className="text-end">
                            <button className="btn btn-primary m-2">Zapisz</button>
                            <button className="btn btn-primary m-2" onClick={this.dodajZdjecie}>Dodaj Zdjecie</button>
                            <button className="btn btn-primary m-2" onClick={this.usunZdjecie}>Usuń Zdjecie</button>
                            <button className="btn btn-secondary m-2" onClick={this.cancel}>Anuluj
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewCarForm;