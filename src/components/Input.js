import {React,useState,useEffect} from "react";

export default function Input (props) {
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