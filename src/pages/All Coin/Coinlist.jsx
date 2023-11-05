import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import CoinlistTable from "../../components/CoinlistTable/CoinlistTable";
import Accordion from "../../components/Accordion/Accordion";
import "../../components/CoinlistTable/Cointable.css";
const Coinlist = () => {
  const [currencyUid, setcurrencyUid] = useState("yhjMzLPhuIDl");
  const [currencySign, setcurrencySign] = useState("$");

  return (
    <>
      <Navbar
        setcurrencyUid={setcurrencyUid}
        setcurrencySign={setcurrencySign}
      />
      <div
        className="coin_list "
        style={{ backgroundColor: "#0d1217", color: "aliceblue" }}
      >
        <div className="cointable m-auto container pt-5 ">
          <h3 className="pb-3"> Cryptocurrency prices and signals</h3>
          <CoinlistTable
            currencyUid={currencyUid}
            currencySign={currencySign}
          />

          <div className="acc mt-5" style={{ paddingBottom: "15%" }}>
            <Accordion />
          </div>
        </div>
      </div>
    </>
  );
};

export default Coinlist;
