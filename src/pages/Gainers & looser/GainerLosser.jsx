import React, { useEffect, useState } from "react";
import Bar from "../../components/Navbar/Navbar";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CoinListdata } from "../../Services/axios";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import { Container } from "react-bootstrap";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { favoriteList, removeitem } from "../../slice/AddtoFavorite";
import "../Gainers & looser/Gainer.css";
import { ContainerFilled } from "@ant-design/icons";
import StarIcon from "@mui/icons-material/Star";

const GainerLosser = () => {
  const favroatedata = useSelector((state) => state.Favorite_List);
  console.log(favroatedata.favlist, "data");
  const [Coindata, setCoindata] = useState([]);
  const [Gainer, setGainer] = useState([]);
  const [timevalue, settimevalue] = useState("24h");
  const [topvalue, settopvalue] = useState("10");
  const dispatch = useDispatch();
  const getdata = async () => {
    const response = await CoinListdata(
      `coins?timePeriod=${timevalue}&limit=${topvalue}`
    );

    console.log(response.data.data.coins, "response");
    setCoindata(response.data.data.coins);
  };

  console.log(Coindata, "er");
  const looser = Coindata.filter((losser) => {
    // console.log(gainer.change.match("-"), "ert");
    return losser.change.match("-");
  });

  const gainer = Coindata.filter((gainercoin, index) => {
    console.log(index, "iad");
    // console.log(gainer.change.match("-"), "ert");
    // console.log(gainercoin.change ,'gainer')

    return !gainercoin.change.match("-");
    // return
  });

  console.log(gainer, "gainer");

  console.log(looser, "looser");
  //   coins.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
  const GainerCoin = gainer.sort((a, b) => b.change - a.change);

  // console.log(GainerCoin,'gainercoin')

  const LooserCoin = looser.sort(
    (a, b) => a.change - b.change
    // console.log(b ,'b')
  );
  const selectValue = (e, value) => {
    // console.log(e.t)
    console.log(value, "selectasd");
    settimevalue(value);
  };
  const topvalueNumber = (e, value) => {
    // console.log(e.t)
    console.log(value, "selectasd");
    settopvalue(value);
    // settimevalue(value);
  };
  const addFavorite = (e, coindetail,value) => {
    e.preventDefault();
    console.log("clicked");
    console.log(coindetail, "fav");
    // dispatch(favoriteList(coindetail));
    console.log(value)
    if (value === true) {
      dispatch(removeitem(coindetail.uuid))
      
    } else {
      dispatch(favoriteList(coindetail))
      
    }
  };

  useEffect(() => {
    getdata();
  }, [timevalue, topvalue]);

  console.log(timevalue, "timevalue");
  return (
    <>
      <Bar />
      <Container>
        <div className="gainer-losser">
          <div className="mt-5  gainer-title">
            {" "}
            <h3>Top Crypto Gainers and Losers</h3>
            <p className="mt-3">
              Discover the largest gainers and losers across all major
              cryptocurrencies listed on f, based on price movements in the last
              24 hours.
            </p>
          </div>
          <div className="d-flex gap-5">
            <div className="d-select">
              <FormControl sx={{ width: "100%", border: "none" }}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                <Select
                  defaultValue={"24h"}
                  onChange={(e) => selectValue(e, e.target.value)}
                  sx={{ border: "none" }}
                  className="select"
                >
                  <MenuItem value={"1h"}>1 Hour</MenuItem>
                  <MenuItem value={"3h"}>3 Hour</MenuItem>
                  <MenuItem value={"12h"}>12 Hour</MenuItem>
                  <MenuItem value={"24h"}>24 Hour</MenuItem>
                  <MenuItem value={"7d"}>7 Day</MenuItem>
                  <MenuItem value={"30d"}>30 Day</MenuItem>
                  <MenuItem value={"3m"}>3 Month</MenuItem>
                  <MenuItem value={"1y"}>1 Year</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="d-select">
              <FormControl sx={{ width: "100%", border: "none" }}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                <Select
                  defaultValue={"10"}
                  onChange={(e) => topvalueNumber(e, e.target.value)}
                  sx={{ border: "none", textTransform: "capitalize" }}
                  className="select"
                >
                  <MenuItem value={"10"}> 10 View Limits</MenuItem>
                  <MenuItem value={"30"}> 30 View Limits</MenuItem>
                  <MenuItem value={"50"}> 50 View Limits</MenuItem>
                  <MenuItem value={"70"}> 70 View Limits</MenuItem>
                  <MenuItem value={"80"}> 80 View Limits</MenuItem>
                  <MenuItem value={"100"}> 100 View Limits</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div
            className="d-flex mt-5 gainer-losser-table container "
            style={{ flexWrap: "wrap", gap: "7rem" }}
          >
            <div className="gainer col-5">
              <h4>🚀 Top Gainers</h4>
              {GainerCoin.length === 0 ? (
                <>
                  {" "}
                  <Alert severity="warning" className="mt-5 nodata-msg">
                    <h6>📈 Looks like there are no gainer coins right now.</h6>
                  </Alert>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Table className="mt-5">
                    {/* <hr /> */}

                    <TableHead className="coin-head ">
                      <TableCell>
                        {" "}
                        <h6>
                          {" "}
                          <b>#</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell>
                        <h6>
                          {" "}
                          <b>Coins </b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell>
                        <h6>
                          <b>Price </b>
                        </h6>
                      </TableCell>
                      <TableCell>
                        <h6>
                          {" "}
                          <b>Volume </b>
                        </h6>
                      </TableCell>
                      <TableCell>
                        <h6>
                          <b>{timevalue} </b>
                        </h6>
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      <>
                        {GainerCoin.map((g) => {
                          const samedata = favroatedata.favlist.some(
                            (check) => {
                              return check.uuid === g.uuid;
                            }
                          );

                          return (
                            <>
                              {g.length === 0 ? (
                                <>
                                  {" "}
                                  <h5>there is no data</h5>{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <TableRow hover>
                                    <TableCell>
                                      <div
                                        className="d-flex gap-3"
                                        style={{ alignItems: "baseline" }}
                                      >
                                        {samedata === true ? (
                                          <>
                                            {" "}
                                            <StarIcon
                                              sx={{ color: "orange" }}

                                              onClick={(e)=>addFavorite(e,g,samedata)}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            {" "}
                                            <StarBorderPurple500OutlinedIcon onClick={(e)=>addFavorite(e,g)} />
                                          </>
                                        )}
                                        <h6 className="rank">{g.rank}</h6>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      <div
                                        className="name_detail"
                                        style={{
                                          display: "flex ",
                                          gap: "4%",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="name-data d-flex gap-3"
                                          style={{
                                            cursor: "pointer",
                                            alignItems: "center",
                                          }}
                                          // onClick={(e) => test(coin.uuid, e)}
                                        >
                                          {" "}
                                          <img
                                            src={g.iconUrl}
                                            alt=""
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                            }}
                                          />
                                          <div
                                            className="coin_name mt-3"
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            {" "}
                                            <h6 className="coin-name">
                                              {g.name}
                                            </h6>
                                            <div
                                              className="coin-symb"
                                              style={{ marginTop: "5%" }}
                                            >
                                              <small>{g.symbol}</small>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="coin-price">
                                      {" "}
                                      <h6>
                                        {` ${
                                          `$` + Number(g.price).toLocaleString()
                                        }`}

                                        {}
                                      </h6>
                                    </TableCell>
                                    <TableCell className="coin-price">
                                      {" "}
                                      <h6>
                                        {` ${
                                          `$` +
                                          Number(g.marketCap).toLocaleString()
                                        }`}

                                        {}
                                      </h6>
                                    </TableCell>
                                    <TableCell className="coin-price">
                                      <h6
                                        style={{ color: "#32ca5b" }}
                                        className="percentage"
                                      >
                                        {Number(g.change).toLocaleString() +
                                          "%"}
                                      </h6>
                                    </TableCell>
                                  </TableRow>{" "}
                                </>
                              )}
                            </>
                          );
                        })}
                      </>
                    </TableBody>
                  </Table>
                </>
              )}
            </div>

            <div className="looser col-5">
              <h4>🚨 Top Losers</h4>
              {LooserCoin.length === 0 ? (
                <>
                  {" "}
                  <Alert severity="warning" className="mt-5 nodata-msg">
                    {" "}
                    <h6>Looks like there are no loser coins right now 📉 .</h6>
                  </Alert>
                </>
              ) : (
                <>
                  {" "}
                  <Table className="mt-5">
                    <TableHead className="coin-head">
                      <TableCell>
                        {" "}
                        <h6>
                          {" "}
                          <b>#</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell>
                        <h6>
                          {" "}
                          <b>Coins </b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell>
                        <h6>
                          <b>Price </b>
                        </h6>
                      </TableCell>
                      <TableCell>
                        <h6>
                          {" "}
                          <b>Volume </b>
                        </h6>
                      </TableCell>
                      <TableCell>
                        <h6>
                          <b>{timevalue} </b>
                        </h6>
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      {LooserCoin.map((l) => {
                        const losesamedata = favroatedata.favlist.some(
                          (check) => {
                            return check.uuid === l.uuid;
                          }
                        );
                        return (
                          <>
                            {" "}
                            <TableRow>
                              <TableCell>
                                <div
                                  className="d-flex gap-3"
                                  style={{ alignItems: "baseline" }}
                                >
                                  {" "}
                                  {losesamedata === true ? (
                                    <>
                                      <StarIcon sx={{ color: "orange" }} onClick={(e)=>addFavorite(e,l,losesamedata)} />{" "}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <StarBorderPurple500OutlinedIcon  onClick={(e)=>addFavorite(e,l)}/>
                                    </>
                                  )}
                                  <div
                                    className="star"
                                    onClick={(e) => addFavorite(e, l)}
                                  >
                                    {" "}
                                  </div>
                                  <h6 className="rank">{l.rank}</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                {" "}
                                <div
                                  className="name_detail"
                                  style={{
                                    display: "flex ",
                                    gap: "4%",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className="name-data d-flex gap-3"
                                    style={{
                                      cursor: "pointer",
                                      alignItems: "center",
                                    }}
                                    // onClick={(e) => test(coin.uuid, e)}
                                  >
                                    {" "}
                                    <img
                                      src={l.iconUrl}
                                      alt=""
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                    <div
                                      className="coin_name mt-3"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {" "}
                                      <h6 className="coin-name">{l.name}</h6>
                                      <div
                                        className="coin-symb"
                                        style={{ marginTop: "5%" }}
                                      >
                                        <small>{l.symbol}</small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="coin-price">
                                {" "}
                                <h6>
                                  {` ${`$` + Number(l.price).toLocaleString()}`}

                                  {}
                                </h6>
                              </TableCell>
                              <TableCell className="coin-price">
                                {" "}
                                <h6>
                                  {` ${
                                    `$` + Number(l.marketCap).toLocaleString()
                                  }`}

                                  {}
                                </h6>
                              </TableCell>
                              <TableCell className="coin-price">
                                <h6
                                  style={{ color: "#ff3a33" }}
                                  className="percentage"
                                >
                                  {Number(l.change).toLocaleString() + "%"}
                                </h6>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default GainerLosser;
