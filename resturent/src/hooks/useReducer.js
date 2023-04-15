import React, { useReducer, useState } from "react";
import "./style.css";

const reducer = (state,action) =>{
    if(action.type === 'INCR'){
        state++;
    }
    if(state >0 && action.type === 'DECR'){
        state--;
    }
    return state;
}

const UseReducer = () => {
  const initaialData = 10;
  const [state, dispatch] = useReducer(reducer, initaialData);
//   const [data,setData] = useState(initaialData);
  // const buttonHandler = () =>{

  // }

  return (
    <>
      <div>
        <p>{state}</p>
        <div className="button2" onClick={() => dispatch({type: "INCR"})}>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div className="button2" onClick={() => dispatch({type: "DECR"})}>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
      </div>
    </>
  );
};

export default UseReducer;
