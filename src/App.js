import React, { useState, useEffect } from 'react';
import logo from './images/atomo.png';
import './css/App.css';


function Checkbox(props)
{
  return(
    <>
      <input type="checkbox" id={props.idText} name={props.idText} value={props.idText} 
          onClick={props.handlerClick} defaultChecked={props.default ? true : false}/>
      <label htmlFor="html">{props.txt} ({props.precio}€)</label><br/>
    </>
  )
};


function App() {


//USE STATES
  const [total, setTotal] = useState(0);
  const [data] = useState([{id:0,txt:"Una página WEB",precio:500,idText:"web"},
                                   {id:1,txt:"Una campaña SEO",precio:300,idText:"seo"},
                                   {id:2,txt:"Una campaña de publicidad",precio:200,idText:"pub"}]);
  const [checkStates,setCheckStates] = useState([false,false,false]);

//USE EFFECTS
  useEffect(() => 
    {
      // console.log("cambio de state");
      setTotal( () => calculateTotal());
    },[checkStates]);
      
//COMPONENTES
const checkBoxes = data.map( item =>
  {
    return (<Checkbox key={item.id}
              id= {item.id}
              idText={item.idText}
              handlerClick={() => toogleOneState(item.id)} 
              defaultChecked = {checkStates[item.id]}
              txt = {item.txt}
              precio = {item.precio}
    />)
  }
);


//LOGICA
  function calculateTotal()
  {
    let iTotal = 0;
    let iAux;
    for(iAux=0;iAux<data.length;iAux++)
      iTotal += checkStates[iAux] ? data[iAux].precio : 0;

    return iTotal;
  };

  function toogleOneState(iIndex){
    setCheckStates( prevStates => {
      return prevStates.map( (state,index) => (index===iIndex ? !state : state));
    })
  };


  return (
    <div className="AonClick={addItem(0)}pp">
      <header className="
      App-header">
        <h1>Qué quieres hacer?</h1>
        <div className='App-form'>
          {checkBoxes}
        </div>
        <h2>Precio total: {total} €</h2>
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
