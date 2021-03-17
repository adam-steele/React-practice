import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetail";
import { ConnectedLogin } from "./login";
import { Redirect } from "react-router";

const RouteGuard = Component => ({match})=>{
    console.info("Route Guard", match);
    if(!store.getState().session.authenticated){
       return  <Redirect to="/" />
    } {
        return <Component match= {match}/>
    }
    
};

export const Main = () => (
    <Router history={history}>
        <Provider store = {store}>
            <div>
                <ConnectedNavigation/>
                {/*<ConnectedDashboard/>*/}
                <Route exact 
                path ="/"
                component={ConnectedLogin}/>
                <Route exact
                 path="/dashboard" 
                render={RouteGuard(ConnectedDashboard)}/>

                <Route exact 
                path = "/task/:id"
                render = {RouteGuard(ConnectedTaskDetail)}/>
    
            </div>
        </Provider>
    </Router>
)