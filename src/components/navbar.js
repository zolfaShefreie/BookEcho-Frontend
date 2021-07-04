import React from 'react';
import axios from "axios";
import {Link, BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";


class Navbar extends React.Component{

    constructor(props){
        super(props)
        this.URL = 'http://127.0.0.1:8000/account/logout/';
        this.handleLogout = this.handleLogout.bind(this)
    }

    render(){
        return (
            <nav className="navbar dark">
                <ul className="nav justify-content-end">
                    {
                        !this.props.is_login &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup/" style={{color: 'antiquewhite'}}>SignUp</Link>
                        </li>
                    }
                    {
                        !this.props.is_login &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/login/" style={{color: 'antiquewhite'}}>Login</Link>
                        </li>
                    }

                    {
                        this.props.is_login &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/login/" style={{color: 'antiquewhite'}}>Producers</Link>
                        </li>
                    }
                </ul>
                {
                    this.props.is_login &&
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup/" style={{color: 'antiquewhite'}}>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" style={{color: 'antiquewhite'}} onClick={this.handleLogout}>Logout</Link>
                        </li>
                    </ul>
                }

            </nav>
        )
    }

    async handleLogout(event){
        await axios.post(`${this.URL}`, {}).then((response) => {
            localStorage.removeItem('user_id');
            localStorage.removeItem('token');
            this.props.Logout()
        }, (error) => {
            window.alert(error.response.data)
        });
    }
}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        Logout: () => dispatch({type: 'logout'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);