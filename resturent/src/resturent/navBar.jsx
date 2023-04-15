import React from "react";

const NavBar = ({ manuHandler, menuList }) => {
    console.log("menuList",menuList);
  return (
    <>
      <nav className="navbar">
        <div className="btn-group">
          {menuList.map((elem) => {
            return <button
              className="btn-group__item"
            //   key={key}
              onClick={() => manuHandler(elem)}
            >
                {elem}
            </button>;
          })}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
