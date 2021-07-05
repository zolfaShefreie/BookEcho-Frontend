import React from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import DefaultImg from "../images/default-avatar.jpg";
import ReactRoundedImage from "react-rounded-image";

class UpdateProfile extends React.Component{

    constructor(){
        super();
        this.URL = 'http://127.0.0.1:8000/account/profile/';
        this.submitURL = 'http://127.0.0.1:8000/account/update/';
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
            'username': '',
            'last_name': '',
            'first_name': '',
            'email': '',
            "user_type": '',
            'info': null,
            'avatar': null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const response = await axios.get(`${this.URL}`, {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
        await this.setState(response.data)
    }

    render(){
        return (
            <div className="container box" style={{width: '42%'}}>
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                <h1 style={{color: '#3b3636'}}>SignUp</h1>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }

                <form className="form container" style={{width: '98%'}}>

                    <div className="form-row mr-4 ml-4">
                        <div className="col"><ReactRoundedImage
                                image={this.state.avatar ? this.state.avatar: DefaultImg}
                                roundedColor="#343a40"
                                roundedSize="0"
                                imageWidth="200"
                                imageHeight="200"

                                /></div>
                        <div className="col ml-2">
                            <div className="row">
                                <div className="form-group row">
                                    <label htmlFor="first_name"
                                           className="col-form-label col-form-label-sm">FirstName</label>
                                    <input type="text" className="form-control" style={this.input_style}
                                           value={this.state.first_name} id="first_name"
                                           onChange={this.handleChange} required/>
                                    {
                                        'first_name' in this.state.errors &&
                                        <div style={this.error_style}>
                                            {this.state.errors['first_name']}
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className="row">
                                <div className="form-group row">
                                    <label htmlFor="last_name"
                                           className="col-form-label col-form-label-sm">LastName</label>
                                    <input type="text" className="form-control" style={this.input_style} id="last_name"
                                           value={this.state.last_name}
                                           onChange={this.handleChange} required/>
                                    {
                                        'last_name' in this.state.errors &&
                                        <div style={this.error_style}>
                                            {this.state.errors['last_name']}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group row mr-1">
                                    <label htmlFor="avatar"
                                           className="col-form-label col-form-label-sm">Avatar</label>
                                    <input type="file" className="form-control" style={this.input_style} id="avatar"
                                           onChange={this.handleChange} required/>
                                    {
                                        'avatar' in this.state.errors &&
                                        <div style={this.error_style}>
                                            {this.state.errors['avatar']}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="email" className="col-form-label col-form-label-sm" >Email</label>
                        <input type="text" className="form-control" id="email" style={this.input_style}
                               value={this.state.email}
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
                               value={this.state.username}
                               onChange={this.handleChange} required/>
                        {
                            'username' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['username']}
                            </div>
                        }
                    </div>

                    <br/>

                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-dark">
                            <input type="radio" name="options" id="podcast" onClick={this.handleSubmit} autoComplete="off"/>Submit
                            </label>

                            {
                                this.state.user_type==="podcast_producer" &&
                                    <label className="btn btn-dark">
                                    <input type="radio" name="options" id="info" onClick={()=>{window.location.href="/producer/info/"}}
                                           autoComplete="off"/>Edit Voice Sample
                                     </label>
                            }
                            </div>
                </form>
            </div>
        );
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.setState({errors: {}})
        const formData = new FormData();

        formData.append("username", this.state.username);
        formData.append("first_name", this.state.first_name);
        formData.append("last_name", this.state.last_name);
        if (typeof(this.state.avatar) == "object"){
            formData.append("avatar", this.state.avatar);
        }
        formData.append("email", this.state.email);
        await axios.patch(`${this.submitURL}`, formData, {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}).then((response) => {
            window.location.reload()
            console.log(response.data);
        }, (error) => {
            console.log('error', Object.assign({}, error.response.data));
            this.setState({errors: error.response.data})
        });

    }

    async handleChange(event) {
        const newState = {}
        if (event.target.id === 'avatar'){
            newState[event.target.id] = event.target.files[0]
        }else{
            newState[event.target.id] = event.target.value
        }
        await this.setState(newState);
        console.log(this.state.avatar)
    }
}

const mapStateToProps = state => {
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(UpdateProfile);