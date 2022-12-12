import React, { useState, useEffect } from 'react';
import logo from '../images/atomo.png';


import Checkbox from '../components/Checkbox';
import Presupuesto from '../components/Presupuesto';

function Main2() {
//USE STATES

  const data = [{id:0,txt:"Una página WEB",precio:500,idText:"web"},
                           {id:1,txt:"Una campaña SEO",precio:300,idText:"seo"},
                           {id:2,txt:"Una campaña de publicidad",precio:200,idText:"pub"}];

  const [total, setTotal] = useState(0);
  const [checkStates,setCheckStates] = useState(localStorage.getItem("States")? JSON.parse(localStorage.getItem("States")): [false,false,false]);
  const [numPaginas,setNumPaginas] = useState(localStorage.getItem("NumPaginas")? Number(localStorage.getItem("NumPaginas")): 0);
  const [numIdiomas,setNumIdiomas] = useState(localStorage.getItem("NumIdiomas")? Number(localStorage.getItem("NumIdiomas")): 0);

  //USE EFFECTS
  //TODO NO FUNCIONA
  // const [checkStates,setCheckStates] = useState([true,false,false]);
  // const [numPaginas,setNumPaginas] = useState(0);
  // const [numIdiomas,setNumIdiomas] = useState(0);
  
  // useEffect(() => 
  //   { 
      //console.log("Primera vez");
      //console.log(localStorage.getItem("States"));
      // setCheckStates(localStorage.getItem("States")!==null ? JSON.parse(localStorage.getItem("States")):[false,false,false]);
      // setNumPaginas(Number(localStorage.getItem("NumPaginas"))>0?Number(localStorage.getItem("NumPaginas")):0);
      // setNumIdiomas(Number(localStorage.getItem("NumIdiomas"))>0?Number(localStorage.getItem("NumIdiomas")):0);      
    // },[]);


  useEffect(() => 
    {
      setTotal( () => calculateTotal());
    },[checkStates,numPaginas,numIdiomas]);
    
    useEffect( () =>
    {
        storeData();
    },[total]);


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
  function ClearLocalStorage()
  {
    localStorage.removeItem("States");
    localStorage.removeItem("NumPaginas");
    localStorage.removeItem("NumIdiomas");
    localStorage.removeItem("bWEB");
  }
  function storeData()
  {
    localStorage.setItem("States",JSON.stringify(checkStates));
    localStorage.setItem("NumPaginas",numPaginas);
    localStorage.setItem("NumIdiomas",numIdiomas);
    localStorage.setItem("Total",total);
  };

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
      <div className='Main-cols'> 
        <header className="App-header Main-left">
          <h1>¿Qué quieres hacer?</h1>
          <div className='App-form'>
            {checkBoxes}
          </div>
          <h2>Precio total: {total} €</h2>
        {/* <button onClick={ClearLocalStorage}>LIMPIA STORAGE</button> */}
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='Main-right'>
        </div>
      </div>
    </div>
  );
}

export default Main2;