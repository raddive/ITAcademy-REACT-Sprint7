import React, { useState } from "react";

import sortAZ from '../images/sortAZ.png';
import sortDate from '../images/sortDate.png';
import sortRestart from '../images/sortRestart.png';
import search from '../images/search.png';

export default function Toolbar (props) { 
    const [searchTxt,setSearchTxt] =useState("");
    function handleChange(event)
    {
        setSearchTxt(event.target.value);
    }
    return (
        <>
            <h4>Presupuestos anteriores</h4>
            <div className="Toolbar">
                <img src={sortAZ} className="Main-right-sort-icon" alt="sortAZ" onClick={props.orderByName}/>
                <img src={sortDate} className="Main-right-sort-icon" alt="sortDate" onClick={props.orderByDate}/>
                <img src={sortRestart} className="Main-right-sort-icon" alt="sortDate" onClick={props.orderRestart}/><br/>
                <div className="Toolbar-searchbar">
                    <input type="text" id="nombre" name="nombre" placeholder="...buscar" value={searchTxt} onChange={handleChange} />
                    <div className="Toolbar-searchbar-divicon">
                        <img src={search} className="Main-right-sort-icon" alt="sortDate" onClick={() => props.searchBudget(searchTxt)}/><br/><br/>
                    </div>
                </div>
            </div>    
        </>
        );
};