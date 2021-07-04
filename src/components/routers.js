import React, { useEffect } from 'react';
import { Route, Switch, useHistory, BrowserRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import Info from "./producerInfo";


export default function Routes() {
    return (

        <Switch>
            <Route exact path="/login" render={() => <Login/>}/>
            <Route exact path="/signup" render={() => <SignUp/>}/>
            <Route exact path="/producer/info" render={() => <Info/>}/>
        </Switch>
    );
}