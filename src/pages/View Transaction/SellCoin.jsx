import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, CircularProgress, TextField } from "@mui/material";
import "./viewTransaction.css";
import { useDispatch } from "react-redux";
import { Transaction_List } from "../../slice/Transaction";

const SellCoin = ({ Cryptodetail, openModal, setopenModal, holdings }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "aliceblue",
    color: "black",
    // border: "2px solid #000",
    // boxShadow: 24,
    p: 0,
  };
  const [quantity, setquantity] = useState(1);
  const [loader, setloader] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setopenModal(false);
  const Price = Number(Cryptodetail.data.coin.price);
  //   alert( parseFloat(Price ).toFixed(3) * 123);
  const SellingPrice = parseFloat(Price).toFixed(3) * Number(quantity);
  const Totalpercent = (0.5 / 100) * SellingPrice;
  const Total = SellingPrice + Totalpercent;
  const d = new Date();
  const day = d.toDateString();
  const time = d.toLocaleTimeString();
  const dispatch = useDispatch();
  const SellCoin = (e) => {
    e.preventDefault();
    // setloader()
    const Transaction_Body = {
      Type: "sell",
      price: parseInt(Cryptodetail.data.coin.price).toFixed(3),
      quantity: parseInt(quantity),
      Date: [{ day }, { time }],
      fees: Number(Totalpercent),
      cost: 0,
      totalreceived: SellingPrice,
      PNL: "-",
      CoinId: Cryptodetail.data.coin.uuid,
      //   SellingPrice:
      // currencydetail: currencyDetail,
      //   totalreceived :
      detail: Cryptodetail,

      name: Cryptodetail.data.coin.name,

      //   Type: "buy",
      //   price: Number(CoinDetail.price).toLocaleString(2),
      //   quantity: Number(quantity),
      //   Date: [{ day }, { time }],
      //   fees: "89",
      //   cost: Number(quantity * CoinDetail.price).toLocaleString(2),
      //   Proceeds: "sd",
      //   PNL: "234",
      //   CoinId: CoinDetail.uuid,
      //   // currencydetail: currencyDetail,
      //   detail: CoinDetail,
      //   name: CoinDetail.name,
      //   CurenscySign: currencySign,
      //   CurrencyUid: currencyUid,
      //   currencySymbol: currencySymbol,
    };
    dispatch(Transaction_List(Transaction_Body));
    setopenModal(false);
    console.log(Transaction_Body);
  };
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backgroundColor: "transparent" }}
    >
      <Box sx={style}>
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
                color="warning"
                disabled={false}
                variant="filled"
                label="Sell"
              />{" "}
              <h6>{Cryptodetail.data.coin.name}</h6>
            </div>
          </div>

          <div className="col-3" style={{ textAlign: "end" }}>
            <img src={"CoinDetail.iconUrl"} alt="" style={{ width: "30px" }} />
          </div>
        </Typography>
        <hr className="m-0" />
        <Typography id="transition-modal-description" sx={{ mt: 2, p: 3 }}>
          <div
            className="des d-flex"
            style={{ justifyContent: "space-around" }}
          >
            <div className="price col-5" style={{ borderRight: "1px solid " }}>
              <h6>
                Today Price <small>( per coin )</small>
              </h6>
              <h5 className="mt-4">
                {"$ " + Number(Cryptodetail.data.coin.price).toLocaleString(3)}
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
                inputProps={{ min: 1, max: `${holdings}` }}
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
              <h5 className="">Received :</h5>
              <h6 className=""> {"$ " + ` ${SellingPrice}`} </h6>
            </div>

            <div
              className=" d-flex gap-3"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5>Service fee : </h5>
              <h6>0.5%</h6>
            </div>
          </div>
        </Typography>
        <hr className="m-12" />
        <div className="total container">
          <h5>{`Total : $ ${Number(Total).toLocaleString(3)} `}</h5>
        </div>

        <div className="buy container mt-3 p-4" style={{ width: "65%" }}>
          <Button
            variant="contained"
            fullWidth
            className="p-3"
            style={{ textTransform: "capitalize" }}
            onClick={SellCoin}
          >
            {loader === true ? (
              <>
                {" "}
                <h6> Sell</h6>
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
  );
};

export default SellCoin;
