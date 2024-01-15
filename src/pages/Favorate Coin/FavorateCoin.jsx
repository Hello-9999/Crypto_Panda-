import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bar from "../../components/Navbar/Navbar";
import { Button, Tag } from "antd";
import { BoxPlotFilled, StarFilled } from "@ant-design/icons";
import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import {
  Coinpricehistory,
  CryptoConverter,
  PaypalToken,
} from "../../Services/axios";
import { Container, TabContainer, Table } from "react-bootstrap";
import { removeitem } from "../../slice/AddtoFavorite";
import FavAdd from "./FavAdd";
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import TransactionModal from "../../components/AddTransaction Modal/TransactionModal";
import "../Favorate Coin/FavorateCoin.css";
const FavorateCoin = () => {
  const favData = useSelector((state) => state.Favorite_List);
  const [Open, setOpen] = useState(false);
  const [opentransactionModal, setopentransactionModal] = useState(false);

  const [CoinId, setCoinId] = useState([]);
  const [CoinDetail, setcoinDetail] = useState([]);
  const [ConverterCoin, setConverterCoin] = useState("yhjMzLPhuIDl");
  const [ConverterCoinPrice, setConverterCoinprice] = useState([]);
  const [action, setaction] = useState("No-action");
  const [Holdingamount, setHoldingamount] = useState(0);
  const [loader, setloader] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromFav = (e, id) => {
    e.preventDefault();
    dispatch(removeitem(id));

    // console.log("coin has benn remove from list");
  };

  const displayModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addtransaction = (e, coinId, coindetail) => {
    e.preventDefault();
    setopentransactionModal(true);
    setcoinDetail(coindetail);
    setCoinId(coinId);
  };

  const getCurrencyprice = async () => {
    const response = await CryptoConverter(CoinId, ConverterCoin);
    if (response.status === 200) {
      setConverterCoinprice(response.data.data.coin.price);
      console.log(response.data.status, "price");
      // debugger
      // setloader(false);
    } else if (response.data.status === 'fail') {
      alert("response error");
      // debugger;
      // const intervalID = setInterval(async () => {
      //   const response = await CryptoConverter(CoinId, ConverterCoin);
      //   if (response.data.status === "success") {
      //     setConverterCoinprice(response.data.data.coin.price);
      //     console.log(response.data.status, "price");
      //     clearInterval(intervalID);
      //   }
      // }, 2000);
    }

    // console.log(response.data.data.coin.price,'currency price')
  };
  useEffect(() => {
    // pricehistory();
    getCurrencyprice();
    // PaypalToken();
  }, [CoinId, ConverterCoin]);
  const viewTransaction = (e, coindata) => {
    e.preventDefault();
    console.log(coindata, "coindata");
    console.log(coindata.uuid, "coindata");
    // /:uuid/:CoinName/Transaction

    navigate(`/${coindata.uuid}/${coindata.name}/Transaction`);
  };
  const holdings = (hlvalue) => {};

  const coinpage = (e, value) => {
    e.preventDefault();
    console.log(value, "er");
    navigate(`/coindetail/${value}`);
  };

  // console.log(CoinDetail, "coindetail");
  // console.log(CoinId, "coinid");
  // console.log(ConverterCoin, "converterCOin ID");
  // console.log(ConverterCoinPrice, "convertercoinprice");

  const paywithEsewa = () => {
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: 100,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: 100,
      pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
      scd: "EPAYTEST",
      su: "http://merchant.com.np/page/esewa_payment_success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };

    function post(path, params) {
      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
    }
  };
  return (
    <>
      <div className="favorate">
        <Bar />
        <div className="favorat-body container mt-3">
          <FavAdd Open={Open} setOpen={setOpen} />
          <TransactionModal
            opentransactionModal={opentransactionModal}
            setopentransactionModal={setopentransactionModal}
            setConverterCoin={setConverterCoin}
            ConverterCoinPrice={ConverterCoinPrice}
            CoinDetail={CoinDetail}
            setaction={setaction}
            CoinId={CoinId}
          />
          <div
            className="fav-title d-flex justify-content-between mt-5 mb-3"
            style={{ flexWrap: "wrap", alignItems: "center" }}
          >
            <div>
              <h3>Your favorite coins</h3>
              <p>View your favorite coins, ranked by market cap.</p>
            </div>
            <div>
              <Button onClick={displayModal}>Add New Coin </Button>
            </div>
          </div>

         

          <div>
            <TableContainer
              sx={{ maxHeight: "800px" }}
              className="fav-table mt-5 mb-5"
            >
              {" "}
              <Table id="table">
                <TableHead sx={{ borderTop: "1px solid" }}>
                  <TableRow>
                    <TableCell>
                      <b> # </b>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <b>Coin</b>
                    </TableCell>
                  
                  </TableRow>
                </TableHead>

                <TableBody className="ok" id="okay">
                  {favData.favlist.map((data) => {
                    return (
                      <>
                        <TableRow hover={true}>
                          <TableCell>
                            <div
                              className="d-flex gap-2 flex-wrap text-allign-center"
                              style={{ alignItems: "flex-start" }}
                            >
                              <StarFilled
                                style={{
                                  color: "orange",
                                  fontSize: "1.3rem",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => removeFromFav(e, data.uuid)}
                              />
                              <h6>{data.rank}</h6>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="d-flex gap-2">
                              {" "}
                              <div>
                                {" "}
                                <img
                                  src={data.iconUrl}
                                  alt=""
                                  style={{ width: "25px" }}
                                />
                              </div>
                              <div
                                className="name d-flex gap-3 flex-wrap"
                                onClick={(e) => coinpage(e, data.uuid)}
                                style={{ cursor: "pointer" }}
                              >
                                <h6>{data.name}</h6>
                                <p>{data.symbol}</p>
                                {/* {console.log(data.uuid)} */}
                              </div>
                            </div>
                          </TableCell>
                          
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavorateCoin;
