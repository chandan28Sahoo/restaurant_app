import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./resturent/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NewPage from "./resturent/newPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Resturent from "./resturent/resturent";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div >
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        {<div className="App">
          <Routes>
            <Route path="/" element={<Resturent />} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/checkout-success" element={<CheckoutSuccess />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/newpage" element={<NewPage/>}/> */}
          </Routes>
        </div>}
      </BrowserRouter>
    </div>
  );
}

export default App;
