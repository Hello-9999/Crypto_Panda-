import React, { useEffect, useState } from "react";
import { CoinListdata, Coindetail } from "../../Services/axios";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import StarBorderPurple500Outlined from "@mui/icons-material/StarBorderPurple500Outlined";
import millify from "millify";
import Tablechart from "../Table chart/Tablechart";
import TableChart from "../Table chart/Tablechart";
import "../CoinlistTable/Cointable.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoriteList, removeitem } from "../../slice/AddtoFavorite";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
// import { ffavoriteStore } from "../../slice/AddtoFavorite";
// import {favorite} from '../../slice/AddtoFavorite'
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import { Sparkline } from 'mui-plus';
import StarIcon from "@mui/icons-material/Star";
import {
  errortoast,
  successtoast,
  warningtoast,
} from "../../Services/toastify";
import { CircularProgress } from "@mui/material";

const CoinlistTable = ({ currencyUid, currencySign }) => {
  const favroatedata = useSelector((state) => state.Favorite_List);
  console.log(favroatedata.favlist, "dataasd");
  const [Coinlist, setCoinlist] = useState([]);
  const [Coindata, setCoindata] = useState([]);
  const [SevenCoindata, setsevenCoindata] = useState([]);
  const [CoinDetail, setCoindetail] = useState([]);
  const [Tablegraph, setTablegraph] = useState({});
  const [length, setlength] = useState([]);
  const [Favorite, setFavorite] = useState("");
  const [star, setstar] = useState(false);
  const [stats, setstats] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logindetails = useSelector((state) => state.Login_Details);

  const getCoinList = async () => {
    const response = await CoinListdata(
      `coins?referenceCurrencyUuid=${currencyUid}&timePeriod=1h`
    );
    setCoindata(response.data);
    setCoinlist(response.data.data.coins);
    // console.log(response.data.data.stats, "er");
    setstats(response.data.data.stats);

    // return response;
  };

  const test = async (uuid, e) => {
    e.preventDefault();
    navigate(`/coindetail/${uuid}`);
  };

  // const favitem = useSelector(state)
  console.log(Logindetails, "login");

  const addFavorite = (e, coindetail, index, already) => {
    e.preventDefault();
    if (Logindetails.isLoggedin) {
      setstar(!star);

      successtoast("Coin has been added in your portfolio ");
      dispatch(favoriteList(coindetail));
      if (already === true) {
        dispatch(removeitem(coindetail.uuid));
        // errortoast("Coin has been removed from your portfolio ");
      } else {
        console.log("first");
      }
    } else {
      // alert("first signin");
      warningtoast(
        "Oops! Looks like login is required to access this feature."
      );
    }
  };
  // console.log(Coindata.data.stats, "data");

  const checkfav = favroatedata.favlist.filter((check) => {
    // console.log(check.uuid)
    return check.uuid;
  });

  // console.log(checkfav, "fav");

  useEffect(() => {
    getCoinList();
    const intervalId = setInterval(() => {
      getCoinList();
    }, 10000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [currencyUid]);

  // console.log(star, "star");

  return (
    <>
      <div className="coinlisttable " style={{}}>
        <p style={{}}>
          {`  The global cryptocurrency market cap today is ${
            "$ " + Number(stats.totalMarketCap).toLocaleString()
          } ,
          change in the last 24 hours.`}
        </p>
        {Coindata.status === "success" ? (
          <>
            <Paper
              className="table-paper"
              sx={{ width: "100%", overflow: "hidden" }}
              elevation={9}
              variant="outlined"
              // square
            >
              <TableContainer sx={{ maxHeight: "800px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead style={{ border: "1px solid white" }}>
                    <TableRow>
                      <TableCell align="right" style={{ textAlign: "center" }}>
                        <h6>
                          <b>#</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <h6>
                          <b>Coin</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <h6>
                          <b>price</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <h6>
                          <b>24h</b>
                        </h6>{" "}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        <h6>
                          <b> 24h Volumne</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <h6>
                          <b>Market Cap</b>
                        </h6>{" "}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {" "}
                        <h6>
                          <b>24h</b>
                          <small> (in graph)</small>
                        </h6>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Coinlist.map((coin, index) => {
                      console.log(coin.sparkline, "uuid");
                      // const favstore = favroatedata.favlist.filter((check) => {
                      //   return check.uuid === coin.uuid;
                      // });
                      const favstore = favroatedata.favlist.some((check) => {
                        return check.uuid === coin.uuid;
                      });
                      // console.log(favstore,'store')

                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell key={index} className="">
                              <h6
                                style={{
                                  display: "flex",
                                  gap: "15%",
                                  alignItems: "center",
                                  marginBottom: "0",
                                  marginTop: "5%",
                                }}
                              >
                                {favstore === true ? (
                                  // const already =
                                  <>
                                    <StarIcon
                                      sx={{
                                        color: "orange",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) =>
                                        addFavorite(
                                          e,
                                          coin,
                                          index + 1,
                                          favstore
                                        )
                                      }
                                    />{" "}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <StarBorderPurple500Outlined
                                      sx={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        addFavorite(e, coin, index + 1)
                                      }
                                    />
                                  </>
                                )}
                                {/* {favroatedata.favlist.filter((check) => {
                                  check.uuid === coin.uuid,
                                    console.log(check, "check");
                                }).length === 0 ? (
                                  <>
                                    {" "}
                                    <StarBorderPurple500OutlinedIcon />{" "}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <StarIcon />
                                  </>
                                )} */}
                                {/* {const data =  favroatedata.favlist.filter((check)=>{ */}
                                {/* //   console.log(check)
                                // })} */}
                                {/* {favroatedata.favlist.filter((check) => {
                                  // console.log(check.uuid,'rtcheck')

                                  console.log(coin.uuid, "coing");
                                  return check.uuid !== coin.uuid ?<><StarBorderPurple500Outlined/></>:<><StarIcon /></> 

                                  
                                })} */}
                                {/* {checkfav === coin.uuid ? (
                                  <>
                                    <StarIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        addFavorite(e, coin, index + 1)
                                      }
                                    />{" "}
                                  </>
                                ) : (
                                  <><StarBorderPurple500OutlinedIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    addFavorite(e, coin, index + 1)
                                  }
                                /></>
                                )} */}{" "}
                                {index + 1}{" "}
                              </h6>
                            </TableCell>
                            <TableCell className="col-2">
                              <>
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
                                    onClick={(e) => test(coin.uuid, e)}
                                  >
                                    {" "}
                                    <img
                                      src={coin.iconUrl}
                                      alt=""
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                    <div
                                      className="coin_name mt-3 gap-2"
                                      style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        // flexDirection: "column",
                                      }}
                                    >
                                      {" "}
                                      <h6 className="coin-name">{coin.name}</h6>
                                      <div
                                        className="coin-symb"
                                        style={{ marginTop: "5%" }}
                                      >
                                        <small>{coin.symbol}</small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </TableCell>
                            <TableCell className="col-2">
                              <h6>
                                <span className="mx-1">{currencySign}</span>

                                {`${Number(coin.price).toLocaleString()}`}
                              </h6>
                            </TableCell>
                            <TableCell className="col-2">
                              {coin.change.match("-") ? (
                                <>
                                  {" "}
                                  {
                                    <span style={{ color: "#ff3a33" }}>
                                      {" "}
                                      {coin.change + "%"}{" "}
                                    </span>
                                  }
                                </>
                              ) : (
                                <>
                                  {
                                    <span style={{ color: "#32ca5b" }}>
                                      {" "}
                                      {"+" + coin.change + "%"}{" "}
                                    </span>
                                  }
                                </>
                              )}{" "}
                            </TableCell>
                            <TableCell className="col-2">
                              <h6>
                                <span className="mx-1 ">{currencySign}</span>

                                {`${parseFloat(
                                  coin["24hVolume"]
                                ).toLocaleString()}`}
                              </h6>
                            </TableCell>
                            <TableCell className="col-2">
                              <h6>
                                <span className="mx-1 ">{currencySign}</span>
                                {Number(coin.marketCap).toLocaleString()}
                              </h6>
                            </TableCell>

                            <TableCell className="col-2">
                              <div className="sparkline">
                                {" "}
                                {console.log("coin.sparkline", coin.sparkline)}
                                {coin.change.match("-") ? (
                                  <>
                                    <Stack
                                      // direction="row"
                                      sx={{ width: "100%" }}
                                    >
                                      <Box>
                                        {" "}
                                        <Sparklines
                                          data={coin.sparkline}
                                          limit={20}
                                          height={100}
                                          // colors={'#ff3a33'}
                                          // sx={{ color: "red" }}
                                          // style={{ marginTop: "1px" ,color:'red'}}
                                        >
                                          <SparklinesLine color="#ff3a33" />
                                          <SparklinesSpots />
                                        </Sparklines>
                                      </Box>
                                    </Stack>
                                  </>
                                ) : (
                                  <>
                                    <Sparklines
                                      data={coin.sparkline}
                                      limit={20}
                                      height={100}
                                      style={{ marginTop: "1px" }}
                                    >
                                      <SparklinesLine color="#32ca5b" />
                                      <SparklinesSpots />
                                    </Sparklines>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        ) : (
          <>
            {" "}
            <CircularProgress sx={{textAlign:"center"}} />{" "}
          </>
        )}
      </div>
    </>
  );
};

export default CoinlistTable;
