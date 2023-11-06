import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Coindetail } from "../../Services/axios";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./viewTransaction.css";
import SellCoin from "./SellCoin";

const ViewTransaction = () => {
  const Data = useParams();
  const TransactionData = useSelector((state) => state.Transaction_List);
  const [openModal, setopenModal] = useState(false);
  const [Cryptodetail, setCryptodetail] = useState([]);
  const [Crypto, setCrypto] = useState([]);
  const [currencyUid, setcurrencyUid] = useState("yhjMzLPhuIDl");
  const [currencySign, setcurrencySign] = useState("$");
  // const [Totalcost, setTotalcost] = useState(0);
  const check = TransactionData.TransactionList.filter((x) => {
    // console.log(x.detail.price, "erer");

    return x.name === Data.CoinName;
  });
  const holdingcheck = check.map((checking) => {
    console.log(checking, "erer");
    if (checking.Type === "sell") {
    } else {
    }
    return checking;
  });
  // console.log(check.Date, "erwr");
  // console.log(check, "check");
  console.log(TransactionData.TransactionList, "data");
  const Holdingvalue = check.reduce((sum, item) => {
    console.log(parseFloat(item.price), "chesd;lajusg");

    return sum + parseFloat(item.price);
  }, 0);

  console.log(Holdingvalue, "holding value");

  const holdings = holdingcheck.reduce((sum, item) => {
    if (item.Type === "sell") {
      return sum - parseFloat(item.quantity);
    } else {
      return sum + parseFloat(item.quantity);
    }
  }, 0);

  // console.log(holdings, "hl");

  console.log(check.Type, "wer");

  console.log();

  console.log(holdingcheck, "cjelakjdg");
  if (check.Type === "Bu") {
  } else {
  }
  const Holding = holdingcheck.reduce((sum, item) => {
    console.log(sum, ";oausgd");
    console.log(item, "item");
    if (item.Type === "sell") {
      return sum - parseFloat(item.price);
    } else {
      return sum + parseFloat(item.price);
    }
  }, 0);

  console.log(parseInt(Holding), "Holding ");
  // console.log(check, "cheliug");
  // console.log(checking.detail, "checking");

  // console.log(totalcost, "c");

  const TotalCost = Holding * holdings;
  // console.log(typeof parseFloat(TotalCost), "Totalcost");
  const totalsell = check.filter((costt) => {
    // console.log(costt, "totalsell");
    return costt.Type === "sell";
  });
  // console.log(totalsell, "sell");

  const Totalsell = totalsell.reduce((sum, item) => {
    console.log(item, "erer");
    return sum + parseFloat(item.totalreceived);
  }, 0);
  console.log(typeof Number(TotalCost), "cost");
  console.log(Totalsell, "sell");
  console.log(parseFloat(TotalCost) - Totalsell, "type earaer");

  // const TotalCostammount = parseFloat(TotalCost.replace(/,/g, ""));
  const averageNet = TotalCost - Totalsell / Holding;
  console.log(Holding, "holdiadi");
  console.log(Totalsell, "selll");
  console.log(TotalCost, "total cost");
  // console.log(TotalCostammount, "totalcost asdad");

  console.log(averageNet, "average net");

  console.log(averageNet, "average Net");
  const buyfilter = TransactionData.TransactionList.filter((cs) => {
    // console.log(cs.Type, "sdw");
    return cs.Type === "buy";
  });
  // console.log(buyfilter, "filter");
  const buy = buyfilter.reduce((sum, item) => {
    // console.log(sum + parseFloat(item.price), "er");
    // console.log(sum + Number(item.quantity).toLocaleString(3), "werdf");
    // console.log(sum + item.price, "costasd");
  }, 0);

  const PnL = (PreviousAmt, CurrentAmount) => {
    // return CurrentAmount;
    const Difference = CurrentAmount - PreviousAmt;
    // return Difference;
    const PercentageChange = (Difference / Math.abs(PreviousAmt)) * 100;

    return PercentageChange;
  };

  const ProfilLossAmount = Holding - TotalCost;

  if (ProfilLossAmount > 0) {
    console.log("Profit: $" + ProfilLossAmount.toFixed(2));
  } else if (ProfilLossAmount < 0) {
    console.log("Loss: $" + Math.abs(ProfilLossAmount).toFixed(2));
  } else {
    console.log("No Profit, No Loss: $" + ProfilLossAmount.toFixed(2));
  }
  console.log((ProfilLossAmount * 100) / 100, "al;oisujdg");

  console.log(Holding, "Holding");
  console.log(TotalCost, "Totalcost");

  const getCoinDetail = async () => {
    const response = await Coindetail(Data.uuid, currencyUid);
    if (response.status === "success") {
      setCryptodetail(response);
    } else {
      console.error("API call failed with status:", response.status);
    }

    // console.log(response.dat);
  };

  const handleSell = (e) => {
    e.preventDefault();
    setopenModal(true);
  };

  useEffect(() => {
    getCoinDetail();
    const intervalId = setInterval(() => {
      getCoinDetail();
    }, 10000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [Data.uuid]);
  return (
    <>
      {Cryptodetail.status === "success" ? (
        <>
          {/* {console.log(Cryptodetail.data.coin)} */}
          <div className="container mt-5">
            <div className="breadcrumb container mt-5">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  className="pre"
                  to={`/coindetail/${Cryptodetail.data.coin.uuid}`}
                >
                  Go Back
                </Link>

                <Typography color="text.primary" className="now">
                  {" "}
                  {`${Cryptodetail.data.coin.name} `+ "Transaction Overview"}
                </Typography>
              </Breadcrumbs>
            </div>
            <div
              className="Cryptoname d-flex gap-2"
              style={{ alignItems: "center" }}
            >
              <img src={Cryptodetail.data.coin.iconUrl} alt="" width={"50px"} />
              <div
                className="name d-flex gap-2"
                id="name"
                style={{ alignItems: "center" }}
              >
                {" "}
                <h6>{Cryptodetail.data.coin.name}</h6>
                <b>{Cryptodetail.data.coin.symbol}</b>
              </div>
            </div>
            <div
              id="price"
              className=" mt-4 d-flex gap-2 container"
              style={{ alignItems: "center" }}
            >
              <h6>
                <span className="mx-2">{currencySign}</span>
                <b>{Number(Cryptodetail.data.coin.price).toLocaleString(3)}</b>

                {/* <b>{Cryptodetail.data.coin.change}</b> */}
              </h6>

              <h6>
                <b>
                  {" "}
                  {Cryptodetail.data.coin.change.match("-") ? (
                    <>
                      <span style={{ color: "red" }}>
                        {Cryptodetail.data.coin.change + " %"}
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      <span style={{ color: "green" }}>
                        {Cryptodetail.data.coin.change + " %"}
                      </span>
                    </>
                  )}{" "}
                </b>
              </h6>
            </div>

            <div
              className="holding_details d-flex gap-4  mt-4"
              style={{ flexWrap: "wrap" }}
            >
              <div
                className="holdingsValue p-3 "
                style={{ border: "1px solid black" }}
              >
                <h6>
                  {"$ " +
                    Number(Holding)
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h6>
                <p>Holdings Value</p>
              </div>

              <div
                className="holdings p-3"
                style={{ border: "1px solid black" }}
              >
                <h6>{holdings}</h6>
                <p>Holdings</p>
              </div>
              <div
                className="totalCost p-3"
                style={{ border: "1px solid black" }}
              >
                <h6>
                  {"$ " +
                    Number(TotalCost)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h6>
                {/* {console.log(totalcost, "cost")} */}
                <p>Total Cost</p>
              </div>
              <div
                className="AverageNetCost p-3"
                style={{ border: "1px solid black" }}
              >
                <h6>{"$ " + Number(averageNet).toLocaleString()}</h6>
                <p>Average Net Cost ? </p>
              </div>
              <div
                className="profitloss p-3"
                style={{ border: "1px solid black" }}
              >
                <h6>
                  {ProfilLossAmount > 0 ? (
                    <>{"+" + ` ${ProfilLossAmount.toFixed(2)}`}</>
                  ) : (
                    <> {` ${ProfilLossAmount.toFixed(2)}`}</>
                  )}
                </h6>
                <p>Profit / Loss</p>
                <h6>
                  {/* {profitLossAmount > 0 ? (
                    <>
                      <h6 style={{ color: "green" }}>
                        {"$ " + Number(profitLossAmount).toLocaleString()}
                      </h6>
                    </>
                  ) : (
                    <>
                      <h6 style={{ color: "red" }}>
                        {"$ " + Number(profitLossAmount).toLocaleString()}
                      </h6>
                    </>
                  )} */}
                </h6>
                {/* {profitLossAmount.match("-") ? (
                  <>
                    <span style={{ color: "red" }}>
                      {Cryptodetail.data.coin.change + " %"}
                    </span>{" "}
                  </>
                ) : (
                  <>
                    <span style={{ color: "green" }}>
                      {Cryptodetail.data.coin.change + " %"}
                    </span>
                  </>
                )}{" "} */}
                <p>
                  {/* {percentageIncrease > 0 ? ( */}
                  {/* <>
                    <p>
                      {" "}
                      Profit / Loss{" "}
                      <span style={{ color: "green" }}>
                        ({Number(percentageIncrease).toLocaleString() + `%`})
                      </span>
                    </p>
                  </> */}
                  {/* ) : (
                    <>
                      <p>
                        Profit / Loss{" "}
                        <span style={{ color: "red" }}>
                          ({Number(percentageIncrease).toLocaleString() + `%`})
                        </span>
                      </p>
                    </>
                  )} */}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h4>Transactions</h4>

              <div className="transactionTable mt-4">
                <div>
                  <div
                    className="earned d-flex gap-5 mb-4"
                    style={{ justifyContent: "space-between" }}
                  >
                    {/* <Box sx={{backgroundColor:"aliceblue" ,p:4}}></Box> */}
                    <TextField
                      sx={{ backgroundColor: "aliceblue" }}
                      defaultValue={`$ `}
                      disabled
                    />

                    <Button
                      onClick={handleSell}
                      sx={{ width: "20%", backgroundColor: "aliceblue" }}
                    >
                      sell
                    </Button>
                  </div>

                  <SellCoin
                    Cryptodetail={Cryptodetail}
                    setopenModal={setopenModal}
                    openModal={openModal}
                    holdings={holdings}
                  />
                </div>
                <TableContainer sx={{ backgroundColor: "aliceblue" }}>
                  {" "}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Type </b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Price</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Quantity</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Date</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Fees</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Cost</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>Proceeds</b>
                          </h5>
                        </TableCell>
                        <TableCell>
                          <h5>
                            {" "}
                            <b>PNL</b>
                          </h5>
                        </TableCell>

                        <TableCell>
                          <h5>
                            {" "}
                            <b>Action</b>
                          </h5>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {check.map((value) => {
                      console.log(value, "chek");
                      const PNl =
                        Number(Cryptodetail.data.coin.price).toLocaleString(3) *
                        value.quantity;
                      // console.log(
                      //   Number(Cryptodetail.data.coin.price).toLocaleString(3) *
                      //     value.quantity >
                      //     value.cost,
                      //   "check"
                      // );
                      // console.log(PNl,'pml')

                      return (
                        <>
                          {" "}
                          <TableBody>
                            <TableCell>
                              {" "}
                              {value.Type === "buy" ? (
                                <>
                                  {" "}
                                  <h6
                                    style={{
                                      color: "green",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {value.Type}
                                  </h6>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <h6
                                    style={{
                                      color: "red",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {value.Type}
                                  </h6>
                                </>
                              )}
                            </TableCell>

                            <TableCell>
                              {value.Type === "buy" ? (
                                <>
                                  {" "}
                                  {"$" +
                                    Number(value.detail.price).toLocaleString(
                                      3
                                    )}
                                </>
                              ) : (
                                <>
                                  {"$" +
                                    Number(value.totalreceived).toLocaleString(
                                      3
                                    )}
                                </>
                              )}
                            </TableCell>
                            <TableCell>
                              {" "}
                              {value.Type === "buy" ? (
                                <>
                                  {" "}
                                  <h6 style={{ color: "green" }}>
                                    {"+ " + value.quantity}
                                  </h6>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <h6 style={{ color: "red" }}>
                                    {value.quantity}
                                  </h6>
                                </>
                              )}
                            </TableCell>
                            <TableCell>
                              {" "}
                              <h6>{`${value.Date[0].day}, ${value.Date[1].time}`}</h6>
                            </TableCell>
                            <TableCell>
                              <h6>0.00</h6>
                            </TableCell>
                            <TableCell>
                              {value.Type === "buy" ? (
                                <>
                                  <h6>
                                    {" "}
                                    {"$" +
                                      Number(
                                        value.detail.price * value.quantity
                                      ).toLocaleString(3)}
                                  </h6>
                                </>
                              ) : (
                                <>
                                  <h6>-</h6>
                                </>
                              )}
                            </TableCell>

                            <TableCell>
                              {value.Type === "sell" ? (
                                <>
                                  <h6>
                                    {" "}
                                    {"$" +
                                      Number(
                                        value.totalreceived.toFixed(3) *
                                          value.quantity
                                      ).toLocaleString(3)}
                                  </h6>
                                </>
                              ) : (
                                <>
                                  <h6> - </h6>
                                </>
                              )}
                            </TableCell>

                            <TableCell>
                              {value.Type === "buy" ? (
                                <>
                                  {`${Number(
                                    PnL(
                                      value.detail.price,
                                      Cryptodetail.data.coin.price
                                    )
                                  ).toLocaleString()}%`}
                                </>
                              ) : (
                                <></>
                              )}
                            </TableCell>
                            {console.log(PnL, "pnl")}
                            {/* <TableCell>asdas</TableCell> */}
                            <TableCell></TableCell>
                          </TableBody>
                        </>
                      );
                    })}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <> Loader</>
      )}
    </>
  );
};

export default ViewTransaction;
