import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Chip from "@mui/material-next/Chip";
import { Coindetail } from "../../Services/axios";
import { CircularProgress, TextField } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { infotoast, warningtoast } from "../../Services/toastify";
import '../CoinDetail/Buy.css'
const BuyModel = ({
  CoinDetail,
  handleModel,
  sethandleModel,
  currencyUid,
  currencySign,
  currencySymbol,
}) => {
  const [quantity, setquantity] = useState("1");
  const [loader, setloader] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "aliceblue",
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };
  const d = new Date();
  const day = d.toDateString();
  const time = d.toLocaleTimeString();
  const handleclose = () => {
    sethandleModel(false);
  };

  const TotalAmount = Number(quantity * CoinDetail.price).toLocaleString(2);
  const BuyCoin = async () => {
    setloader(false);
    if (TotalAmount < 1) {
      setloader(true);
      warningtoast(
        "Kindly be advised that we do not process transactions below this specified minimum value."
      );
    } else {
      const stripe = await loadStripe(
        "pk_test_51O6x3vExvpXnhG9PeBVQwjh3B0FfV9g886WRC95n5N3y1vBKmsD7NZWBlsE1yfYAdaWr5v7AA8Dc7UgefuM2IfTJ00MS1vq5IS"
      );
      const Transaction_Body = {
        Type: "buy",
        price: parseInt(CoinDetail.price).toFixed(2),
        quantity: Number(quantity),
        Date: [{ day }, { time }],
        fees: "89",
        cost: parseInt(quantity * CoinDetail.price).toFixed(2),
        Proceeds: "sd",
        PNL: "234",
        CoinId: CoinDetail.uuid,
        // currencydetail: currencyDetail,
        detail: CoinDetail,
        name: CoinDetail.name,
        CurenscySign: currencySign,
        CurrencyUid: currencyUid,
        currencySymbol: currencySymbol,
      };
      console.log(Transaction_Body.CurenscySign, "Transactio");
      if (Transaction_Body.CurenscySign === "$") {
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
          currencySymbol: currencySymbol,
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
      } else {
        infotoast(
          "We'd like to remind you that purchases can only be made using USD (United States Dollar). Regrettably, we are unable to accept any other currency. Your understanding is greatly appreciated."
        );
      }
    }
  };
  return (
    <div className="buy">
      {" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={handleModel}
        onClose={handleclose}
        // closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
      >
        <Box sx={style}    className="Buymodal">
          <div className="close" style={{ textAlign: "end" }}>
            {" "}
            <Button onClick={handleclose}>close</Button>
          </div>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="container d-flex p-3 mt-2"
            style={{ flexWrap: "wrap", justifyContent: "space-around" }}
          >
            <div className="col-7 d-flex gap-4" style={{ textAlign: "center" }}>
              {" "}
              <div className="d-flex gap-3" style={{ alignItems: "center" }}>
                <Chip
                  color="success"
                  disabled={false}
                  variant="filled"
                  label="Buy"
                />{" "}
                <h6>{CoinDetail.name}</h6>
              </div>
            </div>

            <div className="col-3" style={{ textAlign: "end" }}>
              <img src={CoinDetail.iconUrl} alt="" style={{ width: "30px" }} />
            </div>
          </Typography>
          <hr className="m-0" />
          <Typography id="transition-modal-description" sx={{ mt: 2, p: 3 }}>
            <div
              className="des d-flex"
              style={{ justifyContent: "space-around" }}
            >
              <div
                className="price col-5"
                style={{ borderRight: "1px solid " }}
              >
                <h6>
                  Today Price <small>( per coin )</small>
                </h6>
                <h5 className="mt-4">
                  {currencySign + Number(CoinDetail.price).toLocaleString(2)}
                </h5>
              </div>
              <div className="qut col-5">
                <h6>Select Quantity</h6>
                <TextField
                  required
                  fullWidth
                  type="number"
                  defaultValue={1}
                  placeholder=" min quantity 1 and max 100"
                  onChange={(e) => setquantity(e.target.value)}
                  inputProps={{ min: 1, max: 100 }}
                />
              </div>
            </div>
          </Typography>
          <hr />

          <Typography id="transition-modal1-description" sx={{ mt: 2 }}>
            <div
              className="price d-flex  container "
              style={{ flexDirection: "column" }}
            >
              <div
                className=" d-flex gap-3"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {" "}
                <h5 className="">Price:</h5>
                <h6 className=""> {`${currencySign} ${TotalAmount}`} </h6>
              </div>

              <div
                className=" d-flex gap-3"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5>Service fee : </h5>
                <h6>0%</h6>
              </div>
            </div>
          </Typography>
          <hr className="m-12" />
          <div className="total container">
            <h5>{`Total : ${currencySign} ${TotalAmount} `}</h5>
          </div>

          <div className="buy container mt-3 p-4" style={{ width: "65%" }}>
            <Button
              variant="contained"
              fullWidth
              className="p-3"
              style={{ textTransform: "capitalize" }}
              onClick={BuyCoin}
            >
              {loader === true ? (
                <>
                  {" "}
                  <h6> {`Buy ${CoinDetail.name}`}</h6>
                </>
              ) : (
                <>
                  {" "}
                  <CircularProgress />
                </>
              )}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyModel;
