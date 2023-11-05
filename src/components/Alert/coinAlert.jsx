import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Alert/alerat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeletePricealert,
  handlePricealert,
} from "../../slice/Pricealert";
import { useParams } from "react-router-dom";
import { errortoast, successtoast } from "../../Services/toastify";
const Server = import.meta.env.VITE_LOCAL_SERVER;

const Coinalert = ({
  CoinDetails,
  CryptoCoinSymbol,
  CryptoCoinPrice,
  setAlertDrawer,
}) => {
  // const [Coinprice]
  const ChangeinNumber = Number(CryptoCoinPrice);
  const Coinprice = parseFloat(ChangeinNumber.toFixed(5));
  // console.log(Coinprice, "price");
  const [alertInput, setalertInput] = useState(Number(Coinprice));
  const [NotificationPerm, setNotificationPerm] = useState("");
  const pricealert = useSelector((state) => state.Price_Alert);
  const ShareLink = useParams();

  // // console.log(pricealert.AlertDetails, "aleerrt");
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    e.preventDefault();
    if (Number(alertInput === Coinprice)) {
      errortoast(
        "The target price is equal to current price . Try a diffrent Value !"
      );
    } else {
      // // console.log(Coinprice, " ralprice");
      // console.log(Number(alertInput), "aleart Price");

      const AlertDetails = {
        id: CoinDetails.data.coin.uuid,
        delid: Math.random(),
        realprice: Coinprice,
        alertprice: Number(alertInput),
        Coindetails: CoinDetails.data.coin,
        Coinsymbol: CryptoCoinSymbol,
      };

      // console.log(AlertDetails, "details");
      dispatch(handlePricealert(AlertDetails));

      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          setNotificationPerm(perm);
        } else {
        }
      });

      setAlertDrawer(false);
      successtoast("Coin hass been added in ypur price alert");

      // const data = Notification.requestPermission().then((perm) => {
      //   setNotificationPerm(perm);
      // });
    }
  };
  const Alert_Notificataion = () => {
    const Alert_Coin = pricealert.AlertDetails.filter((check) => {
      return check.id === ShareLink.uid;
    });

    // console.log(Coinprice, "pricertett");

    // console.log(Alert_Coin.id, "aalertcoi");

    // alert(NotificationPerm, "dadad");

    const second = Alert_Coin.map((check) => {
      // console.log(check.alertprice, " second checking");
      // console.log(Coinprice ,'uiowu')

      // Coinprice > check.alertprice
      // console.log(Coinprice, "coinprice", check.alertprice, "Price price");

      if (NotificationPerm === "granted") {
        if (Coinprice > check.alertprice) {
          successtoast("price has been  changed !! ");

          const alert_Notification = new Notification(
            `${CoinDetails.data.coin.name} ${CoinDetails.data.coin.symbol}  Price Alert 🚀`,
            {
              body: `${CoinDetails.data.coin.name} ${CoinDetails.data.coin.symbol} is now worth ${CryptoCoinSymbol}${check.alertprice}  📈💹`,
              vibrate: [200],
            }
          );

          alert_Notification;
          alert_Notification.onClick = function () {
            Window.location.href = `${Server}/coindetail/${CoinDetails.data.coin.uuid}`;
          };

          console.warn(Coinprice >= check.alertprice, "alert value");
          dispatch(handleDeletePricealert(ShareLink.uid));
        } else {
        }
      } else {
      }

      // return check.alertprice
    });
    // console.log(second, "ea[w0eirhg");
  };

  console.log(pricealert.AlertDetails.id, "alert");

  useEffect(() => {
    Alert_Notificataion();
  }, [NotificationPerm, Coinprice]);

  // const data = pricealert.AlertDetails.map((check) => {
  //   // console.log(check, "chek");

  // },
  // console.log(CoinDetails.data.coin.uuid, "alosudfg");
  const data = pricealert.AlertDetails.filter((check) => {
    // console.log(check.Coindetails.uuid, "okay");
  });

  // console.log(Number(alertInput), "alert input");
  // console.log(Coinprice, "coinprice");

  return (
    <div
      className="alert-box-body container col-7"
      id="er"
      style={{ backgroundColor: "#272727", overflow: "hi", padding: "20px" }}
    >
      <h5 className="mt-2 text-center title">Add Price alert</h5>
      <div
        className="d-flex mt-4 "
        style={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "#5351515c",
          padding: "15px",
          borderRadius: "15px",
          color: "#BEBEBE",
          alignItems: "baseline",
        }}
      >
        {" "}
        <div className="alert-coin-detail  ">
          <div className="d-flex gap-2" style={{ alignItems: "center" }}>
            {" "}
            <div>
              {" "}
              <img
                src={CoinDetails.data.coin.iconUrl}
                alt={CoinDetails.data.coin.name}
                style={{ width: "25px" }}
              />
            </div>
            <div
              className="alert-coin-name"
              style={{
                display: "flex",
                // alignItems: "center",
                // gap: "1%",
                flexDirection: "column-reverse",
              }}
            >
              <div className="alert-coinname" style={{ marginBottom: "0" }}>
                <span style={{ fontSize: "1.1rem" }}>
                  {" "}
                  {CoinDetails.data.coin.name}
                </span>
              </div>
              <div>
                <p style={{ marginBottom: "0" }} className="alert-coin-symb">
                  {" "}
                  {CoinDetails.data.coin.symbol}
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="alert-coin-price ">
          <p>{CryptoCoinSymbol + Number(Coinprice)}</p>
        </div>
      </div>

      {/* {console.log( typeof ( Number(CryptoCoinPrice)))} */}

      <div
        className="alert-coin-value container mt-4"
        style={{
          backgroundColor: "#5351515c",
          padding: "15px",
          borderRadius: "15px",
          color: "#BEBEBE",
        }}
      >
        <TextField
          type="number"
          sx={{ border: "none", width: "70%", color: "#BEBEBE" }}
          defaultValue={alertInput}
          onChange={(e) => setalertInput(e.target.value, "check")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <b className="gap-4" style={{ color: "#BEBEBE" }}>
                  {CryptoCoinSymbol}
                </b>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="alert-coin-footer mt-4" style={{ color: "aliceblue" }}>
        <p>
          {`You will receive a one-time notification when the price of 1  `}{" "}
          <b>{CoinDetails.data.coin.name}</b>{" "}
          {`hits ${alertInput} ${CryptoCoinSymbol}`}
        </p>
      </div>
      <div className="container mt-4">
        <Button sx={{ backgroundColor: "lime" }} onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Coinalert;
