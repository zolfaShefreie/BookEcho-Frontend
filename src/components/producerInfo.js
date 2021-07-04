import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";


class Info extends React.Component{
    constructor(props){
        super(props)
        this.URL = 'http://127.0.0.1:8000/account/info/';
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
            'voice_sample': null,
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log(this.props)
        return (
            <div className="container box" style={{width: '42%'}}>
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                <h1 style={{color: '#3b3636'}}>Your Voice Sample</h1>
                {
                    'non_field_errors' in this.state.errors &&
                    <div className='alert alert-danger mt-3'>
                        <p className="text-center">{this.state.errors['non_field_errors']}</p>
                    </div>
                }
                <form className="form container" style={{width: '98%'}}>
                    <div className="form-group mt-4">
                        <input type="file" className="form-control-file" id="voice_sample" style={this.input_style}
                               onChange={this.handleChange}/>
                        {
                            'voice_sample' in this.state.errors &&
                            <div style={this.error_style}>
                                {this.state.errors['voice_sample']}
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
        newState[event.target.id] = event.target.files[0]
        await this.setState(newState);
    }

    async handleSubmit(event){
        event.preventDefault();
        await this.setState({errors: {}})
        await axios.post(`${this.URL}`, {
            voice_sample: this.state.voice_sample
        }, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((response) => {
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

export default connect(mapStateToProps, null)(Info);