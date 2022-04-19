import React, {Component} from "react";
import UserService from "../Services/UserService";

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            update: false
        }

        this.showEditForm = this.showEditForm.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

    }

    componentDidMount() {
        UserService.getAllUsers().then(res => {
            this.setState({users: res.data});
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.update !== this.state.update) {
            UserService.getAllUsers().then(res => {
                this.setState({users: res.data})
            });
        }

    }

    showEditForm(id) {
        this.props.history.push(`/user/edit/${id}`);
    }

    delete(id) {
        UserService.deleteById(id).then(res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        }).catch(err => {
            console.log(err);
        });
    }

    changeStatus(id) {
        UserService.zmienStatus(id).then(res => {
            this.setState({update: !this.state.update});
        }).catch(err => {

        });
    }


    render() {
        return (
            <div>
                <div className="container text-center">
                    <div>
                        <h2>Zarządzaj użytkownikami</h2>
                    </div>
                </div>
                <div className="container-fluid">
                    <table id="table" className="table table-bordered">
                        <thead className="table-blue">
                        <tr>
                            <th>ID</th>
                            <th>E-mail</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Rola</th>
                            <th>Akcje</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.imie}</td>
                                        <td>{user.nazwisko}</td>
                                        <td>{user.rola}</td>
                                        <td>{user.status ? "aktywny" : "zablokowany"}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => this.showEditForm(user.id)}>Edytuj
                                            </button>
                                            <button className="btn btn-primary"
                                                    onClick={() => this.delete(user.id)}>Usuń
                                            </button>
                                            {user.status ? <button className="btn btn-primary"
                                                                   onClick={() => this.changeStatus(user.id)}>Zablokuj</button>
                                                :
                                                <button className="btn btn-dark"
                                                        onClick={() => this.changeStatus(user.id)}>Odblokuj</button>
                                            }
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserList;