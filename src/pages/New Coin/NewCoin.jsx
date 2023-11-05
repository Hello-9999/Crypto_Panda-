import React, { useEffect, useState } from "react";
import Bar from "../../components/Navbar/Navbar";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import { Link, useNavigate } from "react-router-dom";
import "../New Coin/Newcon.css";
const NewCoin = () => {
  const NewCoinUrl = import.meta.env.VITE_NEW_COIN;
  const [NewestCoin, setNewestCoin] = useState([]);
  const navigate = useNavigate();
  const getNewestCoin = async () => {
    try {
      const respose = await axios.get(NewCoinUrl);
      if (respose.status === 200) {
        setNewestCoin(respose.data);
      } else {
      }
    } catch (error) {
      console.log(error, "new coin error");
    }

    // return respose;
  };
  const Click = (e, uuid) => {
    e.preventDefault();

    navigate(`/new-Coin/${uuid}`);
  };

  useEffect(() => {
    getNewestCoin();

    const coin = setInterval(() => {
      getNewestCoin();
    }, 10000);

    return () => clearInterval(coin);
  }, []);

  return (
    <>
      {NewestCoin.status === "success" ? (
        <>
          {" "}
          <div className="new-coin ">
            <Bar />
            <div className="new-coin-header container ">
              <h2>New Cryptocurrencies</h2>
              <p>
                Discover new cryptocurrencies that were recently added . Among
                all cryptocurrencies listed in the last 30 days, you might be
                interested to know that{" "}
                <Link to={`/new-coin/${NewestCoin.data.bestCoins[0].uuid}`}>
                  {" "}
                  <b>{NewestCoin.data.bestCoins[0].name}</b>{" "}
                </Link>
                and{" "}
                <Link to={`/new-coin/${NewestCoin.data.bestCoins[1].uuid}`}>
                  <b>{NewestCoin.data.bestCoins[1].name}</b>{" "}
                </Link>
                is the best coin in last 24 hours. To view more details click
                which coin did you like .
              </p>

              <div className="new-coin-body  ">
                <>
                  {NewestCoin.data.newestCoins.map((newCoin) => {
                    console.log(newCoin, "newcoin");
                    return (
                      <>
                        {/* <Link
                          to={`/new-Coin/${newCoin.uuid}`}
                          style={{ textDecoration: "none", color: "black" }}
                        > */}
                        <div>
                          {" "}
                          <>
                            {" "}
                            <TableRow
                              hover={true}
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              <TableCell style={{ border: "none" }}>
                                <img
                                  src={newCoin.iconUrl}
                                  alt=""
                                  style={{ width: "50px" }}
                                />
                              </TableCell>
                              <TableCell
                                className="name"
                                style={{ border: "none" }}
                                onClick={(e) => Click(e, newCoin.uuid)}
                              >
                                <h6>{newCoin.name}</h6>{" "}
                              </TableCell>
                              <TableCell style={{ border: "none" }}>
                                <span>{newCoin.symbol}</span>{" "}
                              </TableCell>
                            </TableRow>
                          </>
                        </div>
                        {/* </Link> */}
                        <hr />
                      </>
                    );
                  })}
                  {NewestCoin.data.bestCoins.map((newCoin) => {
                    return (
                      <>
                        <div>
                          <TableRow
                            // hover={true}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell style={{ border: "none" }}>
                              <img
                                src={newCoin.iconUrl}
                                alt=""
                                style={{ width: "50px" }}
                              />
                            </TableCell>
                            <TableCell
                              className="name"
                              style={{ border: "none" }}
                              onClick={(e) => Click(e, newCoin.uuid)}
                            >
                              <h6>{newCoin.name}</h6>{" "}
                            </TableCell>
                            <TableCell style={{ border: "none" }}>
                              <span>{newCoin.symbol}</span>{" "}
                            </TableCell>
                          </TableRow>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </>
              </div>
            </div>
          </div>
        </>
      ) : (
        <> loader</>
      )}
    </>
  );
};

export default NewCoin;
