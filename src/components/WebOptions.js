import React from "react";

import Input from './Input';

export default function WebOptions (props) { 
    const numPaginas=Number(props.presupuesto.numPaginas);
    const numIdiomas=Number(props.presupuesto.numIdiomas);
    
    return (
    <div className='web-options'>
        <div className="web-options--line">
        <label>Número de páginas: </label>
        <Input
        name="numPags" 
        changeValue = {props.setNumPaginas}
        localStorageValue = {numPaginas}
        info ="Este componente debe indicar el número de páginas que tendrá su web"
        handlerChange={props.handlerChange}
        />
        </div>
        <div className="web-options--line">
        <label>Número de idiomas: </label>
        <Input 
            name="numIds" 
            changeValue = {props.setNumIdiomas}
            localStorageValue = {numIdiomas}
            info ="Este componente debe indicar el número de idiomas que tendrá su web"
            handlerChange={props.handlerChange}            
        />
        </div>
    </div>
    )    
};