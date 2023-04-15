import React, { useState,useEffect } from "react";
import "./style.css";

const UseEffect = () => {
  const initaialData = 0;
  const [data,setData] = useState(initaialData);
    useEffect(() => {
        console.log("hi");
        document.title = `Chat(${data})`
    });

  return (
    <>
      <div>
        <p>{data}</p>
        <div className="button2" onClick={() => setData(data+1)}>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
      </div>
    </>
  );
};

export default UseEffect;
