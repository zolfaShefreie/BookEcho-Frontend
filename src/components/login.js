import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


class Login extends React.Component{

    constructor(){
        super();
        this.URL = 'http://127.0.0.1:8000/account/login/';
        this.input_style = {
            backgroundColor: '#3b3636',
            color: 'antiquewhite'
        }
        this.error_style={
            color: 'red',
            fontWeight: 'normal',
            fontSize: '.6em',
        }
        this.state = {
            'errors': {},
            'password': '',
            'username': '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (
            <div className="container box" style={{width: '42%'}}>
                <h1 style={{color: '#3b3636'}}>Login</h1>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }
                <form className="form container" style={{width: '98%'}}>
                    <div className="form-group row m-2">
                        <label htmlFor="username" className="col-form-label col-form-label-sm">Username</label>
                        <input type="text" className="form-control" id="username" style={this.input_style}
                               onChange={this.handleChange} required/>
                        {
                            'username' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['username']}
                            </div>
                        }
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="password" className="col-form-label col-form-label-sm">Password</label>
                        <input type="password" className="form-control" id="password" style={this.input_style}
                               onChange={this.handleChange} required/>
                        {
                            'password' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['password']}
                            </div>
                        }
                    </div>
                    <br/>
                    <button className="btn btn-dark m-2" onClick={this.handleSubmit}>Login</button>
                </form>
                <Link to="/signup/" style={{fontWeight: 'normal'}}>Create Account?</Link>
            </div>
        )
    }

    async handleSubmit(event){
        event.preventDefault();

        await axios.post(`${this.URL}`, {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            console.log(response.data);
        }, (error) => {
            console.log('error', Object.assign({}, error.response.data));
            this.setState({errors: error.response.data})
        });

    }

    async handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value
        await this.setState(newState);
    }
}

export default Login;
