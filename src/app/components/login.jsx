import React from 'react'
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const LogInComponent = ({authenticateUser, authenticated})=>{
    return <div>
        <h2>Please may you log in here</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev"/>
            <input type ="password" placeholder="password" name="password" defaultValue="Too" />
            {authenticated === mutations.NOT_AUTHENTICATED ? <p>Log In Incorrect</p> : null}
            <button type="submit" >Log In</button>
        </form>
    </div>
};

const mapStateToProps = ({session})=>({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch)=>({
    authenticateUser(e){
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username,password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LogInComponent);