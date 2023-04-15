import React, { useState } from "react";
import "./style.css";

const UseState = () => {
  const initaialData = 10;
  const [data,setData] = useState(initaialData);
  // const buttonHandler = () =>{

  // }

  return (
    <>
      <div>
        <p>{data}</p>
        <div className="button2" onClick={() => setData(data+5)}>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div className="button2" onClick={() => { data > 0 ? setData(data-5) : setData(0)}}>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
      </div>
    </>
  );
};

export default UseState;
