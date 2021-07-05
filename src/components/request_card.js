import ReactRoundedImage from "react-rounded-image";
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player';
import React from 'react';
import axios from "axios";



class RequestCard extends React.Component{
    constructor(props){
        super(props)
        this.baseURL = "http://127.0.0.1:8000/request_management/request/"
        this.podcastActiveURL = "http://127.0.0.1:8000/podcast-management/request/"
        this.handleClick = this.handleClick.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleAccept = this.handleReject.bind(this);
        this.handleAddPodcast = this.handleAddPodcast.bind(this);
        this.handleDeadLineAccept = this.handleDeadLineAccept.bind(this);
        this.handleDeadLineReject = this.handleDeadLineReject.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleActive = this.handleActive.bind(this);
    }

    render() {
        return (
            <div className="card cart_box text-left bg-dark w-70 mr-4" style={{color: '#69625b'}}>
                <div className="card-body ml-4">
                    <h5 className="card-text">{"Book Title: ".concat(this.props.item.book_title)}</h5>
                    <div className="row">
                        <h5 className="card-text col-auto">{"Pages: ".concat(this.props.item.pages)}</h5>
                        <h5 className="Card-text col-auto">{"Status: ".concat(this.props.item.status)}</h5>
                        <h5 className="Card-text col-auto">{"Deadline: ".concat(this.props.item.deadline? this.props.item.deadline:"")}</h5>
                    </div>

                    <h5 className="Card-text">
                        {localStorage.getItem("user_type") ==="normal" ?
                            "Producer: @".concat(this.props.item.podcast_producer.username) :
                            "Applicant: @".concat(this.props.item.applicant.username)
                        }</h5>
                    {
                        this.props.item.description &&
                            <div>
                                <h5 className="card-text">Description:</h5>
                                <p>{this.props.item.description}</p>
                            </div>
                    }

                    <button className="btn btn-outline-light card-text" id="pdf" onClick={this.handleClick}>Get Pdf</button>
                    {
                        this.props.item.podcast &&
                        <div>
                            <h4 className="card-text">Podcast:</h4>
                            {
                            this.props.item.podcast.description &&
                            <div>
                                <h5 className="card-text">Description:</h5>
                                <p>{this.props.item.podcast.description}</p>
                            </div>
                            }
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-secondary">
                            <input type="radio" name="options" id="podcast" onClick={this.handleClick} autoComplete="off"/>Get Podcast
                            </label>

                            {
                                (localStorage.getItem("user_type")==="podcast_producer" &&
                                    !this.props.item.podcast.is_active) &&
                                    <label className="btn btn-secondary">
                                    <input type="radio" name="options" id="active" onClick={this.handleActive} autoComplete="off"/>Set Active
                                     </label>
                            }
                            </div>
                        </div>
                    }
                    <p/>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="reject" onClick={this.handleReject} autoComplete="off"/> Reject
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="accept" onClick={this.handleAccept} autoComplete="off"/> Accept
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="reject_deadline" onClick={this.handleReject} autoComplete="off"/> Reject DeadLine
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="accept_deadline" onClick={this.handleDeadLineAccept}
                                   autoComplete="off"/> accept DeadLine
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="delete" autoComplete="on" onClick={this.handleDelete}
                                   disabled={false}/> Delete
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="add_podcast" autoComplete="off" onClick={this.handleAddPodcast}
                                   disabled={true}/>
                            Add Change Podcast
                        </label>
                    </div>
                </div>

        </div>
        )
    }

    async handleReject(event){
        if (localStorage.getItem('user_type')==='podcast_producer' && this.props.item.status==="pending")
        {
            const response = await axios.post(`${this.baseURL}${this.props.item.id}/producer-reject/`,  {},
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
            window.location.href = '/profile/'
        }
    }

    async handleDeadLineAccept(event){
        if (localStorage.getItem('user_type')==='normal' && this.props.item.status==="accept")
        {
            const response = await axios.post(`${this.baseURL}${this.props.item.id}/deadline-accept/`,  {},
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
            window.location.href = '/profile/'
        }

    }

    handleAccept(event){
        if (localStorage.getItem('user_type')==='podcast_producer' && this.props.item.status==="pending"){
            localStorage.setItem('req_id', this.props.item.id);
            window.location.href = '/set-deadline/';
        }
    }

    async handleDeadLineReject(event){
        if (localStorage.getItem('user_type')==='normal' && this.props.item.status==="accept")
        {
            const response = await axios.post(`${this.baseURL}${this.props.item.id}/deadline-reject/`,  {},
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
            window.location.href = '/profile/'
        }
    }

    handleAddPodcast(event){
        if (localStorage.getItem('user_type')==='podcast_producer' && this.props.item.status==="active" &&
            (!this.props.item.podcast || !this.props.item.podcast.is_active)){
            localStorage.setItem('req_id', this.props.item.id);
            window.location.href = '/add-change-podcast/';
        }
    }

    async handleDelete(event){
        if (localStorage.getItem('user_type')==='normal' && this.props.item.status==="pending") {
            const response = await axios.delete(`${this.baseURL}${this.props.item.id}/`,
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
            window.location.href = '/profile/'
        }
    }

    async handleActive(event){
        if (localStorage.getItem('user_type')==='podcast_producer' && this.props.item.podcast &&
            !this.props.item.podcast.is_active)
        {
            const response = await axios.delete(`${this.podcastActiveURL}${this.props.item.id}/podcast/set-active/`,
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
            window.location.href = '/profile/'
        }
    }


    handleClick(event){
        var url = "";
        if (event.target.id === 'pdf'){
            url=this.props.item.file;
        }else if(event.target.id === 'podcast'){
            url = this.props.item.podcast.file
        }
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

}

export default RequestCard;