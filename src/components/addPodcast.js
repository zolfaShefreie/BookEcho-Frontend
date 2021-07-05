import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";


class Podcast extends React.Component{
    constructor(props){
        super(props)
        this.URL = 'http://127.0.0.1:8000/podcast-management/request/';
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
            'file': null,
            'description': ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log(this.props)
        return (
            <div className="container box" style={{width: '42%'}}>
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                {
                    !localStorage.getItem("req_id") &&
                    <Redirect to='/profile/'> </Redirect>
                }
                <h1 style={{color: '#3b3636'}}>Add Podcast</h1>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }
                <form className="form container" style={{width: '98%'}}>
                    <label htmlFor="description" className="col-form-label col-form-label-sm">Description</label>
                    <textarea className="form-control" id="description" rows="3" style={this.input_style}
                              onChange={this.handleChange} />
                    {
                        'description' in this.state.errors &&
                        <div style={this.error_style}>
                            {this.state.errors['description']}
                        </div>
                    }
                    <div className="form-group mt-4">
                        <input type="file" className="form-control-file" id="file" style={this.input_style}
                               onChange={this.handleChange}/>
                        {
                            'file' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['file']}
                            </div>
                        }
                    </div>
                </form>
                <button className="btn btn-dark m-2" onClick={this.handleSubmit}>Submit</button>
            </div>

        )
    }

    async handleChange(event) {
        const newState = {}
        if (event.target.id === 'file'){
            newState[event.target.id] = event.target.files[0]
        }else{
            newState[event.target.id] = event.target.value
        }
        await this.setState(newState);
    }

    async handleSubmit(event){
        event.preventDefault();
        await this.setState({errors: {}})

        const formData = new FormData();
        formData.append("description", this.state.description);
        formData.append("file", this.state.file);

        await axios.post(`${this.URL}${localStorage.getItem("req_id")}/podcast/`, formData,
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}).then((response) => {
            localStorage.removeItem("req_id")
            window.location.href = "/profile/"
            console.log(response.data);
        }, (error) => {
            console.log('error', Object.assign({}, error.response.data));
            this.setState({errors: error.response.data})
        });

    }
}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(Podcast);