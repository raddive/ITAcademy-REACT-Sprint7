import React, { useState, useEffect } from 'react';
import logo from './images/atomo.png';
import './css/App.css';

function App() {

  const options = ["Una página WEB (500€)","Una campaña SEO (300€)","Una campaña de publicidad (200€)"];
  // console.log(options);
  const [total, setTotal] = useState(0);
  const [checkStates,setCheckStates] = useState([false,false,false]);
  // console.log(checkStates);

//USE EFFECTS
  useEffect(() => 
    {
      // console.log("cambio de state");
      setTotal( () => {
        const c0=checkStates[0] ? 500 : 0;
        const c1=checkStates[1] ? 300 : 0;
        const c2=checkStates[2] ? 200 : 0;
        return c0+c1+c2;
      })
    }
    , [checkStates]);


  function toogleOneState(iIndex){
    // console.log(toogleOneState);
    setCheckStates( prevStates => {
      return prevStates.map( (state,index) =>
        {
          if(index===iIndex)
            return !state;
          else
            return state; 
        }
      )
    })
  };

  return (
    <div className="AonClick={addItem(0)}pp">
      <header className="
      App-header">
        <h1>Qué quieres hacer?</h1>
        <div className='App-form'>
          <input type="checkbox" id="web" name="input_pres" value="WEB" onClick={(event) => toogleOneState(0)} defaultChecked={checkStates[0] ? true : false}/>
          <label htmlFor="html">Una página WEB (500€)</label><br/>
          <input type="checkbox" id="seo" name="input_pres" value="SEO" onClick={(event) => toogleOneState(1)} defaultChecked={checkStates[1] ? true : false}/>
          <label htmlFor="css">Una campaña SEO (300€)</label><br/>
          <input type="checkbox" id="publi" name="input_pres" value="PUBLI" onClick={(event) => toogleOneState(2)} defaultChecked={checkStates[2] ? true : false}/>
          <label htmlFor="javascript">Una campaña de publicidad (200€)</label><br/>
        </div>
        <h2>Precio total: {total} €</h2>
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
