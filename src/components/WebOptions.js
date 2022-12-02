import React from "react";

import Input from './Input';

export default function WebOptions (props) { 
    return (
    <div className='web-options'>
        <div className="web-options--line">
        <label>Número de páginas: </label>
        <Input 
        changeValue = {props.setNumPaginas}
        localStorageValue = {Number(localStorage.getItem("NumPaginas"))}
        info ="Este componente debe indicar el número de páginas que tendrá su web"
        />
        </div>
        <div className="web-options--line">
        <label>Número de idiomas: </label>
        <Input 
            changeValue = {props.setNumIdiomas}
            localStorageValue = {Number(localStorage.getItem("NumIdiomas"))}
            info ="Este componente debe indicar el número de idiomas que tendrá su web"
        />
        </div>
    </div>
    )    
};