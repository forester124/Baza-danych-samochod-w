import React, {Component} from "react";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import NewCarForm from "./NewCarForm";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import LoginService from "../Services/LoginService";
import UserService from "../Services/UserService";
import UserForm from "./UserForm";
import UserList from "./UserList";

class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }

    }

    componentDidMount() {
        let user = LoginService.getLoggedInUserName();
        if (user !== null) {
            UserService.getUserById(user).then(res => {
                this.setState({currentUser: res.data});
            }).catch(err => {
                console.log(err);
            });
        }
    }

    setCurrentUser(user) {
        this.setState({currentUser: user});
    }

    getCurrentUser() {
        return this.state.currentUser;
    }

    render() {
        return (
            <div>
                <NavBar getCurrentUser={this.getCurrentUser.bind(this)} />
                <Router>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact render={(props) =>(
                                <CarList {...props} className="col-sm-4 row" getCurrentUser={this.getCurrentUser.bind(this)}/>
                            )}></Route>
                            <Route path="/cars" exact render={(props) =>(
                                <CarList {...props} className="col-sm-4 row" getCurrentUser={this.getCurrentUser.bind(this)}/>
                            )}></Route>
                            <Route path="/cars/favourites" exact render={(props) =>(
                                <CarList {...props} className="col-sm-4 row" getCurrentUser={this.getCurrentUser.bind(this)}/>
                            )}></Route>
                            <Route path="/car/new" exact render={(props) => (
                                <NewCarForm {...props} />
                            )}></Route>
                            <Route path="/car/:id" exact render={(props) => (
                                <CarDetails {...props} />
                            )}></Route>
                            <Route path="/car/edit/:id" exact render={(props) => (
                                <NewCarForm {...props} />
                            )}></Route>
                            <Route path="/login" exact render={(props) => (
                                <LoginForm setCurrentUser={this.setCurrentUser.bind(this)} {...props} />
                            )}></Route>
                            <Route path="/register" exact render={(props) => (
                                <RegisterForm {...props} />
                            )}></Route>
                            <Route path="/user/edit/:id" exact render={(props) => (
                                <UserForm {...props} getCurrentUser={this.getCurrentUser.bind(this)} />
                            )}></Route>
                            <Route path="/users" exact render={(props) => (
                                <UserList {...props} getCurrentUser={this.getCurrentUser.bind(this)} />
                            )}></Route>
                            <Route path="/logout" exact component={Logout}></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default MainContainer;