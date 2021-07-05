import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import ConvertImg from "../images/convert.png"
import LogoGif from "../images/logo_center.gif"
import TellerImg from "../images/teller.png"
import ScoreImg from "../images/score.png"
import ListenImg from "../images/listening.png"
import '../home_page.css';




class Home extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="container">
                {
                    this.props.is_login &&
                        <Redirect to='/profile/'> </Redirect>
                }
                <div className="center">
                    <img src={LogoGif} className="img-center"/>
                        <h1 className="h_header">Book Echo</h1>
                        <h3>
                            listen your book with your ideal voice
                        </h3>
                </div>

                <div className="col center container">
                    <div className="row">
                        <img src={ConvertImg} className="col-sm-6"/>
                            <div className="col-sm-4 text_center">
                                <h2>Order The Podcast</h2>
                                <p>You can make a request to produce the podcast of your favourite book. assign the
                                    request
                                    to some podcast producer privately or send if to all</p>
                            </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4 text_center">
                            <h2>Accept & Reject Requests</h2>
                            <p>You can sign up as podcast producer and accept the requests and set the deadline or
                                reject them.</p>
                        </div>
                        <img src={TellerImg} className="col-sm-6"/>
                    </div>

                    <div className="row">
                        <img src={ScoreImg} className="col-sm-6"/>
                            <div className="col-sm-4 text_center">
                                <h2>Rating</h2>
                                <p>We have two rating system:<br/>1. your customers rate you
                                    <br/>2. and the system change your points based on delivery time</p>
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text_center">
                            <h2>Download The Podcasts</h2>
                            <p>Download the podcasts and enjoy listening</p>
                        </div>
                        <img src={ListenImg} className="col-sm-6 justify-content-evenly"/>
                    </div>
                    <p style={{backgroundColor: "#000000", color: "#000000"}}>.</p>
                    <div className="row-auto">
                        <button type="button" className="btn btn-dark" onClick={()=>{window.location.href="/signup/"}}>Let's get started...</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(Home);