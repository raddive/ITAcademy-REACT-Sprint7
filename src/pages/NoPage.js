import React from "react";
import logo from '../images/atomo.png';

export default function NoPage () { 
    return (
        <div className="App">
            <h1>404 - No page found</h1>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};