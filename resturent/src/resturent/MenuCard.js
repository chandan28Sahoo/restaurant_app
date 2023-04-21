import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";
const MenuCard = ({ menuData }) => {
  console.log("menuDatamenuData",menuData);
  // const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          const { id, name, category, image, description, price} = curElem;
          // curElem.cartTotalAmount = price 
          return (
            <>
              <div className="card-container" key={id}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{id}</span>
                    <span className="card-author subtle"> {category}</span>
                    <div className="title-price-Div">
                      <h2 className="card-title"> {name} </h2>
                      <h2>${price}</h2>
                    </div>

                    <span className="card-description subtle">
                      {description}
                    </span>
                    <div className="card-read">Read</div>
                  </div>
                  <img src={image} alt="images" className="card-media" />
                  <div className="buttonHandler">
                    <span className="card-tag  subtle">Order Now</span>
                    <button
                      className="card-tag  cart"
                      onClick={() => handleAddToCart(curElem)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
