import React, { useEffect } from 'react';
import { Route, Switch, useHistory, BrowserRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" render={() => <Login/>}/>
                <Route exact path="/signup" render={() => <SignUp/>}/>
            </Switch>
        </BrowserRouter>

    );
}