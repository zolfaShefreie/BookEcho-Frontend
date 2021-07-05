import React from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import ProducerCart from "./producerCart";
import LoadingGif from "../images/loading.gif"
import {connect} from "react-redux";
import { Modal, Button } from "react-bootstrap";


class Producer extends React.Component{
    constructor(props){
        super(props);
        this.URL = 'http://127.0.0.1:8000/account/producers/'
        this.state = {
            loading: true,
            items: [],
            term: ''
        }
        this.getList = this.getList.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount(){
        this.getList()
    }

    render(){
        return(
            <div className="container" style={{width: '80%'}}>
                {
                    !this.props.is_login &&
                    <Redirect to='/login/'> </Redirect>
                }
                <h1 style={{color: '#3b3636'}}>Podcast Producers</h1>
                <input type="text" placeholder="Search" className="form-control" onChange={this.handleChange}/>
                {
                    (!this.state.loading) &&
                    <ul className="">
                        {this.state.items.map((item, index) => {
                            return <ProducerCart item={item} key={item.id} />
                        })}
                    </ul>
                }
                {
                    (this.state.loading) &&
                    <img src={LoadingGif}/>
                }

            </div>
        )
    }
    async handleChange(event){
        await this.setState({loading: true, term: event.target.value});
        await this.getList();
    }

    async getList(){
        const response = await axios.get(`${this.URL}`, {params: {search: this.state.term},
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}});
        // await this.setState({items: response.data.results, loading: false})
        setTimeout(() => {this.setState({items: response.data.results, loading: false})}, 1000);

    }
}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

export default connect(mapStateToProps, null)(Producer);