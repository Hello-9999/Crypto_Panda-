// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Home from "./pages/Home/Coinlist";
import Coinlist from "./pages/All Coin/Coinlist";
import CoinDetail from "./pages/CoinDetail/CoinDetail";
import CryptoNews from "./components/CoinNews/CryptoNews";
// import Home from "./pages/HOme/Home";
// import Navbar from "./components/Navbar/Navbar";
import NewCoin from "./pages/New Coin/NewCoin";
import NewCoinDetails from "./pages/New Coin View Detail/NewCoinDetails";
import FavorateCoin from "./pages/Favorate Coin/FavorateCoin";
import ViewTransaction from "./pages/View Transaction/ViewTransaction";
import GainerLosser from "./pages/Gainers & looser/GainerLosser";
import Home1 from "./pages/Home1/Home1";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Pricealert from "./pages/PriceAlerat/Pricealert";
import PaymentSucess from "./pages/PAymentStatus/PaymentSucess";
import PaymentCancel from "./pages/PAymentStatus/PaymentCancel";
import { ToastContainer } from "react-toastify";
// import Footer from "./components/Footer/Footer";

// import ViewTransaction from "./pages/View Transaction/Transaction";
const id = import.meta.env.VITE_PAYPAL_CLIENTID;

function App() {
  return (
    // <PayPalScriptProvider options={{ clientId: `${id}` }}>
    <>
      <Routes>
        {/* <Route path="/all-coinlist" element={<Home />} /> */}
        <Route path="/" element={<Home1 />} />
        <Route path="/coinlist" element={<Coinlist />} />
        <Route path={`coindetail/:uid`} element={<CoinDetail />} />
        <Route path="/new-coin" element={<NewCoin />} />
        <Route path="/new-coin/:uid" element={<NewCoinDetails />} />
        <Route path={`/:name/News`} element={<CryptoNews />} />
        <Route path="/favorites" element={<FavorateCoin />} />
        <Route path="/crypto-gainers-losers" element={<GainerLosser />} />
        <Route path="/alert" element={<Pricealert />} />
        <Route
          path="/:uuid/:CoinName/Transaction"
          element={<ViewTransaction />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<PaymentSucess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
      </Routes>
      <ToastContainer />
    </>
    // </PayPalScriptProvider>
  );
}

export default App;
