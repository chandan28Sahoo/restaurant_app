import React from "react";
import "./filter.css";
const Filter = ({ manuHandler, menuList }) => {
  return (
    <>
      <div className="centerDiv">
        <div className="side_left">
          <div className="btn-group">
            {menuList.map((curElem) => {
              return (
                <button
                  className="btn-group__item"
                  onClick={() => manuHandler(curElem)}
                >
                  {curElem}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
