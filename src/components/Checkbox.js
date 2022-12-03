import React from "react";
import WebOptions from "./WebOptions";

export default function Checkbox (props) { 
    return(
      <div className='App-form'>
          <input type="checkbox" id={props.id} name={props.idText} value={props.idText} 
              onClick={props.handlerClick} defaultChecked={props.defaultChecked ? true : false}/>
          <label htmlFor={props.id}>{props.txt} ({props.precio}€)</label><br/>
          {props.id===0 && props.defaultChecked && <WebOptions 
                                                      presupuesto = {props.presupuesto}
                                                      setNumPaginas={props.setNumPaginas}
                                                      setNumIdiomas={props.setNumIdiomas}
                                                       />}
        </div>
      )    
};