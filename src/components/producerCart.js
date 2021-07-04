import ReactRoundedImage from "react-rounded-image";
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player';
import React from 'react';
import DefaultImg from "../images/default-avatar.jpg"


class ProducerCart extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="card text-left bg-dark w-70 mr-4" style={{color: 'antiquewhite'}}>
                <ReactRoundedImage
                    image={this.props.avatar ? this.props.avatar: DefaultImg}
                    roundedColor="#343a40"
                    roundedSize="0"
                    imageWidth="120"
                    imageHeight="120"
                />
                <div className="card-body ml-4">
                    <h5 className="card-text">{this.props.item.last_name.concat(" ", this.props.item.first_name)}</h5>
                    <h5 className="card-text">{"@".concat(this.props.item.username)}</h5>
                    <ReactAudioPlayer
                        src={this.props.item.info.voice_sample}
                        controls
                        className="card-text"
                        style={{width:'80%', height: "40%"}}
                    />

                </div>
                <button className="btn btn-dark " onClick={this.handleClick}>make request</button>
        </div>
        )
    }

    handleClick(){
        localStorage.setItem('producer_id', this.props.item.id)
        window.location.href = "/apply-request/";
    }

}

export default ProducerCart;