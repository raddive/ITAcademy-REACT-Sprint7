import React from "react";
import {Link } from "react-router-dom";

import logo from '../images/atomo.png';

export default function Landing () { 
    return (
        <div className="Landing">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Página inicial para el cálculo de presupuestos</h1>
            <div className="Landing--text">
                <h3>Cada presupuesto dispone de tres opciones a escoger</h3>
                 <p>Presupuesto WEB, permitiendo configurar el número de páginas y número de idiomas</p>
                 <p>Presupuesto para una consultoría SEO</p>
                 <p>Presupuesto para una campaña de marketing</p>
            </div>
            <nav>
                <Link to="/presupuesto"><button className="Landing--button">CONFIGURAR PRESUPUESTO</button></Link>
            </nav>
        </div>
    );
};