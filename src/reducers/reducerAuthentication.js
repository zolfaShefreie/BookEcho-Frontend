import axios from "axios";

var initialState = {}

if (localStorage.getItem('token')){
    initialState={
        is_login: true
    }
}else{
    initialState={
        is_login: false
    }
}


const reducer = (state=initialState, action)=>{
    const newState = {...state}
    if (action.type === 'login'){
        newState.is_login = true
    }
    else if (action.type === 'logout'){
        newState.is_login = false
    }
    return newState
}

export default reducer;