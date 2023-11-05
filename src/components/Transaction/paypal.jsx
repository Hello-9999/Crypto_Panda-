// import React from 'react'

import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
// import { CreateOrder } from "../../Services/axios";
import { useEffect, useState } from "react";
import { CreateOrder, PaypalToken } from "../../Services/axios";
// import paypal from "./paypal";
const paypalServer = import.meta.env.VITE_PAYPAL_SERVER;
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENTID;
const PAYPAL_CLIENT_SECRET = import.meta.env.VITE_PAYPAL_CLIENTSECRETKEY;

const PaypalButton = ({
  CoinDetail,
  totalSpent,
  CoinId,
  CoinQuantity,
  CoinPrice,
}) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    console.error(totalSpent ,'spent')
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: totalSpent,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);
  // const [Paypaldetails, setPaypaldetails] = useState([]);
  // const [token, settoken] = useState("");

  // console.log(token, "token");

  // const PaypalT = async () => {
  //   const response = await PaypalToken();
  //   console.log(response.data.access_token, "id");
  //   settoken(response.data.access_token);
  //   setPaypaldetails(response);
  //   return response;
  // };

  // function createOrder() {
  //   // return fetch(
  //   //   "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
  //   //   {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     // use the "body" param to optionally pass additional order information
  //   //     // like product ids and quantities
  //   //     body: JSON.stringify({
  //   //       cart: [
  //   //         {
  //   //           id: `12`,
  //   //           quantity: "2",
  //   //         },
  //   //       ],
  //   //     }),
  //   //   }
  //   // )
  //   //   .then((response) => response.json())
  //   //   .then((order) => order.id);
  // }

  // const handleApprove = (id) => {};

  // console.log(CoinDetail, "details");
  // console.log(totalSpent ,'spent')

  // const createorder = async () => {
  //   // const headers = {
  //   //   "Content-Type": "application/json",
  //   //   Authorization: `Bearer ${token}`,
  //   // };

  //   const response = await CreateOrder(token, CoinDetail, totalSpent);

  //   console.log(response);
  // };

  // const onapprove = () => {};
  // console.log(Paypaldetails.data);

  // const createOrder = async () => {
  //   const response = await CreateOrder(token, CoinDetail,totalSpent);

  //   console.log(response);
  // };

  useEffect(() => {
    // PaypalToken();
    // createorder();
    // createOrder();
    // PaypalT();
  }, []);

  return (
    <>
      {/* {Paypaldetails.status === 200 ? ( */}
      <>
        {" "}
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </>
      {/* ) : (
        <> loader</>
      )}{" "} */}
    </>
  );
};

export default PaypalButton;
