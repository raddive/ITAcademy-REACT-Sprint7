import {React,useState,useEffect} from "react";
import Info from "./Info";

export default function Input (props) {
    const [value,setValue] = useState(props.localStorageValue);
    
    useEffect(() => {
        ChangeValue();
    },[value]);
    
    function ChangeValue()
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
        <div className="input">
            <button className="input--minus" onClick={Decrease}>–</button>
            <div className="input--count">
                <input 
                    type="text" 
                    inputMode="numeric" 
                    id={props.name} name={props.name}
                    value={value}
                    onChange={(event) => {setValue(Number(event.target.value));
                                          props.handlerChange(event);
                                         }}>
                    </input>
            </div>
            <button className="input--plus" onClick={Increase}>+</button>
            <Info 
                info = {props.info} />
        </div>
    )
};