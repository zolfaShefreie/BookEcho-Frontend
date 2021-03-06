import React, { useEffect } from 'react';
import { Route, Switch, useHistory, BrowserRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import Info from "./producerInfo";
import Producer from "./producerList";
import RequestCreate from "./request_create";
import Profile from "./profile";
import Podcast from "./addPodcast";
import SetDeadline from "./setDeadline";
import UpdateProfile from "./updateProfile";
import Home from "./home"


export default function Routes() {
    return (

        <Switch>
            <Route exact path="/login" render={() => <Login/>}/>
            <Route exact path="/signup" render={() => <SignUp/>}/>
            <Route exact path="/producer/info" render={() => <Info/>}/>
            <Route exact path="/producers" render={() => <Producer/>}/>
            <Route exact path="/apply-request/" render={() => <RequestCreate/>}/>
            <Route exact path="/profile/" render={() => <Profile/>}/>
            <Route exact path="/add-change-podcast/" render={() => <Podcast/>}/>
            <Route exact path="/set-deadline/" render={() => <SetDeadline/>}/>
            <Route exact path="/profile/update/" render={() => <UpdateProfile/>}/>
            <Route exact path="/" render={() => <Home/>}/>
        </Switch>
    );
}