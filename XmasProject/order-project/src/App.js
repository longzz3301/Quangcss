import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./view/Header/Header";
import Hero from "./view/Hero/Hero";
import Product from "./view/Product/Product";
import TextIntro from "./view/TextIntro/TextIntro";
import CustomerForm from "./view/CollectionForm/CollectionForm";
import PickUp from "./view/PickUp/PickUp";
import { useState, useEffect } from "react";
import MediumSnow from "./asset/mediumSnow.png";
import SmallSnow from "./asset/smallSnow.png";
import Home from "./view/Home/Home";
import Footer from "./view/Footer/Footer";
import "./theme.css";
import "./App.css";
import Impressum from "./view/Impressum/Impressum";
import Danten from "./view/Daten/Daten";
import Logo from "./asset/logo.png"
function App() {
  // const [quantity, setQuantity] = useState(0)
  // const [orderName, setOrderName] = useState("")
  // console.log(quantity, orderName);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutzerklaerung" element={<Danten />} />
        <Route
          path="/"
          element={
            <div className="bg-backGround flex flex-col relative w-full overflow-y-scroll">
              <span className="fusion-imageframe imageframe-none imageframe-1 hover-type-none pulsate top-0 right-0
                mobileSmall:top-[-60px] mobileSmall:right-[-60px]
              ">
                <img
                  src={Logo}
                  className="w-[280px] h-auto"
                />
              </span>
              {/* <Home /> */}
              <div className="illustration">
                {/* <div className="i-large"></div>
                <div className="i-medium"></div>
                <div className="i-small"></div> */}
              </div>
              <Header />
              <TextIntro />
              <Product />
              <CustomerForm />
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
