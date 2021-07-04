import axios from "axios";
import {connect} from "react-redux";


const refresh = async (props) => {
    const URL = "http://127.0.0.1:8000/api-token-refresh/"
    if (props.is_login){
        await axios.post(`${URL}`, {
            token: localStorage.getItem('token')
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
        }, (error) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            props.Logout()
        });
    }

}

const mapStateToProps = state => {
    console.log(state.is_login)
    return {
        is_login: state.is_login
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        Logout: () => dispatch({type: 'logout'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(refresh);