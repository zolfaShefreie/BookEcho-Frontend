import React from 'react';
import axios from "axios";


class SignUp extends React.Component{

    constructor(){
        super();
        this.input_style = {
            backgroundColor: '#3b3636',
            color: 'antiquewhite'
        }

    }

    render(){
        return (
            <div className="container box" style={{width: '42%'}}>
                <h1 style={{color: '#3b3636'}}>SignUp</h1>
                <form className="form container" style={{width: '98%'}}>
                    <div className="form-row mr-4 ml-4">
                        <div className="col">
                            <div className="form-group row mr-2">
                                <label htmlFor="firstname"
                                       className="col-form-label col-form-label-sm">FirstName</label>
                                <input type="text" className="form-control" style={this.input_style} id="firstname" />
                            </div>

                        </div>
                        <div className="col">
                            <div className="form-group row ml-2">
                                <label htmlFor="lastname"
                                       className="col-form-label col-form-label-sm">LastName</label>
                                <input type="text" className="form-control" style={this.input_style} id="lastname"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="email" className="col-form-label col-form-label-sm">Email</label>
                        <input type="text" className="form-control" id="email" style={this.input_style} placeholder="user@example.com"/>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="username" className="col-form-label col-form-label-sm">Username</label>
                        <input type="text" className="form-control" id="username" style={this.input_style}/>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="password" className="col-form-label col-form-label-sm">Password</label>
                        <input type="password" className="form-control" id="password" style={this.input_style}/>
                    </div>
                    <div className="form-group row m-2">
                        <label htmlFor="password-repeat" className="col-form-label col-form-label-sm">Repeat Password</label>
                        <input type="password" className="form-control" id="password-repeat" style={this.input_style}/>
                    </div>
                    <div className="form-group row m-2">

                        <div className="custom-control custom-radio mr-4">
                            <input type="radio" id="normal" name="customRadioInline1"
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="noraml">Normal </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="producer" name="customRadioInline1"
                                   className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="producer">Podcast Producer</label>
                        </div>

                    </div>
                    <input type="submit" className="btn btn-dark m-2"/>
                </form>
            </div>
        );
    }
    async submit(event){

    }
}

export default SignUp;