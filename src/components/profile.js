import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import DefaultImg from "../images/default-avatar.jpg"
import ReactRoundedImage from "react-rounded-image";
import ReactAudioPlayer from 'react-audio-player';
import RequestCard from "./request_card";
import LoadingGif from "../images/loading.gif";


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.URL = "http://127.0.0.1:8000/account/profile/"
        this.ApplicantListURL = "http://127.0.0.1:8000/request_management/applicant/requests/"
        this.ProducerListURL = "http://127.0.0.1:8000/request_management/produser/requests/"
        this.state = {
            user: {},
            loading: true,
            items: []
        }
        this.text_style = {
            color: 'antiquewhite'
        }
    }

    async componentDidMount(){
        const response = await axios.get(`${this.URL}`, {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
        await this.setState({user: response.data})
        localStorage.setItem('user_type', response.data.user_type)
        const url = this.state.user.user_type === "normal"? this.ApplicantListURL: this.ProducerListURL
        const response_list = await axios.get( url, {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
        setTimeout(() => {this.setState({items: response_list.data.results, loading: false})}, 800);
        console.log(response_list.data.results)
    }

    render(){
        return(
            <div className="container">
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                <div className="row">
                    <div className="col-auto">
                        <div className="row-auto">
                            <ReactRoundedImage
                                image={this.state.user.avatar ? this.props.avatar: DefaultImg}
                                roundedColor="#343a40"
                                roundedSize="0"
                                imageWidth="200"
                                imageHeight="200"/>
                        </div>
                        <div className="row-auto mt-4">
                            <div className="row">
                                <h5 className="col" style={this.text_style}>{this.state.user.first_name}</h5>
                                <h5 className="col" style={this.text_style}>{this.state.user.last_name}</h5>
                            </div>
                            <h5 className="row-auto ml-2 mt-4" style={this.text_style}>{"@".concat(this.state.user.username)}</h5>
                            {/*{*/}
                            {/*    (this.state.user.user_type === "podcast_producer") &&*/}
                            {/*    <ReactAudioPlayer*/}
                            {/*        src={this.state.user.info.voice_sample}*/}
                            {/*        controls*/}
                            {/*        className="row-auto"*/}
                            {/*        style={{width:'80%', height: "40%"}}*/}
                            {/*    />*/}
                            {/*}*/}
                        </div>
                        <div className="row-auto mt-4">
                            <button className="btn btn-dark">Update</button>
                        </div>
                    </div>
                    <div className="col-auto ml-4 mt-4">
                        <h3 style={this.text_style}>
                            { (this.state.user.user_type === "normal")? "Your Requests" : "Your Received Requests"}
                        </h3>
                        {
                            (!this.state.loading) &&
                            <ul className="">
                                {this.state.items.map((item, index) => {
                                    return <RequestCard item={item} key={item.id} />
                                })}
                            </ul>
                        }
                        {
                            (this.state.loading) &&
                            <img src={LoadingGif}/>
                        }

                    </div>
                </div>
            </div>

        );
    }
}



const mapStateToProps = state => {
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(Profile);