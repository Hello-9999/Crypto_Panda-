import { Button, TextField } from "@mui/material";
// import { Button, Form } from "antd";
import React, { useState } from "react";
import { warningtoast } from "../../Services/toastify";
import "./footer.css";

const Footer = () => {
  const [email, setemail] = useState("");
  const handleSubscribe = (e) => {
    // e.preventDefault();

    if (email === "") {
      warningtoast("Enter your email if you want latest news");
    } else {
      if (email.type === "email") {
        alert("asda");
      } else {
      }
    }
  };
  return (
    <div
      className="footer "
      style={{
        position: "absolute",
        // bottom: "0",
        width: "100%",
        padding: "25px",
        backgroundColor: "#0D1217",
        color: "#CCCCCC",
      }}
    >
      <div
        className="ourNews d-flex"
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <div className="newsletter col-5">
          <h4 style={{}}>Let's Explore Together</h4>

          <p>
            CryptoPanda may be a solo project, but it's fueled by a profound
            passion for cryptocurrencies and their potential. Join us on this
            exciting journey, and let's explore the world of digital assets
            together.
          </p>
        </div>

        <div
          className="subscribe d-flex gap-3"
          style={{ alignItems: "center" }}
        >
          {/* <TextField type="email" variant="container" /> */}
          <TextField
            type="email"
            variant="outlined"
            sx={{ backgroundColor: "aliceblue" }}
            onChange={(e) => setemail(e.target.value)}
            label="Enter your email"
          />
          <Button variant="contained" onClick={(e) => handleSubscribe()}>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
