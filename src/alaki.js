import React from "react";
import {connect} from "react-redux";
import App from "./App";


class NewCom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'allow': false,
            'message': 'hi'
        }
        this.clickBtn = this.clickBtn.bind(this);
    }

    render(){
        return (
            <div>
                <button onClick={this.clickBtn}>click here</button>
            </div>
        )
    }

    clickBtn(event){
        this.setState({'message': 'bye'})
    }
}

export default NewCom;