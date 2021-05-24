// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Trending from '../../pages/Trending'
import NavBar from '../NavBar';

function index() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path="/trending" exact component={Trending} />
                <Route path='/profile' exact component={Profile} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default index
