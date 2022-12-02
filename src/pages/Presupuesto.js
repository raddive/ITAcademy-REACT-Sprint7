import React, { useState, useEffect } from 'react';
import logo from '../images/atomo.png';


import Checkbox from '../components/Checkbox';

function Presupuesto() {
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
        <h1>¿Qué quieres hacer?</h1>
        <div className='App-form'>
          {checkBoxes}
        </div>
        <h2>Precio total: {total} €</h2>
      {/* <button onClick={ClearLocalStorage}>LIMPIA STORAGE</button> */}
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Presupuesto;