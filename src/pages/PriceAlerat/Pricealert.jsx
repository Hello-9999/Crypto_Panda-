import React, { useEffect, useState } from "react";
// import { Navbar } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Button } from "@mui/material";
import { CoinListdata, Coindetail } from "../../Services/axios";
import { handleDeletePricealert } from "../../slice/Pricealert";
import EditAlert from "./EditAlert";
const Pricealert = () => {
  const alertdata = useSelector((state) => state.Price_Alert);
  const [alertCoin, setalertCoin] = useState([]);
  const [Coin, setCoin] = useState([]);
  const [Open, setOpen] = useState(false);
  const [Editdetails, setEditdetails] = useState([]);
  console.log(alertdata,'alert data');
  const dispatch = useDispatch();

  const getCoinList = async () => {
    const response = await CoinListdata("coins?timePeriod=1h");
    setalertCoin(response.data.data.coins);
    // console.log(response.data.data.coins,'reaonse')
    // setCoinlist(response.data.data.coins);
    // console.log(response.data.data.stats, "er");
    // setstats(response.data.data.stats);

    // return response;
  };

  const Check = alertdata.AlertDetails.map((coincheck) => {
    // console.log(coincheck.id, "check");
    const AlertPrice_coin = alertCoin.filter((check) => {
      // Check
      //   console.log(check ,'er')
      return check.uuid === coincheck.id;
    });

    // return [... , AlertPrice_coin];
    // return[setCoin(AlertPrice_coin)]
    return AlertPrice_coin;
  });
  console.log(Check, "try check");

  const handledelete = (e, data) => {
    e.preventDefault();

    console.log("oau");
    console.log(data.id, "data");
    dispatch(handleDeletePricealert(data));
  };

  const handleedit = (e, details) => {
    e.preventDefault();
    setOpen(true);
    setEditdetails(details);
    console.warn(details);
  };

  console.log(Editdetails, "details");
  //   const Details = Check.map((details) => {
  //     const second = details.map((c) => {
  //       console.log(c, "er");
  //       return;
  //     });
  //     // return [second]
  //   });

  //   console.log(Details, "loiugdaisudg");

  useEffect(() => {
    getCoinList();
  }, []);
  return (
    <>
      {" "}
      <div>
        <Navbar />
        <div className="pricealert container mt-4">
          <div className="title">
            <h5>Price Alert</h5>
          </div>
          <div className="title_body mt-5">
            {alertdata.AlertDetails.map((check) => {
              console.log(check, "check");
              return (
                <>
                  <div
                    className="box mt-3"
                    style={{
                      border: "1px solid ",
                      padding: "10px",
                      borderRadius: "25px",
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {" "}
                    <div
                      className=" price-name d-flex gap-3"
                      style={{ alignItems: "center" }}
                    >
                      {" "}
                      <div>
                        <img
                          src={check.Coindetails.iconUrl}
                          alt=""
                          style={{ width: "25px" }}
                        />
                      </div>
                      <div
                        className="price-nam d-flex"
                        style={{ flexDirection: "column" }}
                      >
                        <p style={{ marginBottom: "0" }}>
                          <b> {check.Coindetails.name} </b>
                        </p>

                        <p style={{ marginBottom: "0" }}>
                          {check.Coindetails.symbol}
                        </p>
                      </div>
                    </div>{" "}
                    <div className="input_value">
                      {" "}
                      <p>
                        {" "}
                        {`1 ${check.Coindetails.symbol} ≤ price alert in ${check.Coinsymbol}${check.alertprice}`}
                      </p>
                    </div>
                    <div className="input_value">
                      {" "}
                      <p>
                        {" "}
                        {` Current price ${check.Coinsymbol}  ${check.Coindetails.price}`}
                      </p>
                    </div>
                    <div className="button d-flex gap-3">
                      <div className="edit d-none">
                        <Button
                          onClick={(e) => handleedit(e, check)}
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                          }}
                        >
                          {" "}
                          <ModeEditRoundedIcon />
                        </Button>
                      </div>
                      <div className="delete">
                        <Button
                          sx={{
                            backgroundColor: "red",
                            borderRadius: "15px",
                          }}
                        >
                          {" "}
                          <DeleteRoundedIcon
                            onClick={(e) => handledelete(e, check)}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <EditAlert
              Open={Open}
              setOpen={setOpen}
              // details={check}
              Editdetails={Editdetails}
              data={alertdata.AlertDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricealert;
