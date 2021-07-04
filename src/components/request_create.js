import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";


class RequestCreate extends React.Component{
    constructor(props){
        super(props);
        this.URL = 'http://127.0.0.1:8000/request_management/producer';
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
            'book_title': '',
            'pages': '',
            'description': '',
            'file': null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="container box" style={{width: '42%'}}>
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                <h3 style={{color: '#3b3636'}}>Create A Request For Produce Podcast</h3>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }
                <form className="form container" style={{width: '98%'}}>
                    <div className="form-group row m-2">
                        <label htmlFor="book_title" className="col-form-label col-form-label-sm">Book Title</label>
                        <input type="text" className="form-control" id="book_title" style={this.input_style}
                               onChange={this.handleChange} required/>
                        {
                            'book_title' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['book_title']}
                            </div>
                        }
                    </div>

                    <div className="form-group row m-2">
                        <label htmlFor="pages" className="col-form-label col-form-label-sm">Page Number</label>
                        <input type="number" className="form-control" id="pages" style={this.input_style}
                               onChange={this.handleChange} required/>
                        {
                            'pages' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['pages']}
                            </div>
                        }
                    </div>
                    <br/>
                    <div className="form-group row m-2">
                        <label htmlFor="description" className="col-form-label col-form-label-sm">Description</label>
                        <textarea className="form-control" id="description" rows="3" style={this.input_style}
                            onChange={this.handleChange} />

                        {
                            'description' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['description']}
                            </div>
                        }
                        <input type="file" className="form-control-file mt-4" id="file" style={this.input_style}
                               onChange={this.handleChange}/>
                        {
                            'file' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['file']}
                            </div>
                        }
                    </div>
                    <br/>
                    <button className="btn btn-dark m-2" onClick={this.handleSubmit}>Create</button>
                </form>
            </div>
        )
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.setState({errors: {}})
        const formData = new FormData();

        formData.append("book_title", this.state.book_title);
        formData.append("pages", this.state.pages);
        formData.append("description", this.state.description);
        formData.append("file", this.state.file);

        await axios.post(`${this.URL}/${localStorage.getItem('producer_id')}/request/`, formData,
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}).then((response) => {
            localStorage.removeItem('producer_id')
            window.location.href = "/producers/";
            console.log(response.data);
        }, (error) => {
            console.log('error', Object.assign({}, error.response.data));
            this.setState({errors: error.response.data})
        });

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
}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(RequestCreate);