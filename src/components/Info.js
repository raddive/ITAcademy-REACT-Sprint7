import React, { useState } from "react";
import infoicon from '../images/info.png';

const Popup = props => {
  return (
    <div className="popup-box" onClick={props.handleClose}>
      <div className="box">
        {props.content}
      </div>
    </div>
  );
};

export default function Info (props) { 

    const [bPopup,setbPopup] = useState(false);

    function togglePopup ()
    {
        setbPopup(prev => !prev);
    };


    return (
        <>
            <img src={infoicon} className="Info-icon" alt="logo" onClick={togglePopup} />
            {bPopup && <Popup 
                            content={props.info}
                            handleClose={togglePopup}/>}
        </>
    );
};