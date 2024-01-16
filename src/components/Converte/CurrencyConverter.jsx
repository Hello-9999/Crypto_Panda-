import { Input } from "antd";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyModal from "./CurrencyModal";
import { BitCoinConverter, CryptoConverter } from "../../Services/axios";
import CryptoConvert from "crypto-convert";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";

// Curency converter ma id pass

const CurrencyConverter = ({
  CoinDetails,
  setCryptoCoinPrice,
  setCryptoCoinSymbol,
  id,
}) => {
  const [open, setopen] = useState(false);
  const [Coinsymbol, setCoinsymbol] = useState("USD");
  const [CoinSign, setCoinSign] = useState("$");
  const [Error, setError] = useState([]);
  // const id = useParams();

  const symbol = CoinDetails.data.coin.symbol;
  const [coinprice, setcoinprice] = useState("");
  const [coinvalue, setcoinvalue] = useState("");
  const [Currency, setcurency] = useState([]);
  const [Support, setSupport] = useState(true);
  const [CryptoCurrencyID, setCryptoCurrencyID] = useState("yhjMzLPhuIDl ");
  const [CryptoConverterprice, setCryptoConverterprice] = useState("");
  const [CryptoConverterdata, setCryptoConverterdata] = useState([]);
  const [CurencyIcon, setCurencyIcon] = useState([]);
  const openModal = (e) => {
    e.preventDefault();
    setopen(true);
  };

  const getcoinpricec = async () => {
    const response = await CryptoConverter();
    if (Support === true) {
      setcoinprice(response[`${Coinsymbol}`]);
      setCryptoCoinPrice(response[`${Coinsymbol}`]);
      setError(response);
    } else {
      setcoinprice("$");
    }

  };


  const Currency_Url = import.meta.env.VITE_CURRENCY;
  const getCurrency = async () => {
    try {
      const response = await axios.get(Currency_Url);

      setcurency(response.data);
      console.log(response, "currency");
    } catch (error) {
    }
  };

  const Convertcoin = async () => {
    const response = await CryptoConverter(id, CryptoCurrencyID);
    console.log(response, "re");

    setCryptoConverterprice(response.data.data.coin.price);
    setCryptoCoinPrice(response.data.data.coin.price);
    setCryptoConverterdata(response.data);

    // debugger
    console.log(response);
  };
  useEffect(() => {
    getCurrency();
  }, []);
  useEffect(() => {
    Convertcoin();
  }, [CryptoCurrencyID]);


  return (
    <>
      <div className="">
        {CryptoConverterdata.status === "success" ? (
          <>
            <Card sx={{ width: "80%", padding: "10px", margin: "auto" }} id="Converter_Box">
              <CardContent>
                <Typography variant="h5" component="div">
                  {CoinDetails.data.coin.name + "  Converter"}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="coinvalue d-flex mt-2"
                  sx={{
                    width: "85%",
                    alignItems: "center",
                    border: "1px solid black",
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      borderRight: "2px solid black",
                      padding: "20px",
                    }}
                  >
                    {" "}
                    <h6 style={{ marginBottom: "0px" }}>
                      {CoinDetails.data.coin.symbol}
                    </h6>
                  </span>
                  <div>
                    {" "}
                    <Input
                      type="number"
                      style={{
                        border: "none",
                        // padding: "2%",
                        borderRadius: "0",
                      }}
                      onChange={(e) => setcoinvalue(e.target.value)}
                    />
                  </div>
                </Typography>
                <Typography
                  variant="body2"
                  className="resultvalue d-flex mt-4 border"
                  style={{
                    alignItems: "center",
                    border: "1px solid black",
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    overflow: "hidden",
                    width: "90%",
                    height: "8vh",
                  }}
                >
                  <span
                    style={{
                      borderRight: "1px solid black",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                    onClick={openModal}
                  >
                    {" "}
                    <h6
                      style={{
                        marginBottom: "0px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {Coinsymbol}
                      <ArrowDropDownIcon />
                    </h6>
                  </span>

                  <Input
                    style={{
                      border: "none",
                      // padding: "5px",
                      borderRadius: "0",
                      height: "100%",
                    }}
                    value={Number(
                      coinvalue * CryptoConverterprice
                    ).toLocaleString()}
                  />
                  {/* {console.log(coinvalue * CryptoConverterprice)} */}
                </Typography>
                {/* {console.log(CryptoConverterdata, "check")} */}{" "}
                <div className="mt-3 converterresult">
                  <h5>
                    {`1 ${symbol} = `}
                    {CoinSign === null ? (
                      <>
                        <img src={CurencyIcon} alt="" width={"30px"} />
                        {Number(CryptoConverterprice).toLocaleString(2)}
                      </>
                    ) : CurencyIcon === null ? (
                      <>
                        {CoinSign +
                          Number(CryptoConverterprice).toLocaleString(2)}{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        {CoinSign +
                          Number(CryptoConverterprice).toLocaleString(2)}{" "}
                      </>
                    )}
                  </h5>
                  {/* <h5>{` 1 ${symbol} = 
                ${
                  `${
                    CoinSign === null ? (
                      <>
                        {" "}
                        <img src={CurencyDetail.iconUrl} alt="" />{" "}
                      </>
                    ) : (
                      <>{CoinSign}</>
                    )
                  } ` + Number(CryptoConverterprice).toLocaleString(2)
                }`}</h5> */}
                  {/* {console.log(coinprice ,'price')} */}
                </div>
                {/* {console.log(Error ,'coinprice')} */}
              </CardContent>
            </Card>
          </>
        ) : (
          <> <Card sx={{ width: "80%", padding: "10px", margin: "auto" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {CoinDetails.data.coin.name + "  Converter"}
            </Typography>

            <Typography className="mt-4">

            <Alert severity="error">Coin not found !!  </Alert>

            </Typography>
            
            {/* {console.log(CryptoConverterdata, "check")} */}{" "}
            <div className="mt-3 converterresult">
              <h5>
                {`1 ${symbol} = `}
                {CoinSign === null ? (
                  <>
                    <img src={CurencyIcon} alt="" width={"30px"} />
                    {Number(CryptoConverterprice).toLocaleString(2)}
                  </>
                ) : CurencyIcon === null ? (
                  <>
                    {CoinSign +
                      Number(CryptoConverterprice).toLocaleString(2)}{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    {CoinSign +
                      Number(CryptoConverterprice).toLocaleString(2)}{" "}
                  </>
                )}
              </h5>
              {/* <h5>{` 1 ${symbol} = 
            ${
              `${
                CoinSign === null ? (
                  <>
                    {" "}
                    <img src={CurencyDetail.iconUrl} alt="" />{" "}
                  </>
                ) : (
                  <>{CoinSign}</>
                )
              } ` + Number(CryptoConverterprice).toLocaleString(2)
            }`}</h5> */}
              {/* {console.log(coinprice ,'price')} */}
            </div>
            {/* {console.log(Error ,'coinprice')} */}
          </CardContent>
        </Card></>
        )}

        <CurrencyModal
          open={open}
          setopen={setopen}
          setCoinsymbol={setCoinsymbol}
          CurrencyData={Currency}
          setcurency={setcurency}
          setCoinSign={setCoinSign}
          setCryptoCoinSymbol={setCryptoCoinSymbol}
          setCryptoCurrencyID={setCryptoCurrencyID}
          CoinId={id}
          setCurencyIcon={setCurencyIcon}
        />

        {/* {console.log()} */}
      </div>
    </>
  );
};

export default CurrencyConverter;
