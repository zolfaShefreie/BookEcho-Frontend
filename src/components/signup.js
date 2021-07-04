import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class SignUp extends React.Component{

    constructor(){
        super();
        this.URL = 'http://127.0.0.1:8000/account/signup/';
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
            'password_error': '',
            'password': '',
            'username': '',
            'lastname': '',
            'firstname': '',
            'password_repeat': '',
            'email': '',
            'user_type': 'normal',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (
            <div className="container box" style={{width: '42%'}}>
                <h1 style={{color: '#3b3636'}}>SignUp</h1>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }
                <form className="form container" style={{width: '98%'}}>
                    <div className="form-row mr-4 ml-4">
                        <div className="col">
                            <div className="form-group row mr-2">
                                <label htmlFor="firstname"
                                       className="col-form-label col-form-label-sm">FirstName</label>
                                <input type="text" className="form-control" style={this.input_style} id="firstname"
                                       onChange={this.handleChange} required/>
                                {
                                    'first_name' in this.state.errors &&
                                    <div style={this.error_style}>
                                        {this.state.errors['first_name']}
                                    </div>
                                }
                            </div>

                        </div>
                        <div className="col">
                            <div className="form-group row ml-2">
                                <label htmlFor="lastname"
                                       className="col-form-label col-form-label-sm">LastName</label>
                                <input type="text" className="form-control" style={this.input_style} id="lastname"
                                       onChange={this.handleChange} required/>
                                {
                                    'last_name' in this.state.errors &&
                                    <div style={this.error_style}>
                                        {this.state.errors['last_name']}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="email" className="col-form-label col-form-label-sm">Email</label>
                        <input type="text" className="form-control" id="email" style={this.input_style}
                               placeholder="user@example.com" onChange={this.handleChange} required/>
                        {
                            'email' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['email']}
                            </div>
                        }
                    </div>
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
                    <div className="form-group row m-2">
                        <label htmlFor="password_repeat" className="col-form-label col-form-label-sm">Repeat Password</label>
                        <input type="password" className="form-control" onChange={this.handleChange}
                               id="password_repeat" style={this.input_style} required/>
                        {
                            <div style={this.error_style}>
                                {this.state.password_error}
                            </div>
                        }
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2 mb-2">
                        <input type="radio" id="customRadioInline1" name="customRadioInline1"
                               className="custom-control-input" defaultChecked onChange={this.handleChange}/>
                            <label className="custom-control-label" htmlFor="customRadioInline1">Normal</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="customRadioInline1"
                               className="custom-control-input" onChange={this.handleChange}/>
                            <label className="custom-control-label" htmlFor="customRadioInline2">Podcast Producer</label>
                    </div>
                    <br/>
                    <button className="btn btn-dark m-2" onClick={this.handleSubmit}>Submit</button>
                </form>
                <Link to="/login/" style={{fontWeight: 'normal'}}>Have Account?</Link>
            </div>
        );
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.setState({errors: {}})

        await axios.post(`${this.URL}`, {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            user_type: this.state.user_type
        }).then((response) => {
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            this.props.Login()
        }, (error) => {
            console.log('error', Object.assign({}, error.response.data));
            this.setState({errors: error.response.data})
        });

    }

    async handleChange(event){
        await this.setState({'password_error': ""})
        if (event.target.id === 'customRadioInline2' && event.target.value === 'on'){
            await this.setState({'user_type': 'podcast_producer'})
        }else if(event.target.id === 'customRadioInline1' && event.target.value === 'on'){
            await this.setState({'user_type': 'normal'})
        }
        else {
            const newState = {}
            newState[event.target.id] = event.target.value
            await this.setState(newState);
        }

        if (this.state.password !== this.state.password_repeat){
            await this.setState({'password_error': "the password fields doesn't match to each other"})
        }
    }
}

const mapStateToProps = state => {
    return {
        is_login: state.is_login
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        Login: () => dispatch({type: 'login'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);