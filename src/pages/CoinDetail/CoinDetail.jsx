import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Coindetail,
  Coinpricehistory,
  News,
  Priceperformance,
} from "../../Services/axios";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Tooltip, Space, Table, Card, Input } from "antd";
import { SearchOutlined, AlertOutlined, StarOutlined } from "@ant-design/icons";
import ReplyIcon from "@mui/icons-material/Reply";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Col, InputGroup, Nav, NavItem, Row } from "react-bootstrap";
import Market from "../../components/Market/Market";
import History from "../../components/CoindetailHistory/History";
import Togglebtn from "./Togglebtn";
import "./CoinDetail.css";
import Overview from "../../components/Overview/Overview";
// import { ButtonGroup, CircularProgress } from "@mui/material";
import CurrencyConverter from "../../components/Converte/CurrencyConverter";
import CryptoNews from "../../components/CoinNews/CryptoNews";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { CoinLatestNews } from "../../slice/data.slice";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Alert, Box, Drawer, Fade, Popper, TextField } from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Coinalert from "../../components/Alert/coinAlert";
// import Link from "@mui/material/Link";
import StarIcon from "@mui/icons-material/Star";
import { favoriteList, removeitem } from "../../slice/AddtoFavorite";
import Star from "@mui/icons-material/Star";
import BuyModel from "./BuyModel";
import { successtoast, warningtoast } from "../../Services/toastify";

const CoinDetail = () => {
  const id = useParams();
  const [CoinDetails, setCoinDetails] = useState({});
  const [contentdisplay, setcontentdisplay] = useState(true);
  const [timevalue, settimevalue] = useState("24h");
  const [timechart, settimechart] = useState({});
  const [toogllebtn, settooglebtn] = useState(false);
  const [marketcapdetail, setmarketcapdetail] = useState(false);
  const [loader, setloader] = useState(true);
  const [CryptoCoinPrice, setCryptoCoinPrice] = useState("");
  const [CryptoCoinSymbol, setCryptoCoinSymbol] = useState("$");
  const [PriceperforamnceValue, setPriceperforamnceValue] = useState("7d");
  const [Priceperformancedata, setPriceperformancedata] = useState([]);
  const [morebox, setmorebox] = useState(false);
  const [DetailNews, setDetailNews] = useState([]);
  const [CoinNews, setCoinNews] = useState([]);
  const [CoinName, setCoinName] = useState("");
  const [limitedNews, setLimitedNews] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharePopper, setsharePopper] = useState(close);
  const [Alertbox, setAlertbox] = useState(false);
  const [AlertDrawer, setAlertDrawer] = useState(false);
  const [ShareBox, setShareBox] = useState(false);
  const [currencyUid, setcurrencyUid] = useState("yhjMzLPhuIDl");
  const [currencySign, setcurrencySign] = useState("$");
  const [currencySymbol, setcurrencySymbol] = useState("usd");
  const [currencyName, setcurrencyName] = useState("$");
  const [handleModel, sethandleModel] = useState(false);

  const overviewContent = document.getElementById("overview");
  const marketContent = document.getElementById("market");
  const historyContent = document.getElementById("history");
  const arrowRef = useRef();
  const sharearrow = document.getElementById("#share-pooper");
  // console.log(sharearrow, "arrow");
  const ShareLink = useParams();
  // console.log(ShareLink, "share");
  const pricealert = useSelector((state) => state.Price_Alert);

  // console.log(pricealert.AlertDetails, "alert");
  const favcoin = useSelector((state) => state.Favorite_List);

  const dispatch = useDispatch();
  const Logindetails = useSelector((state) => state.Login_Details);

  const getCoinDetail = async () => {
    // <CircularProgress />
    const response = await Coindetail(id.uid, currencyUid);
    setCoinDetails(response);
    if (response.status === "success") {
      setCoinName(response.data.coin.name);
      setCryptoCoinPrice(response.data.coin.price);
    } else if (response.status === "fail") {
      const data = setInterval(() => {
        response;
      }, 5000);
      clearInterval(() => {
        clearInterval(data);
      }, 5000);
    }
    // <CircularProgress  style={{display:"none"}}/>
  };

  // console.log(CoinName, "ma,e");

  const getcoinhistory = async () => {
    // <CircularProgress />
    const response = await Coinpricehistory(
      id.uid,
      `history?timePeriod=${timevalue}&referenceCurrencyUuid=${currencyUid}`
    );

    if (response.data.status === "success") {
      settimechart(response.data);
    } else {
      const data = setInterval(() => {
        getcoinhistory();
      }, 5000);
      return () => clearInterval(data);
      // console.log(response.data.status, "time success ");
    }
    // <CircularProgress style={{display:"none"}} />
  };

  const Coinperfoirmance = async () => {
    // <CircularProgress />
    const response = await Priceperformance(
      id.uid,
      `history?timePeriod=${PriceperforamnceValue}&referenceCurrencyUuid=${currencyUid}`
    );
    // console.log(response, "perfor");
    if (response.data.status === "success") {
      setPriceperformancedata(response.data);
    } else {
      const data = setInterval(() => {
        response;

        //  clearInterval(response)
      }, 10000);
      return () => clearInterval(data);
    }

    // <CircularProgress style={{display:"none"}} />
  };
  const more = (e, classid) => {
    e.preventDefault();
    setmorebox(!morebox);

    const box = document.getElementById(classid);

    if (!morebox) {
      box.style.height = "auto";
    } else {
      box.style.height = "40vh";
    }
  };

  const getNews = async () => {
    if (CoinDetails.status === "success") {
      // console.log(CoinName, "coinnenam");

      const response = await News(CoinName);
      setLimitedNews(response.data.articles.slice(0, 5));
      setCoinNews(response.data);
    } else {
    }
  };

  const handleShare = (e) => {
    setAnchorEl(e.currentTarget);
    setsharePopper(!sharePopper);
  };
  const handleCopy = (e) => {
    e.preventDefault();
    const ShareaValue = document.getElementById("share-input");
    ShareaValue.select();
    navigator.clipboard.writeText(ShareaValue.value);
    alert("Link Coppiedd !");

    setsharePopper(close);
  };
  const handleAlert = (e) => {
    e.preventDefault();
    setAlertbox(!Alertbox);
    setAlertDrawer(true);
  };
  const handleAlertClose = (e) => {
    e.preventDefault();
    setAlertbox(false);
  };
  const handleremovefromcart = (e) => {
    e.preventDefault();

    dispatch(removeitem(id.uid));

    console.log("remove from cart");
  };
  const handleAddfromcart = (e, data) => {
    e.preventDefault();
    if (Logindetails.isLoggedin) {
      dispatch(favoriteList(data));
      successtoast("Coin has been added in your cart !!");
    } else {
      warningtoast(
        "Oops! Looks like login is required to access this feature."
      );
    }
  };

  const handlefavorate = (e) => {
    e.preventDefault();

    console.log(";aosudg");
    // console.log(favcoin.favlist ,'rt')
    // favcoin.favlist.map((check)=>{
    //   console.log(check)
    // })
  };

  console.log(favcoin, "favcoin");
  const Checkinstore = favcoin.favlist.filter((check) => {
    console.log(check, "chec");
    return check.uuid === id.uid;
  });

  console.log(Checkinstore, "store");

  useEffect(() => {
    getCoinDetail();

    const changevalue = setInterval(() => {
      getCoinDetail();
    }, 60000);
    clearTimeout(() => {
      clearInterval(changevalue);
    }, 60000);
  }, [id.uid, currencyUid, currencySign, currencySymbol]);
  useEffect(() => {
    Coinperfoirmance();
    // const changevalue = setInterval(() => {
    //   Coinperfoirmance();
    // }, 60000);

    // return () => clearInterval(changevalue);
  }, [PriceperforamnceValue, currencySign]);
  useEffect(() => {
    getcoinhistory();
    // const changevalue = setInterval(() => {
    //   getcoinhistory();
    // }, 60000);

    // return () => clearInterval(changevalue);
  }, [timevalue, currencyUid]);
  useEffect(() => {
    getNews();
  }, [CoinName]);

  const handlebuy = () => {
    sethandleModel(true);
  };

  return (
    <>
      <Navbar
        setcurrencyUid={setcurrencyUid}
        setcurrencySign={setcurrencySign}
        setcurrencyName={setcurrencyName}
        setcurrencySymbol={setcurrencySymbol}
      />
      {CoinDetails.status === "success" ? (
        <>
          {/* {console.log(CoinName, "namhe")} */}
          {/* {console.log(CoinDetails.data.coin.name, "name")} */}

          <div className="breadcrumb container mt-5">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                className="pre"
                to={"/coinlist"}
              >
                Cryptocurrencies
              </Link>

              <Typography color="text.primary" className="now">
                {" "}
                {CoinName + " Price"}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="coin-detail container">
            <div className="coin mt-4 d-flex mb-5">
              <div className="col-8">
                <div
                  className="rank"
                  style={{
                    backgroundColor: "#242d38",
                    color: "white",
                    padding: "5px",
                    width: "max-content",
                    borderRadius: "5px",
                  }}
                >
                  <h6 style={{ marginBottom: "0px", fontSize: "0.95rem" }}>
                    {"Rank " + "#" + CoinDetails.data.coin.rank}
                  </h6>
                </div>
                <div className="CoinDetail mt-3">
                  <div className="coin-nameDetail">
                    <div
                      className="name"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2%",
                      }}
                    >
                      <img
                        src={CoinDetails.data.coin.iconUrl}
                        alt={CoinDetails.data.coin.name}
                        style={{ width: "50px" }}
                      />

                      <h6>
                        <b style={{ fontSize: "1.5rem" }}>
                          {" "}
                          {CoinDetails.data.coin.name}
                        </b>
                      </h6>
                      <h6>
                        <span> {CoinDetails.data.coin.symbol}</span>
                      </h6>
                    </div>
                    <div
                      className="coinprice d-flex gap-2 mt-4"
                      style={{ alignItems: "center" }}
                    >
                      <h6 style={{ fontSize: "1.6rem" }} className="price">
                        {currencySign +
                          Number(CryptoCoinPrice).toLocaleString()}
                        {/* {console.log(CryptoCoinPrice, "cryptoprice")} */}
                      </h6>
                      <h6 style={{ fontSize: "1.5rem" }}>
                        {CoinDetails.data.coin.change.match("-") ? (
                          <>
                            <span style={{ color: "red" }}>
                              {CoinDetails.data.coin.change + " %"}
                            </span>{" "}
                          </>
                        ) : (
                          <>
                            <span style={{ color: "green" }}>
                              {CoinDetails.data.coin.change + " %"}
                            </span>
                          </>
                        )}
                      </h6>
                    </div>
                    <div className="btcprice mt-2">
                      <h6>{CoinDetails.data.coin.btcPrice + " BTC"}</h6>
                    </div>
                    <div className="favbtn mt-3 ">
                      <Space
                        direction="vertical"
                        className="d-flex  g-6"
                        style={{ flexWrap: "wrap " }}
                      >
                        <Space>
                          <Tooltip title="Share">
                            <Button
                              type="primary"
                              shape="square"
                              icon={<ReplyIcon />}
                              onClick={handleShare}
                            />

                            <Popper
                              open={sharePopper}
                              anchorEl={anchorEl}
                              placement="bottom"
                              disablePortal={false}
                              modifiers={[
                                {
                                  name: "flip",
                                  enabled: true,
                                  options: {
                                    altBoundary: false,
                                    rootBoundary: "viewport",
                                    padding: 8,
                                  },
                                },
                                {
                                  name: "preventOverflow",
                                  enabled: true,
                                  options: {
                                    altAxis: true,
                                    altBoundary: true,
                                    tether: true,
                                    rootBoundary: "document",
                                    padding: 8,
                                  },
                                },
                                // {
                                //   name: "arrow",
                                //   enabled: true,
                                //   options: {
                                //     element: arrowRef,
                                //   },
                                // },
                              ]}
                            >
                              <Box
                                sx={{
                                  border: 1,
                                  p: 1,
                                  // zIndex:99,
                                  color: "black",
                                  bgcolor: "background.paper",
                                }}
                              >
                                <h6 className="share-pooper-title">
                                  {" "}
                                  Copy Link
                                </h6>
                                <div
                                  className="d-flex gap-2"
                                  style={{ alignItems: "center" }}
                                >
                                  <TextField
                                    type="text"
                                    value={window.location.href}
                                    id="share-input"
                                  />
                                  <Button onClick={handleCopy}>
                                    <h6>Copy Link</h6>
                                  </Button>
                                </div>
                              </Box>
                            </Popper>
                          </Tooltip>

                          <Tooltip title="Alert" id="alert">
                            <Button
                              type="primary"
                              shape="square"
                              icon={<AlertOutlined />}
                              onClick={handleAlert}
                            />
                            {/* open={Alertbox} */}

                            <Drawer
                              // className="container"
                              id="ok"
                              variant="temporary"
                              ModalProps={{
                                keepMounted: false,
                              }}
                              anchor="top"
                              open={AlertDrawer}
                              onClose={handleAlertClose}
                            >
                              {" "}
                              <Coinalert
                                CoinDetails={CoinDetails}
                                CryptoCoinSymbol={currencySign}
                                CryptoCoinPrice={CryptoCoinPrice}
                                setAlertDrawer={setAlertDrawer}
                              />
                            </Drawer>
                          </Tooltip>

                          <Tooltip title="Add to Portfolio and track coin price">
                            {Checkinstore.length === 0 ? (
                              <>
                                <Button
                                  icon={
                                    <StarIcon
                                      sx={{ color: "" }}
                                      onClick={(e) =>
                                        handleAddfromcart(
                                          e,
                                          CoinDetails.data.coin
                                        )
                                      }
                                    />
                                  }
                                ></Button>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Button
                                  onClick={(e) => handleremovefromcart(e)}
                                  icon={<StarIcon sx={{ color: "orange" }} />}
                                ></Button>
                              </>
                            )}

                            {/* <Button
                              type="primary"
                              shape="square"
                              icon={favcoin.favlist.map((check) => {
                                // console.log(id.uid ,'soiy')

                                return (
                                  <>
                                    {" "}
                                    {check.uuid === id.uid ? (
                                      <>
                                        {" "}
                                        <StarIcon
                                          sx={{ color: "orange" }}
                                          onClick={(e) =>
                                            handleremovefromcart(e, check.uuid)
                                          }
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <StarOutlined
                                          onClick={(e) =>
                                            handleAddfromcart(e, check.uuid)
                                          }
                                        />{" "}
                                      </>
                                    )}
                                  </>
                                );
                              })}
                            /> */}
                          </Tooltip>
                        </Space>
                      </Space>
                      <div className="buy mt-4">
                        <Button style={{ width: "30%" }} onClick={handlebuy}>
                          {" "}
                          Buy{" "}
                        </Button>
                        <BuyModel
                          CoinDetail={CoinDetails.data.coin}
                          handleModel={handleModel}
                          sethandleModel={sethandleModel}
                          currencyUid={currencyUid}
                          currencySign={currencySign}
                          currencySymbol={currencySymbol}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="valuestatic mt-3 ">
                  <Row className="gap-4">
                    <Col
                      className="d-flex col-5"
                      style={{
                        borderBottom: "2px solid",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="">
                        {" "}
                        <span>Market Cap </span>
                      </p>{" "}
                      <p className="">
                        <span
                          className="mx-1"
                          style={{
                            color: "aliceblue",
                            fontWeight: "bolder",
                            fontSize: "1.2rem",
                          }}
                        >
                          {currencySign}
                        </span>
                        {Number(
                          CoinDetails.data.coin.marketCap
                        ).toLocaleString()}
                      </p>{" "}
                    </Col>
                    <Col
                      className="d-flex  col-5 "
                      style={{
                        borderBottom: "2px solid",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="">
                        <span> Fully diluted market cap </span>
                      </p>{" "}
                      <p className="">
                        <span
                          className="mx-1"
                          style={{
                            color: "aliceblue",
                            fontWeight: "bolder",
                            fontSize: "1.2rem",
                          }}
                        >
                          {currencySign}
                        </span>

                        {Number(
                          CoinDetails.data.coin.fullyDilutedMarketCap
                        ).toLocaleString()}
                      </p>{" "}
                    </Col>{" "}
                  </Row>

                  <Row className="gap-4 mt-2">
                    <Col
                      className="d-flex  col-5"
                      style={{
                        borderBottom: "2px solid",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        {" "}
                        <span>24h volume</span>
                      </p>{" "}
                      <p>
                        <span
                          className="mx-1"
                          style={{
                            color: "aliceblue",
                            fontWeight: "bolder",
                            fontSize: "1.2rem",
                          }}
                        >
                          {currencySign}
                        </span>

                        {Number(
                          CoinDetails.data.coin["24hVolume"]
                        ).toLocaleString()}
                      </p>{" "}
                    </Col>
                    <Col
                      className="d-flex  col-5"
                      style={{
                        borderBottom: "2px solid",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        {" "}
                        <span>Number of Market</span>
                      </p>{" "}
                      <p>
                        {Number(
                          CoinDetails.data.coin.numberOfMarkets
                        ).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="info col-4">
                <h4>info</h4>
                <div
                  className="info_table d-flex"
                  style={{ flexDirection: "column" }}
                >
                  {CoinDetails.data.coin.links.map((link) => {
                    return (
                      <>
                        <div
                          className="info-table"
                          style={{
                            display: "flex",
                            alignItems: "center ",
                            marginBottom: "2%",
                          }}
                        >
                          <tr
                            className="col-5"
                            style={{ textTransform: "capitalize" }}
                          >
                            <th>{link.type}</th>
                          </tr>

                          <tr className="col-4">
                            <td>
                              <Button href={link.url}>{link.name}</Button>
                            </td>
                          </tr>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr />

            {/* <div className="nav-link w-80 mt-5">
              <Nav className="d-flex gap-4">
                <div
                  className="link1 link"
                  style={{ cursor: "pointer" }}
                  onClick={overview}
                >
                  <h6>
                    <link rel="stylesheet" href="#overview" /> Overview
                  </h6>
                </div>
                <div
                  className="link1"
                  style={{ cursor: "pointer" }}
                  onClick={market}
                >
                  <h6>
                    {" "}
                    <link rel="stylesheet" href="#market" />
                    Rank History
                  </h6>
                </div>
                <div
                  className="link1"
                  style={{ cursor: "pointer" }}
                  onClick={history}
                >
                  <h6>
                    <link rel="stylesheet" href="#history" /> History Data
                  </h6>
                </div>
              </Nav>
            </div> */}

            <div
              className="d-flex gap-5 mt-5"
              id="nav-body"
              style={{ alignItems: "center" }}
            >
              <div id="overview" className="col-7">
                <div
                  className="priceaname d-flex gap-4 mt-3 "
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    // flexDirection: "column",
                  }}
                >
                  {" "}
                  <h3>
                    <b>
                      {" "}
                      {`${
                        CoinDetails.data.coin.name
                      } Price Chart ${`( ${CoinDetails.data.coin.symbol} ) `}`}{" "}
                    </b>
                  </h3>
                  <Togglebtn
                    settimevalue={settimevalue}
                    settooglebtn={settooglebtn}
                    Togglebtn={toogllebtn}
                    settimechart={settimechart}
                    getcoinhistory={getcoinhistory}
                    setloader={setloader}
                    timechart={timechart}
                  />
                </div>
                <br />
                <div className="mt-3">
                  {timechart.status === "success" ? (
                    <>
                      <Overview
                        timechart={timechart}
                        CryptoCoinSymbol={currencySign}
                      />{" "}
                    </>
                  ) : (
                    <>loader</>
                  )}
                  {/* */}
                </div>

                {/* {console.log(timechart.data, "er")} */}
              </div>

              <div className="bitconvertor col-5 mt-5">
                <CurrencyConverter
                  id={id.uid}
                  CoinDetails={CoinDetails}
                  setCryptoCoinPrice={setCryptoCoinPrice}
                  setCryptoCoinSymbol={setCryptoCoinSymbol}
                />
              </div>
            </div>
            <div className="d-flex gap-5 mt-5 desprice">
              <div className="des col-7">
                {" "}
                {/* {console.log(CoinDetails, "er")}{" "} */}
                <h4>{`What is ${CoinDetails.data.coin.name} ?`}</h4>
                <div className="summary">
                  <p>{CoinDetails.data.coin.description}</p>
                </div>
              </div>
              <div className="price col-4">
                {" "}
                <Card
                  className=" mt-4 price_per"
                  style={{ position: "relative" }}
                >
                  <div className="price-performance ">
                    <div
                      id="performance_box"
                      style={{
                        height: "50vh",
                        overflow: "auto",
                      }}
                    >
                      <div
                        className="performance-title"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3>Price Performance</h3>

                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <Select
                            defaultValue={PriceperforamnceValue}
                            onChange={(e) =>
                              setPriceperforamnceValue(e.target.value)
                            }
                          >
                            <MenuItem value={"1h"}>Per Minute</MenuItem>
                            <MenuItem value={"7d"}>Hourly</MenuItem>
                            <MenuItem value={"3m"}>Daily</MenuItem>
                            <MenuItem value={"30d"}>Weeekly</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <div className="performance_body">
                        <p>
                          {`This is the price performance of `}

                          {<b>{CoinDetails.data.coin.name}</b>}
                          {
                            <small>{` ( ${CoinDetails.data.coin.symbol} )`}</small>
                          }
                          {` . It shows the percentage gains and losses for
                  each time period.`}
                        </p>
                        {/* {console.log(Priceperformancedata ,'data')} */}

                        {Priceperformancedata.status === "success" ? (
                          <>
                            {Priceperformancedata.data.history.map((hisval) => {
                              // console.log(hisval,'asd')
                              const options = {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              };

                              const optionforHour = {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              };

                              return (
                                <>
                                  {PriceperforamnceValue.match("h") ? (
                                    <>
                                      <div className="priceperformance d-flex">
                                        <p className="col-6">
                                          {new Date(
                                            hisval.timestamp * 1000
                                          ).toLocaleString(
                                            "en-US",
                                            optionforHour
                                          )}
                                        </p>

                                        <p className="col-6 text-center">
                                          {Number(
                                            hisval.price
                                          ).toLocaleString()}
                                        </p>
                                        <hr />
                                      </div>{" "}
                                    </>
                                  ) : (
                                    <>
                                      <div className="priceperformance d-flex">
                                        <p className="col-7 ">
                                          {new Date(
                                            hisval.timestamp * 1000
                                          ).toLocaleDateString(
                                            "en-US",
                                            options
                                          )}
                                        </p>
                                        <p className="col-5 text-center">
                                          {`$ ${Number(
                                            hisval.price
                                          ).toLocaleString()}`}
                                        </p>
                                      </div>{" "}
                                    </>
                                  )}
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <>loader</>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 m-auto">
                    <Button
                      style={{ width: "90%" }}
                      onClick={(e) => more(e, "performance_box")}
                    >
                      {" "}
                      {morebox === true ? <>Show less</> : <> Show More</>}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            <div className="crypto_News mt-5">
              <h4> {`${CoinName} Latest News`}</h4>
              {/* {console.log(CoinNews,'mewssd')} */}
              {/* {console.log(CoinNews.data.status && CoinNews.data.status,'Newsdasf')} */}
              {CoinNews.status === "ok" ? (
                <>
                  <div className="d-flex flex-wrap gap-4">
                    {limitedNews.map((limited) => {
                      // console.log(limited, "limitedNews 123");
                      return (
                        <>
                          {" "}
                          <Card
                            className="mt-4 News"
                            hoverable="true"
                            cover={
                              <img
                                src={limited.urlToImage}
                                style={{ width: "100%", height: "200px" }}
                              />
                            }
                            style={{ width: "30%", cursor: "default" }}
                          >
                            <div className="date-author d-flex gap-2">
                              <Card.Meta
                                description={<b>{limited.author}</b>}
                              />
                              <Card.Meta
                                className="mb-2"
                                description={new Date(
                                  limited.publishedAt
                                ).toDateString()}
                              />
                            </div>

                            <div className="card_News_TItle">
                              <h6>{limited.title}</h6>
                            </div>
                            <Card.Meta
                              description={
                                limited.description.length === 0 >= 100 ? (
                                  <>{limited.description}</>
                                ) : (
                                  <>
                                    {" "}
                                    {limited.description.slice(0, 200)}{" "}
                                    <b>...</b>
                                  </>
                                )
                              }
                            />
                            <div className="news_footer mt-4">
                              <Link to={limited.url}>
                                <Button
                                  fullWidth
                                  style={{
                                    textTransform: "capitalize",
                                    textAlign: "left",
                                  }}
                                >
                                  Read More{" "}
                                  <NavigateNextIcon fontSize="small" />
                                </Button>
                              </Link>
                            </div>
                          </Card>
                        </>
                      );
                    })}
                  </div>

                  <Button>
                    {" "}
                    <Link to={`/${CoinDetails.data.coin.name}/News`}>
                      {" "}
                      Read More{" "}
                    </Link>
                  </Button>
                </>
              ) : (
                <>loader</>
              )}
            </div>
          </div>
        </>
      ) : (
        <>loader</>
      )}
    </>
  );
};

export default CoinDetail;
