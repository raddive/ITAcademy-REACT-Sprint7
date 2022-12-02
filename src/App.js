import React, { useState, useEffect } from 'react';
import logo from './images/atomo.png';
import './css/App.css';



function Input(props)
{
  const [value,setValue] = useState(props.localStorageValue);

  useEffect(() => {
    onChange();
  },[value]);

  function onChange()
  {
    return props.changeValue(value)
  }

  function Decrease()
  {
    setValue(prev => prev>0 ? prev-1:prev);
  }

  function Increase()
  {
    setValue(prev => prev+1);
  }

  return (
    <>
      <div className="input">
              <button className="input--minus" onClick={Decrease}>–</button>
              <div className="input--count">
                  <input 
                      type="text" 
                      inputMode="numeric" 
                      value={value}
                      onChange={(event) => setValue(Number(event.target.value))}></input>
              </div>
              <button className="input--plus" onClick={Increase}>+</button>
      </div>
    </>
  )
};

function WebOptions(props)
{
  return (
    <div className='web-options'>
      <div className="web-options--line">
        <label>Número de páginas: </label>
        <Input 
        changeValue = {props.setNumPaginas}
        localStorageValue = {Number(localStorage.getItem("NumPaginas"))}
        />
      </div>
      <div className="web-options--line">
        <label>Número de idiomas: </label>
        <Input 
          changeValue = {props.setNumIdiomas}
          localStorageValue = {Number(localStorage.getItem("NumIdiomas"))}
        />
      </div>
    </div>
    )

};


function Checkbox(props)
{
  return(
    <>
      <input type="checkbox" id={props.id} name={props.idText} value={props.idText} 
          onClick={props.handlerClick} defaultChecked={props.defaultChecked ? true : false}/>
      <label htmlFor="html">{props.txt} ({props.precio}€)</label><br/>
      {props.id===0 && props.defaultChecked && <WebOptions 
                                                  setNumPaginas={props.setNumPaginas}
                                                  setNumIdiomas={props.setNumIdiomas}
                                                   />}
    </>
  )
};


function App() {


//USE STATES

  const [data] = useState([{id:0,txt:"Una página WEB",precio:500,idText:"web"},
                           {id:1,txt:"Una campaña SEO",precio:300,idText:"seo"},
                           {id:2,txt:"Una campaña de publicidad",precio:200,idText:"pub"}]);

  const [total, setTotal] = useState(0);
  const [checkStates,setCheckStates] = useState(localStorage.getItem("States")? JSON.parse(localStorage.getItem("States")): [false,false,false]);
  const [numPaginas,setNumPaginas] = useState(localStorage.getItem("NumPaginas")? Number(localStorage.getItem("NumPaginas")): 0);
  const [numIdiomas,setNumIdiomas] = useState(localStorage.getItem("NumIdiomas")? Number(localStorage.getItem("NumIdiomas")): 0);

  //TODO NO FUNCIONA
  // const [checkStates,setCheckStates] = useState([true,false,false]);
  // const [numPaginas,setNumPaginas] = useState(0);
  // const [numIdiomas,setNumIdiomas] = useState(0);
  

  function ClearLocalStorage()
  {
    localStorage.removeItem("States");
    localStorage.removeItem("NumPaginas");
    localStorage.removeItem("NumIdiomas");
    localStorage.removeItem("bWEB");
  }
  //USE EFFECTS


  useEffect(() => 
    { 
  //TODO NO FUNCIONA
      //console.log("Primera vez");
      //console.log(localStorage.getItem("States"));
      // setCheckStates(localStorage.getItem("States")!==null ? JSON.parse(localStorage.getItem("States")):[false,false,false]);
      // setNumPaginas(Number(localStorage.getItem("NumPaginas"))>0?Number(localStorage.getItem("NumPaginas")):0);
      // setNumIdiomas(Number(localStorage.getItem("NumIdiomas"))>0?Number(localStorage.getItem("NumIdiomas")):0);      
    },[]);


  useEffect(() => 
    {
      console.log("Effect function ran");
      setTotal( () => calculateTotal());
      localStorage.setItem("States",JSON.stringify(checkStates));
      localStorage.setItem("NumPaginas",numPaginas);
      localStorage.setItem("NumIdiomas",numIdiomas);
    },[checkStates,numPaginas,numIdiomas]);
      
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
              setNumPaginas = {setNumPaginas}
              setNumIdiomas = {setNumIdiomas}

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

    if(!checkStates[0])
    {
      setNumIdiomas(0);
      setNumPaginas(0);
    }

    iTotal += numPaginas*numIdiomas*30;
    return iTotal;
  };

  function toogleOneState(iIndex){
    setCheckStates( prevStates => {
      return prevStates.map( (state,index) => (index===iIndex ? !state : state));
    })
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Qué quieres hacer?</h1>
        <div className='App-form'>
          {checkBoxes}
        </div>
        <h2>Precio total: {total} €</h2>
      <button onClick={ClearLocalStorage}>LIMPIA STORAGE</button>
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
