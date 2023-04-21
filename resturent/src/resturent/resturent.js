import React, { useState } from "react";
import "./resturent.css";
import Menu from "./ManuApi";
import MenuCard from "./MenuCard";
// import NavBar from "./navBar";
// console.log("MenuCard",Menu);
import Filter from "./Filter";

const uniqueList = [
  ... new Set(
    Menu.map((elem) => {
      return elem.category;
    })
  ),
  "All"
]
const Resturent = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList,setMenuList] = useState(uniqueList);
  const manuHandler = (arg) =>{
    console.log("arggggggg",arg);
    if(arg === "All"){
      setMenuData(Menu);
    }else{
      let data = Menu.filter(word => {return word.category === arg})
      setMenuData(data)
    }
  }

  return (
    <>
      <Filter manuHandler={manuHandler} menuList={menuList}/>
      <MenuCard menuData={menuData} />
    </>
  );
};

export default Resturent;
