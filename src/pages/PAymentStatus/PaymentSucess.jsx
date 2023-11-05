import { Box, Button, CircularProgress } from "@mui/material";
// import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Transaction_List } from "../../slice/Transaction";
import NotificationSound from "../PAymentStatus/mixkit-software-interface-start-2574.wav";
import { useNavigate } from "react-router-dom";
import "./Sucess.css";

const PaymentSucess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Server = import.meta.env.VITE_LOCAL_SERVER;
  const data = window.localStorage.getItem("Transactiondata");
  const Data = JSON.parse(data);
  const [NotificationTime, setNotificationTime] = useState(false);
  const [CoinId, setCoinId] = useState(Data.CoinId);
  const [loader, setloader] = useState(true);

  const Success = (e) => {
    e.preventDefault();
    setloader(false);
    setNotificationTime(true);
    dispatch(Transaction_List(JSON.parse(data)));

    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        const SucessNotification = new Notification(
          "🎉 Coin Purchase Confirmed! Let's Shine ✨",
          {
            body: `Bravo! 🎉 You've acquired  $ ${Data.cost} of ${Data.name}. Your transaction is complete, and the coins are now securely stored in your wallet. 🛍️ Explore, 📊 track, and enjoy your investment journey. Got questions? We're just a message away! 📧`,
          }
        );
        const Notification_Id = document.getElementById("NotificationSound");

        if (Notification_Id === null) {
        } else {
          Notification_Id.play();
        }

        SucessNotification.onclick = function () {
          window.location.href = `${Server}/${Data.detail.uuid}/${Data.detail.name}/Transaction`;
        };

        return SucessNotification;
      } else {
      }
    });
    if (CoinId === "") {
      setCoinId(Data.CoinId);
    } else {
      // window.localStorage.removeItem("Transactiondata");
      console.log("okay");
    }
    setTimeout(() => {
      navigate(`/coindetail/${CoinId}`);
    }, 3000);
  };

  return (
    <div style={{height:"60vh"}}>
      <div className="sucess p-4  " style={{}}>
        <h6 className="pt-3 " style={{ textAlign: "center" }}>
          Payment sucess !!
        </h6>
        <p>
          {" "}
          "Woohoo! Your payment is a success! 🎉 Thanks for your swift action.
          You're all set!"
        </p>
        <div className="m-auto  sucess-btn" style={{ textAlign: "center" }}>
          {" "}
          {loader === false ? (
            <>
              {" "}
              <CircularProgress />
            </>
          ) : (
            <>
              {" "}
              <Button
                onClick={Success}
                style={{ textAlign: "center", width: "40%" }}
                className="m-auto"
                variant="contained"
              >
                {" "}
                Go Back
              </Button>
            </>
          )}{" "}
        </div>

        <audio id="NotificationSound">
          <source src={NotificationSound} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default PaymentSucess;
