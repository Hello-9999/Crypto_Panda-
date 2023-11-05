import React, { useEffect, useState } from "react";
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
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Col, InputGroup, Nav, NavItem, Row } from "react-bootstrap";
// import Market from "../../components/Market/Market";
// import History from "../../components/CoindetailHistory/History";
// import Togglebtn from "./Togglebtn";
import "../CoinDetail/Detail.css";
import Overview from "../../components/Overview/Overview";
import { Box, ButtonGroup, Popper, TextField } from "@mui/material";
import CurrencyConverter from "../../components/Converte/CurrencyConverter";
// import CryptoNews from "../../components/CoinNews/CryptoNews";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useDispatch } from "react-redux";
// import { CoinLatestNews } from "../../slice/data.slice";
import Togglebtn from "../CoinDetail/Togglebtn";
import "../New Coin View Detail/Newcoin.css";
// import '../CoinDetail/Coindetail.css'

const NewNewCoinData = () => {
  const id = useParams();
  const [NewCoinData, setNewCoinData] = useState([]);
  //   const [CryptoCoinSymbol, setCryptoCoinSymbol] = useState("$ ");
  const [CoinDetails, setCoinDetails] = useState({});
  const [contentdisplay, setcontentdisplay] = useState(true);
  const [timevalue, settimevalue] = useState("24h");
  const [timechart, settimechart] = useState({});
  const [toogllebtn, settooglebtn] = useState(false);
  const [marketcapdetail, setmarketcapdetail] = useState(false);
  const [loader, setloader] = useState(true);
  const [CryptoCoinPrice, setCryptoCoinPrice] = useState("");
  const [CryptoCoinSymbol, setCryptoCoinSymbol] = useState("$ ");
  const [PriceperforamnceValue, setPriceperforamnceValue] = useState("7d");
  const [Priceperformancedata, setPriceperformancedata] = useState([]);
  const [morebox, setmorebox] = useState(false);
  const [DetailNews, setDetailNews] = useState([]);
  const [CoinNews, setCoinNews] = useState([]);
  const [CoinName, setCoinName] = useState("");
  const [limitedNews, setLimitedNews] = useState([]);
  const [currencyUid, setcurrencyUid] = useState("yhjMzLPhuIDl");
  const [currencySign, setcurrencySign] = useState("$");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharePopper, setsharePopper] = useState(close);

  const getnewCoinDetail = async () => {
    const response = await Coindetail(id.uid, currencyUid);
    console.log(response, "response rt");

    if (response.status === "success") {
      setCoinName(response.data.coin.name);
      setNewCoinData(response);
    } else {
      // const data = setInterval(() => {
      //   response;
      // }, 1000);
      // return () => clearInterval(data);
    }
  };

  const getcoinhistory = async () => {
    const response = await Coinpricehistory(
      id.uid,
      `history?timePeriod=${timevalue}`
    );
    console.log(response, "history");
    console.log(response.status, "er");

    if (response.status === 200) {
      settimechart(response.data);
    } else {
      const data = setInterval(() => {
        response;
        getcoinhistory();
      }, 1000);
      return () => clearInterval(data);
    }
    // console.log(response.data, "history");
  };
  const Coinperfoirmance = async () => {
    const response = await Priceperformance(
      id.uid,
      `history?timePeriod=${PriceperforamnceValue}`
    );
    console.log(response, "er");
    if (response.data.status === "success") {
      setPriceperformancedata(response.data);
    } else {
    }
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

  const getNews = async () => {
    console.log(NewCoinData.status, "detaila");
    if (NewCoinData.status === "success") {
      console.log(CoinName, "coinnenam");

      const response = await News("crypto");
      // debugger
      setLimitedNews(response.data.articles.slice(0, 5));
      // console.log(response, "news");
      setCoinNews(response.data);
    } else {
    }
  };
  useEffect(() => {
    getnewCoinDetail();
  }, [id.uid, currencyUid]);

  useEffect(() => {
    Coinperfoirmance();
  }, [PriceperforamnceValue, currencyUid]);
  useEffect(() => {
    getcoinhistory();
  }, [timevalue, currencyUid]);
  useEffect(() => {
    getNews();
  }, [CoinName]);
  return (
    <>
      {NewCoinData.status === "success" ? (
        <>
          {/* {console.log(NewCoinData.data.coin, "name")} */}
          <Navbar
            setcurrencyUid={setcurrencyUid}
            setcurrencySign={setcurrencySign}
          />
          <div className="newcoin-detail container">
            <div className="coin mt-4 d-flex gap-5">
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
                    {"Rank " + "#" + NewCoinData.data.coin.rank}
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
                        src={NewCoinData.data.coin.iconUrl}
                        alt={NewCoinData.data.coin.name}
                        style={{ width: "50px" }}
                      />

                      <h6>
                        <b style={{ fontSize: "1.5rem" }}>
                          {" "}
                          {NewCoinData.data.coin.name}
                        </b>
                      </h6>
                      <h6>
                        <span> {NewCoinData.data.coin.symbol}</span>
                      </h6>
                    </div>
                    <div
                      className="coinprice d-flex gap-2 mt-4"
                      style={{ alignItems: "center" }}
                    >
                      <h6 style={{ fontSize: "1.6rem" }}>
                        <span className="mx-1" style={{ color: "aliceblue" }}>
                          {currencySign}
                        </span>
                        {Number(CryptoCoinPrice).toLocaleString()}
                      </h6>
                      <h6 style={{ fontSize: "1.5rem" }}>
                        {NewCoinData.data.coin.change === null ? (
                          <></>
                        ) : (
                          <>
                            {NewCoinData.data.coin.change.match("-") ? (
                              <>
                                <span style={{ color: "red" }}>
                                  {NewCoinData.data.coin.change + " %"}
                                </span>{" "}
                              </>
                            ) : (
                              <>
                                <span style={{ color: "green" }}>
                                  {NewCoinData.data.coin.change + " %"}
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </h6>
                    </div>
                    <div className="btcprice mt-2">
                      <h6>{NewCoinData.data.coin.btcPrice + " BTC"}</h6>
                    </div>
                    <div className="favbtn mt-3 ">
                      <Space direction="vertical" className="d-flex">
                        <Space wrap>
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

                          <Tooltip title="Alert">
                            <Button
                              disabled
                              type="primary"
                              shape="square"
                              icon={<AlertOutlined />}
                            />
                          </Tooltip>

                          <Tooltip title="Add to Portfolio and track coin price">
                            <Button
                              disabled
                              type="primary"
                              shape="square"
                              icon={<StarOutlined />}
                            />
                          </Tooltip>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </div>

                <div className="valuestatic mt-3">
                  <Row className="gap-2">
                    <Col
                      className="d-flex gap-1 col-5"
                      style={{ borderBottom: "2px solid" }}
                    >
                      <h6 className="">Market Cap</h6>{" "}
                      <p className="">
                        {"$" +
                          Number(
                            NewCoinData.data.coin.marketCap
                          ).toLocaleString()}
                      </p>{" "}
                    </Col>
                    <Col
                      className="d-flex gap-5 col-5"
                      style={{ borderBottom: "2px solid" }}
                    >
                      <h6 className="">Fully diluted market cap</h6>{" "}
                      <p className="">
                        <span className="mx-1" style={{ color: "aliceblue" }}>
                          {currencySign}
                        </span>
                        {Number(
                          NewCoinData.data.coin.fullyDilutedMarketCap
                        ).toLocaleString()}
                      </p>{" "}
                    </Col>{" "}
                  </Row>

                  <Row className="gap-4">
                    <Col
                      className="d-flex  col-5"
                      style={{ borderBottom: "2px solid" }}
                    >
                      <h6>24h volume</h6>{" "}
                      <p>
                        <span className="mx-1" style={{ color: "aliceblue" }}>
                          {currencySign}
                        </span>
                        {Number(
                          NewCoinData.data.coin["24hVolume"]
                        ).toLocaleString()}
                      </p>{" "}
                    </Col>
                    <Col
                      className="d-flex col-5"
                      style={{ borderBottom: "2px solid" }}
                    >
                      <h6>Number of Market</h6>{" "}
                      <p>
                        {Number(
                          NewCoinData.data.coin.numberOfMarkets
                        ).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="info col-4 mt-3">
                <h4>info</h4>
                <div
                  // key={`'info-table'`}
                  className="info_table d-flex"
                  style={{ flexDirection: "column" }}
                >
                  {NewCoinData.data.coin.links.map((link) => {
                    // console.log(link, "link");
                    return (
                      <>
                        <div
                          key={link.name}
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

            <hr className="mt-5" />

            <div className="mt-5 d-flex gap-4" id="nav-body">
              <div className="col-7">
                <div id="overview" style={{ display: "block" }}>
                  <div
                    className="priceaname d-flex gap-4 mt-3 "
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <h6>
                      <b>
                        {" "}
                        {`${
                          NewCoinData.data.coin.name
                        } Price Chart ${`( ${NewCoinData.data.coin.symbol} ) `}`}{" "}
                      </b>
                    </h6>
                    <Togglebtn
                      settimevalue={settimevalue}
                      settooglebtn={settooglebtn}
                      Togglebtn={toogllebtn}
                      settimechart={settimechart}
                      setloader={setloader}
                      timechart={timechart}
                    />
                  </div>
                  {console.log(timechart, "timechart")}
                  <br />

                  <div>
                    {timechart.status === "success" ? (
                      <>
                        <Overview
                          timechart={timechart}
                          CryptoCoinSymbol={currencySign}
                        />{" "}
                        {console.log(timechart, "chart")}
                      </>
                    ) : (
                      <>loader</>
                    )}
                  </div>
                </div>
              </div>
              <div className="newcoinConverter col-4 m-auto">
                <CurrencyConverter
                  CoinDetails={NewCoinData}
                  setCryptoCoinPrice={setCryptoCoinPrice}
                  setCryptoCoinSymbol={setCryptoCoinSymbol}
                />
              </div>
            </div>
            {console.log(NewCoinData, "data new coin")}

            <Card
              className="col-6 mt-4 pricePerf"
              style={{ position: "relative" }}
            >
              <div className="price-performance ">
                <div
                  id="performance_box"
                  style={{
                    height: "40vh",
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
                    <h5>Price Performance</h5>

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

                      {<b>{NewCoinData.data.coin.name}</b>}
                      {<small>{` ( ${NewCoinData.data.coin.symbol} )`}</small>}
                      {` . It shows the percentage gains and losses for
                  each time period.`}
                    </p>

                    {Priceperformancedata.status === "success" ? (
                      <>
                        {Priceperformancedata.data.history.map((hisval) => {
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
                                      ).toLocaleString("en-US", optionforHour)}
                                    </p>

                                    <p className="col-6 text-center">
                                      {Number(hisval.price).toLocaleString()}
                                    </p>
                                  </div>{" "}
                                </>
                              ) : (
                                <>
                                  <div className="priceperformance d-flex">
                                    <p className="col-7 ">
                                      {new Date(
                                        hisval.timestamp * 1000
                                      ).toLocaleDateString("en-US", options)}
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

            <hr className="mt-5" />

            <div className="crypto_News mt-4">
              {/* <h6> {`${CoinName} Latest News`}</h6> */}
              <h3> {"You may be interested in these crypto articles"}</h3>
              {CoinNews.status === "ok" ? (
                <>
                  <div className="d-flex flex-wrap gap-4">
                    {/* {console.log(limitedNews, "limited ")} */}
                    {limitedNews.map((limited) => {
                      // console.log(limited, "limitedNews 123");
                      // debugger
                      return (
                        <>
                          {" "}
                          <Card
                            className="mt-4"
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
                    <Link to={`/${NewCoinData.data.coin.name}/News`}>
                      {" "}
                      Read More{" "}
                    </Link>
                  </Button>
                </>
              ) : (
                <>loayder</>
              )}
            </div>
          </div>
        </>
      ) : (
        <>re</>
      )}
    </>
  );
};

export default NewNewCoinData;
