import React, { useState, useEffect } from 'react';

import logo from '../images/atomo.png';
import sortAZ from '../images/sortAZ.png';
import sortDate from '../images/sortDate.png';
import sortRestart from '../images/sortRestart.png';


import Checkbox from '../components/Checkbox';
import Presupuesto from '../components/Presupuesto';
import Toolbar from '../components/Toolbar';

function Main() {
//USE STATES

  const data = [{id:0,txt:"Una página WEB",precio:500,idText:"web"},
                           {id:1,txt:"Una campaña SEO",precio:300,idText:"seo"},
                           {id:2,txt:"Una campaña de publicidad",precio:200,idText:"pub"}];

  const [total, setTotal] = useState(0);

  const presupuestoActual=JSON.parse(localStorage.getItem("Presupuesto"));
  const [datosPresupuesto,setDatosPresupuesto] = useState( presupuestoActual?{...presupuestoActual}:{
                                                                nombre:"",
                                                                cliente:"",
                                                                checkStates:[false,false,false],
                                                                numPaginas:0, 
                                                                numIdiomas:0,
                                                                total:0 });
  const listaActualPresupuestos=JSON.parse(localStorage.getItem("ListaPresupuestos"));
  const [listaPresupuestos,setListaPresupuestos] = useState(listaActualPresupuestos? [...listaActualPresupuestos]:
                                                                []);
  const [listaOriginalPresupuestos,setListaOriginalPresupuestos] =useState([]);

  
  // const [datosPresupuesto,setDatosPresupuesto] = useState( {
  //                                                             nombre:"",
  //                                                             cliente:"",
  //                                                             checkStates:[false,false,false],
  //                                                             numPaginas:0, 
  //                                                             numIdiomas:0,
  //                                                             total:0 });
  // //USE EFFECTS
  // useEffect(() => 
  //   { 

  //     const presupuestoActual=JSON.parse(localStorage.getItem("Presupuesto"));
  //     if(presupuestoActual)
  //     {
  //       console.log({presupuestoActual});
  //       console.log({datosPresupuesto});
  //       setDatosPresupuesto({...datosPresupuesto,nombre:presupuestoActual.nombre});
  //     }
  //   },[]);


  useEffect(() => 
    {
      setTotal( () => calculateTotal());
    },[datosPresupuesto.checkStates,datosPresupuesto.numPaginas,datosPresupuesto.numIdiomas]);
    
    useEffect( () =>
    {
      setDatosPresupuesto( (prevDatosPresupuesto) => 
          {
              return {
                  ...prevDatosPresupuesto,
                  total : total
              }
          }
      )
      localStorage.setItem("Presupuesto",JSON.stringify(datosPresupuesto));
    },[total]); 

    useEffect(() => 
    {
      localStorage.setItem("ListaPresupuestos",JSON.stringify(listaPresupuestos));
      
    },[listaPresupuestos]);

//COMPONENTES
    const checkBoxes = data.map( item =>
      {
        return (<Checkbox key={item.id}
          id= {item.id}
          idText={item.idText}
          handlerClick={() => toogleOneState(item.id)} 
          defaultChecked = {datosPresupuesto.checkStates[item.id]}
          presupuesto= {datosPresupuesto}
          txt = {item.txt}
          precio = {item.precio}
          setNumPaginas = {setNumPaginas}
          setNumIdiomas = {setNumIdiomas}
          />)
  }
);

const presupuestos = listaPresupuestos.map( item =>
  {
    return (<Presupuesto key={item.nombre}
      presupuesto = {item}
      />)
    }
    );
    
//LOGICA
  function clearLocalStorage()
  {
    localStorage.removeItem("Presupuesto");
    localStorage.removeItem("ListaPresupuestos");
  }

  function addPresupuesto()
  {
    if(datosPresupuesto.nombre && datosPresupuesto.total>0)
    {
      setListaPresupuestos((prev) =>
        {
          const index = prev.findIndex(object => object.nombre === datosPresupuesto.nombre);
          let currentDate = new Date();
          let sCurrentDate=currentDate.toLocaleString('es-ES'); 
          let sCurrentDate2=currentDate.toISOString();
          const datosPresupuestoFecha = {...datosPresupuesto,fecha:sCurrentDate,sortFecha:sCurrentDate2}
          if (index === -1)
            return [...prev, datosPresupuestoFecha];
          else{
            return  prev.map( (item,i)=>(i===index? datosPresupuestoFecha:item));
          }
        }
      );
    }
  }

  function calculateTotal()
  {
    let iTotal = 0;
    let iAux;
    for(iAux=0;iAux<data.length;iAux++)
      iTotal += datosPresupuesto.checkStates[iAux] ? data[iAux].precio : 0;

    if(!datosPresupuesto.checkStates[0])
    {
      setNumPaginas(0);
      setNumIdiomas(0);
    }

    iTotal += datosPresupuesto.numPaginas*datosPresupuesto.numIdiomas*30;
    return iTotal;
  };

  function handlerChange(event)
  {
    const {name,value,type,checked} = event.target;
    setDatosPresupuesto( (prevDatosPresupuesto) => 
        {
            return {
                ...prevDatosPresupuesto,
                [name] : type==="checkbox" ? checked : value
            }
        }
    )
  };
  
  function toogleOneState(iIndex){
    setDatosPresupuesto( prevDatosPresupuesto => {
      return {
        ...prevDatosPresupuesto,
        checkStates:prevDatosPresupuesto.checkStates.map( (state,index) => (index===iIndex ? !state : state))
    }});
  };

  function setNumPaginas(iValue)
  {
    setDatosPresupuesto((prevDatosPresupuesto) => 
    {
        return {
            ...prevDatosPresupuesto,
            numPaginas : iValue
        }
    });   
  }

  function setNumIdiomas(iValue)
  {
    setDatosPresupuesto((prevDatosPresupuesto) => 
    {
        return {
            ...prevDatosPresupuesto,
            numIdiomas : iValue
        }
    });   
  }


  function orderByName(){
    if(!listaOriginalPresupuestos.length || listaOriginalPresupuestos.length !== listaPresupuestos.length)
      setListaOriginalPresupuestos([...listaPresupuestos]);

    let sortByDateBudgets = listaPresupuestos.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
    setListaPresupuestos([...sortByDateBudgets]);
  }

  function orderByDate(){
    if(!listaOriginalPresupuestos.length || listaOriginalPresupuestos.length < listaPresupuestos.length)
      setListaOriginalPresupuestos([...listaPresupuestos]);

    let sortByDateBudgets = listaPresupuestos.sort(function (a, b) {
      if (a.sortFecha < b.sortFecha) {
        return 1;
      }
      if (a.sortFecha > b.sortFecha) {
        return -1;
      }
      return 0;
    });
    setListaPresupuestos([...sortByDateBudgets]);
  }

  function orderRestart(){
    if(!listaOriginalPresupuestos.length || listaOriginalPresupuestos.length < listaPresupuestos.length)
      setListaOriginalPresupuestos([...listaPresupuestos]);
    else
      setListaPresupuestos([...listaOriginalPresupuestos]);
  }

  function searchBudget(sSearchText){
    if(sSearchText!=="")
    {
      if(!listaOriginalPresupuestos.length || listaOriginalPresupuestos.length < listaPresupuestos.length)
        setListaOriginalPresupuestos([...listaPresupuestos]);

      let searchBudgets = listaPresupuestos.filter(item => {return (item.nombre.includes(sSearchText));});
      setListaPresupuestos([...searchBudgets]);
    }
  }


  return (
    <div className="App">
      <div className='Main-cols'> 
        <header className="App-header Main-left">
          <div className='Main-left-title'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>¿Qué quieres hacer?</h1>
          </div>
          <div className='Main-header'>
            <input className='Main-txtinput' type="text" id="nombre" name="nombre" value={datosPresupuesto.nombre} onChange={handlerChange} placeholder="Nombre del presupuesto"/><br/>
            <input className='Main-txtinput' type="text" id="cliente" name="cliente" value={datosPresupuesto.cliente} onChange={handlerChange} placeholder="Nombre del cliente"/><br/>
            {checkBoxes}
          </div>
          <h2>Precio total: {datosPresupuesto.total} €</h2>
        <button className="App-button-small" onClick={addPresupuesto}>AÑADIR PRESUPUESTO</button>
        
        <button onClick={clearLocalStorage}>LIMPIA STORAGE</button>
        </header>
        <div className='Main-right'>
          <Toolbar 
            orderByName={orderByName}
            orderByDate={orderByDate}
            orderRestart={orderRestart}
            searchBudget={searchBudget}
          />
          {presupuestos}
        </div>
      </div>
    </div>
  );
}

export default Main;