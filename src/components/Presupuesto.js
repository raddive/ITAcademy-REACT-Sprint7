import React from "react";


export default function Presupuesto (props) { 
    const item = props.presupuesto;
    const b0=item.checkStates[0];
    const b1=item.checkStates[1];
    const b2=item.checkStates[2];
    return (
        <div className="presupuesto">
          <h3>{item.nombre}</h3>
          <p>{item.cliente}</p>
          <p>{item.fecha}</p>
          {b0===true && (<><input type="checkbox" id="bWEB" name="WEB" defaultChecked ={b0}/><label htmlFor="bWEB">WEB</label><br/>
          <ul>
            <li>
              Páginas: {item.numPaginas}
            </li>
            <li>
              Idiomas: {item.numIdiomas}
            </li>
          </ul>
          </>)
          }
          {b1 && <><input type="checkbox" id="bSEO" name="bSEO" defaultChecked={item.checkStates[1]} /><label htmlFor="bSEO">SEO</label><br/></>}
          {b2 && <><input type="checkbox" id="bMKT" name="MARKETING" defaultChecked={item.checkStates[2]} /><label htmlFor="bMKT">MARKETING</label><br/></>}
          <h4>Total: {item.total}</h4>
        </div>
      );
};