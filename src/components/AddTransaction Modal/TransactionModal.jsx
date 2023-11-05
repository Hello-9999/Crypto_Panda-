import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
// import { TextField } from "@mui/joy";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { TextField } from "@mui/material";
import CurrencyModal from "../Converte/CurrencyModal";
import { Button } from "antd";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Dropdown from "antd/es/dropdown/dropdown";
import axios from "axios";
import { useEffect } from "react";
import TransactionCurrencyModal from "./TransactionCurrencyModal";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Transaction, {
  TransactionDetail,
  Transaction_List,
} from "../../slice/Transaction";
import EsewaButton from "../Transaction/esewa";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButton from "../Transaction/paypal.jsx";
// import PaypalButton from "../Transaction/paypal";
// import ButtonPaypal from '../Transaction/paypal'
// import { TransactionItem } from "../../slice/AddtoFavorite";
// import paypalButton from "../Transaction/Paypal.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Coindetail } from "../../Services/axios";

const TransactionModal = ({
  opentransactionModal,
  setopentransactionModal,
  setConverterCoin,
  ConverterCoinPrice,
  CoinDetail,
  setaction,
  CoinId,
}) => {
  const Currency_Url = import.meta.env.VITE_CURRENCY;
  const ClientId = import.meta.env.VITE_PAYPAL_CLIENTID;
  const publishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const [CuurencyName, setCurrencyName] = useState("USD");
  const [CurrencyData, setCurrencyData] = useState([]);
  const [CurrencyList, setCurrencyList] = useState([]);
  const [CurrencyList1, setCurrencyList1] = useState([]);
  const [quantity, setquantity] = useState("1");
  const [CurrencySign, setCurrencySign] = useState("$");
  const [currencyDetail, setcurrencyDetail] = useState([]);

  const [OpenCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [CloseCurrencyModal, setCloseCurrencyModal] = useState(false);
  const [totalSpent, settotalSpent] = useState("");
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    width: "45%",
    bgcolor: "#333333",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const d = new Date();
  const day = d.toDateString();
  const time = d.toLocaleTimeString();

  const TotalAmount = Number(quantity * ConverterCoinPrice).toLocaleString(2);

  const getCoinList = async () => {
    try {
      const response = await axios.get(Currency_Url);
      setCurrencyData(response.data);
      setCurrencyList(response.data.data.currencies);
      setCurrencyList1(response.data.data.currencies);
    } catch (error) {}
  };

  const Currencylist = (e) => {
    e.preventDefault();
    setOpenCurrencyModal(true);
  };

  const createOrder = () => {};
  useEffect(() => {
    getCoinList();
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setopentransactionModal(false);
  };

  console.log(ConverterCoinPrice, "tye");
  const quantityvalue = (value) => {
    settotalSpent(ConverterCoinPrice * value);
    setquantity(value);
  };
  // const handleBuy = (e) => {
  //   e.preventDefault();
  //   const Buyvalue = {
  //     Type: "buy",
  //     price: CoinDetail.price,
  //     quantity: Number(quantity),
  //     Date: [{ day }, { time }],
  //     fees: "89",
  //     cost: Number(totalSpent),
  //     Proceeds: "sd",
  //     PNL: "234",
  //     // currencydetail: currencyDetail,
  //     detail: CoinDetail,
  //     name: CoinDetail.name,
  //   };

  //   // dispatch(TransactionItem(Buyvalue))
  //   dispatch(Transaction_List(Buyvalue));
  //   setopentransactionModal(false);
  //   setaction("Buy");
  //   // console.log(typeof(Buyvalue.quantity), "value");
  // };

  const handleSell = (e) => {
    e.preventDefault();
    const sellvalue = {
      Type: "sell",
      price: CoinDetail.price,
      quantity: Number(-quantity),
      Date: [{ day }, { time }],
      fees: "89",
      totalreceived: Number(totalSpent),
      Proceeds: "sd",
      PNL: "234",
      currencydetail: currencyDetail,
      detail: CoinDetail,
      name: CoinDetail.name,
    };

    dispatch(Transaction_List(sellvalue));
    setaction("sell");
    setopentransactionModal(false);
    // console.log(sellvalue);
  };
  // const handleradio = (e, value) => {
  //   setpaymentvalue(value);
  // };

  // const paymentBtn = (e) => {
  //   e.preventDefault();

  //   if (Number(quantity) === 0) {
  //     // console.log("quantity");
  //   } else if (paymentvalue === "") {
  //     // console.log("Enter Paymnet Method");
  //   } else if (paymentvalue === "esewa") {
  //     let path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  //     let params = {
  //       amt: Number(totalSpent).toFixed(2),
  //       psc: 0,
  //       pdc: 0,
  //       txAmt: 0,
  //       tAmt: Number(totalSpent).toFixed(2),
  //       pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
  //       scd: "EPAYTEST",
  //       su: `https://uat.esewa.com.np/api/epay/txn_status/v2?pid=ee2c3ca1-696b-4cc5-a6be-2c40d929d453&totalAmount=${Number(
  //         totalSpent
  //       ).toFixed(2)}&scd=EPAYTEST`,
  //       fu: `https://uat.esewa.com.np/api/epay/txn_status/v2?pid=ee2c3ca1-696b-4cc5-a6be-2c40d929d453&totalAmount=${Number(
  //         totalSpent
  //       ).toFixed(2)}&scd=EPAYTEST`,
  //     };
  //     // console.log(params.su, "tamt");
  //     // console.log(params.fu, "amt");
  //     var form = document.createElement("form");
  //     form.setAttribute("method", "POST");
  //     form.setAttribute("action", path);
  //     for (var key in params) {
  //       var hiddenField = document.createElement("input");
  //       hiddenField.setAttribute("type", "hidden");
  //       hiddenField.setAttribute("name", key);
  //       hiddenField.setAttribute("value", params[key]);
  //       form.appendChild(hiddenField);
  //     }
  //     document.body.appendChild(form);
  //     form.submit();

  //     const Buyvalue = {
  //       Type: "buy",
  //       price: CoinDetail.price,
  //       quantity: Number(quantity),
  //       Date: [{ day }, { time }],
  //       fees: "89",
  //       cost: Number(totalSpent),
  //       Proceeds: "sd",
  //       PNL: "234",
  //       // currencydetail: currencyDetail,
  //       detail: CoinDetail,
  //       name: CoinDetail.name,
  //     };

  //     dispatch(Transaction_List(Buyvalue));
  //   } else {
  //     // console.log("paypal");
  //   }
  // };

  const Payment = async () => {
    if (TotalAmount < 1) {
      alert("we Don");
    } else {
      const stripe = await loadStripe(
        "pk_test_51O6x3vExvpXnhG9PeBVQwjh3B0FfV9g886WRC95n5N3y1vBKmsD7NZWBlsE1yfYAdaWr5v7AA8Dc7UgefuM2IfTJ00MS1vq5IS"
      );
      const Transaction_Body = {
        Type: "buy",
        price: Number(ConverterCoinPrice).toLocaleString(2),
        quantity: Number(quantity),
        Date: [{ day }, { time }],
        fees: "89",
        cost: Number(quantity * ConverterCoinPrice).toLocaleString(2),
        Proceeds: "sd",
        PNL: "234",
        // currencydetail: currencyDetail,
        detail: CoinDetail,
        name: CoinDetail.name,
      };
      console.log(Transaction_Body, "Transactio");
      window.localStorage.setItem(
        "Transactiondata",
        JSON.stringify(Transaction_Body)
      );

      const body = {
        Product_Name: CoinDetail.name,
        Product_Price: Math.round(CoinDetail.price * 100),
        Product_Id: CoinDetail.uuid,
        Product_Img: CoinDetail.iconUrl,
        Product_Quanty: Number(quantity),
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(
          "http://localhost:7000/api/create-checkout-session",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        if (!response.redirected === false) {
          debugger;
          setloader(true);
        } else {
        }

        console.log(response, "response");

        const session = await response.json();

        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
        // if (result) {
        //   console.log(result);
        // } else {
        // }

        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const PaypalOption = {
    clientId: `${ClientId}`,
    currency: "USD",
    intent: "capture",
  };
  const payWithesewa = () => {
    console.log(Number(totalSpent).toLocaleString(3), ";ep");
    console.log(totalSpent);
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: totalSpent,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalSpent,
      pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
      scd: "EPAYTEST",
      su: "http://merchant.com.np/page/esewa_payment_success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  // console.log(CurrencyList, "sd");
  return (
    <>
      {/* <TransactionCurrencyModal /> */}{" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opentransactionModal}
        // open={true}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="mt-5 mb-5"
        // style={{height:"45vh"}}
      >
        {CurrencyData.status === "success" ? (
          // <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="d-flex "
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 style={{ color: "black" }}>
                {" "}
                Add Transaction to My Portfolio{" "}
              </h6>
              <IconButton onClick={handleClose}>
                <CloseOutlined />
              </IconButton>
            </Typography>

            <Typography
              id="transition-modal-description"
              className=""
              sx={{ mt: 2 }}
            >
              <Tabs aria-label="Basic " defaultValue={0}>
                <TabList className="mx-5">
                  <Tab sx={{ width: "40%" }}>Buy</Tab>
                  <Tab sx={{ width: "40%" }}>Sell</Tab>
                  {/* <Tab>Transfer</Tab> */}
                </TabList>

                <TabPanel
                  value={0}
                  className="container"
                  sx={{ backgroundColor: "" }}
                >
                  <div className="perCoin">
                    <div className="title">
                      <b>Price Per Coin</b>
                    </div>

                    <div className="form d-flex">
                      {/* <TextFieldG */}
                      {/* <Button onClick={Currencylist}>{CuurencyName} </Button> */}
                      <TextField
                        fullWidth
                        disabled
                        value={
                          "$ " + Number(ConverterCoinPrice).toLocaleString(2)
                        }
                      />
                    </div>
                    {/* <TransactionCurrencyModal
                      OpenCurrencyModal={OpenCurrencyModal}
                      setOpenCurrencyModal={setOpenCurrencyModal}
                      CurrencyList={CurrencyList}
                      setConverterCoin={setConverterCoin}
                      // setCurrencyList={setCurrencyList}
                      setCurrencyList1={setCurrencyList1}
                      CurrencyList1={CurrencyList1}
                      CloseCurrencyModal={CloseCurrencyModal}
                      setCurrencyName={setCurrencyName}
                      setcurrencyDetail={setcurrencyDetail}
                      setCurrencySign={setCurrencySign}
                      // inputValue={inputValue}
                      // setinputvalue={setinputvalue}
                    /> */}
                  </div>
                  <div className="qty mt-4">
                    <div className="qty_title">
                      <b>Quantity</b>
                    </div>

                    <div
                      className="qty_form d-flex "
                      style={{ alignItems: "center" }}
                    >
                      <TextField
                        required
                        fullWidth
                        type="number"
                        defaultValue={1}
                        placeholder=" min quantity 1 and max 100"
                        onChange={(e) => quantityvalue(e.target.value)}
                        inputProps={{ min: 1, max: 100 }}
                      />
                    </div>
                  </div>
                  <div className="spent mt-4">
                    <div className="spent_title">
                      <b>Total Spent</b>
                    </div>

                    {console.log(quantity, "ert")}
                    {console.log(
                      quantity,
                      "spent",
                      ConverterCoinPrice,
                      "coin price"
                    )}
                    {console.log(TotalAmount, "Total AMounr")}

                    <div className="spent_form">
                      <TextField
                        fullWidth
                        disabled
                        value={
                          `${CurrencySign} ` +
                          Number(quantity * ConverterCoinPrice).toLocaleString(
                            2
                          )
                          // Number(ConverterCoinPrice).toLocaleString(2)
                        }
                      ></TextField>
                    </div>
                  </div>

                  {/* <div className="paymentwuth mt-4">
                    <div className="esewa">
                      {" "}
                      <EsewaButton />{" "}
                    </div>
                    <div className="paypal">
                      <PaypalButton  CoinId ={CoinId} CoinQuantity ={quantity} CoinPrice ={totalSpent}/>
                    </div> */}
                  {/* <FormControl required>
                    <FormLabel>Payment Method</FormLabel>
                    <RadioGroup>
                      <FormControlLabel
                        value="esewa"
                        control={<Radio />}
                        label="Esewa"
                        onChange={(e) => handleradio(e, e.target.value)}
                      />
                      <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label="Paypal"
                        onChange={(e) => handleradio(e, e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl> */}
                  {/* </div> */}
                  {/* <div className="esewa">
                    {/* <EsewaButton /> */}
                  {/* <Button onClick={payWithesewa}> Esewa </Button> */}
                  {/* </div> */}

                  {/* <div className="paypal mt-4">
                    {/* <PayPalScriptProvider options={PaypalOption}> */}
                  {/* <PayPalButtons /> */}
                  {/* <PaypalButton
                    CoinDetail={CoinDetail}
                    totalSpent={totalSpent}
                  /> */}
                  {/* </PayPalScriptProvider> */}
                  {/* </div> */}

                  <div
                    className="stripepayment mt-4 "
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      style={{ width: "80%", margin: "auto" }}
                      onClick={Payment}
                    >
                      {" "}
                      {loader === true ? (
                        <>
                          {" "}
                          <CircularProgress />
                        </>
                      ) : (
                        <>Buy</>
                      )}
                    </Button>
                  </div>

                  {/* <div className="d-flex mt-4 gap-5 " style={{}}>
                    <Button
                      onClick={(e) => paymentBtn(e)}
                      style={{ width: "100%" }}
                    >
                      Buy
                    </Button>
                  </div> */}
                </TabPanel>

                <TabPanel value={1}>
                  <div className="sell">
                    <div className="sell_title">
                      <b>Price Per Coin</b>
                    </div>

                    <div className="sell_form d-flex">
                      <Button onClick={Currencylist}>{CuurencyName} </Button>

                      <TextField
                        fullWidth
                        disabled
                        value={ConverterCoinPrice}
                      />

                      <TransactionCurrencyModal
                        OpenCurrencyModal={OpenCurrencyModal}
                        setOpenCurrencyModal={setOpenCurrencyModal}
                        CurrencyList={CurrencyList}
                        setConverterCoin={setConverterCoin}
                        // setCurrencyList={setCurrencyList}
                        setCurrencyList1={setCurrencyList1}
                        CurrencyList1={CurrencyList1}
                        CloseCurrencyModal={CloseCurrencyModal}
                        setCurrencyName={setCurrencyName}
                        setcurrencyDetail={setcurrencyDetail}
                        // inputValue={inputValue}
                        // setinputvalue={setinputvalue}
                      />
                    </div>
                  </div>

                  <div className="sell-quantity">
                    <div className="sell-quantity_title">
                      <b>Quantity</b>
                    </div>

                    <div
                      className="sell_form d-flex "
                      style={{ alignItems: "center" }}
                    >
                      <TextField
                        required
                        fullWidth
                        type="number"
                        // defaultValue={1}
                        placeholder=" min quantity 1 and max 100"
                        onChange={(e) => quantityvalue(e.target.value)}
                        inputProps={{ min: 1, max: 100 }}
                      />
                      <span>
                        <b> sdd </b>
                      </span>
                    </div>
                  </div>

                  <div className="sell-received">
                    <div className="sell-received_title">
                      <b>Total Received</b>
                    </div>

                    <div className="sell_form">
                      <TextField
                        fullWidth
                        disabled
                        value={totalSpent}
                      ></TextField>
                    </div>
                  </div>

                  <div className="d-flex mt-4 gap-5 " style={{}}>
                    <Button>Cancel</Button>
                    <Button onClick={handleSell}>Sell</Button>
                  </div>
                </TabPanel>
                {/* <TabPanel value={2}>
                  <div className="sellCoin">
                    <div className="sell-title">
                      <b>Price Per Coin</b>
                    </div>

                    <div className="sell-form">
                      <TextField fullWidth></TextField>
                    </div>
                  </div>

                  <div className="sell-qty">
                    <div className="sell-qty-title">
                      <b>Price Per Coin</b>
                    </div>

                    <div className="sell-qty-form">
                      <TextField fullWidth></TextField>
                    </div>
                  </div>
                </TabPanel> */}
              </Tabs>
            </Typography>
          </Box>
        ) : (
          /* </Fade> */
          <> Loader</>
        )}
      </Modal>
      {/* */}
    </>
  );
};

export default TransactionModal;
