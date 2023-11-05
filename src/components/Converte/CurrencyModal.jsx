import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import { Input } from "antd";
// import { ButtonGroup } from "@mui/material";
import { Button, ButtonGroup } from "react-bootstrap";
import CheckableTag from "antd/es/tag/CheckableTag";
import "../Converte/Currency.css";

const CurrencyModal = ({
  setcurency,
  open,
  setopen,
  setCoinsymbol,
  CurrencyData,
  setCoinSign,
  setCryptoCoinSymbol,
  setCryptoCurrencyID,
  CoinId,
  setCurencyIcon,
}) => {
  const [suggestCurrency, setsuggestCurrency] = useState(CurrencyData);
  const [fiatCurrency, setfiatCurrency] = useState({});
  const [CryptoCurrency, setCryptoCurrency] = useState({});

  const [searchValue, setsearchvalue] = useState("");
  // console.log(CurrencyData, "modal datat");

  const handleClose = () => {
    setopen(false);
  };

  // console.log();

  const style = {
    margin: "auto",

    // bgcolor: "background.paper",
    border: "2px solid #000",
    bgcolor: "#181818",

    boxShadow: 24,
    p: 4,
  };

  const SuggestedCurrency = [
    {
      suggest: [
        { name: "US Dollar", symbol: "USD" },
        { name: "Indonesian Rupiah", symbol: "IDR" },
        { name: "New Taiwan Dollar", symbol: "TWD" },
        { name: "Euro", symbol: "EUR" },
        { name: "South Korean Won", symbol: "KRW" },
        { name: "Japanese Yen", symbol: "JPY" },
        { name: "Russian Ruble", symbol: "RUB" },
        { name: "Chinese Yuan", symbol: "CNY" },
      ],
      fiatCurrency: [
        { name: "United Arab Emirates Dirham", symbol: "AED" },
        { name: "Argentine Peso", symbol: "ARS" },
        { name: "Australian Dollar", symbol: "AUD" },
        { name: "Bangladeshi Taka", symbol: "BDT" },
        { name: "Bahraini Dinar", symbol: "BHD" },
        { name: "Bermudian Dolar", symbol: "BMD" },
        { name: "Brazil Real", symbol: "BRL" },
        { name: "Canadian Dollarna", symbol: "CAD" },
      ],
      Crypto: [
        { name: "Bitcoin", symbol: "BTC" },
        { name: "Ether", symbol: "ETH" },
        { name: "Bitcoin Cash    ", symbol: "BCH" },
        { name: "EOS", symbol: "EOS" },
        { name: "XRP", symbol: "XRP" },
      ],
    },
  ];

  const Click = (e, symbol, sign, currencyId, curencyIcon, detail) => {
    // console.log(CoinId, "idd");
    // console.log(currencyId, "cryptoid");
    e.preventDefault();

    // console.log(name, "button calih");
    setCurencyIcon(curencyIcon);

    setCoinsymbol(symbol);
    // setCoinName(name)
    setCoinSign(sign);
    // setcoin
    setopen(false);
    setCryptoCoinSymbol(sign);
    setCryptoCurrencyID(currencyId);
    // console.log(detail, "butdfgton");
  };

  useEffect(() => {
    // SearchValue();
    // Click()
  }, []);

  // console.log(searchValue);

  return (
    <div className="m-auto currency_modal" style={{ backgroundColor: "red" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "60%",
            height: "70vh",
            marginTop: "10%",
            overflow: "auto",
          }}
        >
          <h4 id="parent-modal-title">Select Currency</h4>

          <Input
            placeholder="search "
            onChange={(e) => {
              setsearchvalue(e.target.value.toLowerCase());
            }}
            s
          />

          {CurrencyData.status === "success" ? (
            <>
              {" "}
              <div className="fiat mt-4">
                <p>Fiat Currencies</p>
              </div>
              {/* {console.log(CurrencyData.data.currencies, "data")} */}
              <div
                className="fiat_btn"
                style={{ gap: "5%", display: "flex", flexWrap: "wrap" }}
              >
                {CurrencyData.data.currencies
                  .filter((x) => {
                    // console.log(x.name, "filter");
                    return x.name.toLowerCase().includes(searchValue);
                  })
                  .map((curencyBtn) => {
                    // console.log(curencyBtn.iconUrl, "button");
                    return (
                      <>
                        <Button
                          style={{ margin: "10px" }}
                          onClick={(e) =>
                            Click(
                              e,
                              curencyBtn.symbol,
                              curencyBtn.sign,
                              curencyBtn.uuid,
                              curencyBtn.iconUrl,
                              curencyBtn
                            )
                          }
                        >
                          <h6>
                            <span className="symb">{curencyBtn.symbol}</span>{" "}
                            <span> {curencyBtn.name}</span>{" "}
                          </h6>
                        </Button>
                      </>
                    );
                  })}
              </div>
            </>
          ) : (
            <>loader</>
          )}

          {/* <div className="crypto mt-4">
            <p>Cryptocurrencies</p>
          </div>
          <div className="d-flex" style={{ flexWrap: "wrap", gap: "5%" }}>
            {SuggestedCurrency[0].Crypto.filter((x) => {
              // console.log(x, "eraad");
              return x.name.toLowerCase().includes(searchValue);
            }).map((crypto) => {
              // console.log(crypto);
              return (
                <>
                  <Button
                    className="mt-2"
                    onClick={(e) => Click(e, crypto.symbol)}
                  >
                    {" "}
                    <h6 style={{ marginBottom: "0" }}>
                      <span>{crypto.symbol}</span> {crypto.name}
                    </h6>
                  </Button>
                </>
              );
            })}
          </div> */}

          {/* <p id="parent-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p> */}
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default CurrencyModal;
