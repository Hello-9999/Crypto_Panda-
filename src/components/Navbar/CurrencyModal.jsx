import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrencyModal = ({
  openModal,
  setopenModal,
  setcurrencyUid,
  setcurrencySign,
  setButtonSign,
  setcurrencyName,
  setcurrencySymbol,
}) => {
  const [Currency, setCurrency] = useState([]);
  const [Currencysign, setCurrencysign] = useState([]);
  const [NcurrencySign, setNcurrencySign] = useState([]);
  const getCurrency = async () => {
    const response = await axios.get(
      "https://api.coinranking.com/v2/reference-currencies"
    );
    setCurrencysign(response.data.data.currencies);
    setNcurrencySign(response.data.data.currencies);

    setCurrency(response.data);

    return response.data;
  };

  const handleSearch = (value) => {
    const searchvalue = value.toLowerCase();
    // console.log(Currencysign, "sign");
    // console.log(searchvalue);

    const search = Currencysign.filter((check) => {
      const coinname = check.name.toLowerCase().includes(searchvalue);
      const coinsymbol = check.symbol.toLowerCase().includes(searchvalue);
      return coinname || coinsymbol;
    });

    setNcurrencySign(search);
  };
  const handleSearchCoin = (e, value) => {
    e.preventDefault();
    setopenModal(false);
    setcurrencyUid(value.uuid);
    setcurrencyName(value.name);
    setcurrencySymbol(value.symbol);

    // console.log(value.uuid, "value");
    // console.log(value.sign, "sign");
    console.log(value, "details");

    if (value.sign === null) {
      setcurrencySign(value.symbol);
      setButtonSign(value.symbol);
    } else {
      setcurrencySign(value.sign);
      setButtonSign(value.sign);
    }
  };
  const handleclose = () => {
    setopenModal(false);
  };
  console.log(NcurrencySign, "sign");
  useEffect(() => {
    getCurrency();
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "70vh",
    overflow: "auto",
  };
  return (
    <>
      {" "}
      <div>
        {" "}
        {/* {console.log(Currency.data, "curre")} */}
        {Currency.status === "success" ? (
          <>
            {" "}
            <Modal
              open={openModal}
              onClose={handleclose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Select Currency
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Typography>
                <Typography sx={{ mt: 4 }}>
                  <div
                    className="d-flex gap-4 container"
                    style={{ flexWrap: "wrap" }}
                  >
                    {NcurrencySign.length === 0 ? (
                      <>
                        <h6>Coin Not fouind</h6>
                      </>
                    ) : (
                      <>
                        {NcurrencySign.map((sign) => {
                          console.log(sign);
                          return (
                            <>
                              {" "}
                              <Button
                                variant="contained"
                                onClick={(e) => handleSearchCoin(e, sign)}
                              >
                                <div>
                                  <h6 style={{ margin: "0", padding: "10px" }}>
                                    <span className="mx-2">{sign.symbol}</span>
                                    {sign.name}
                                  </h6>
                                </div>
                              </Button>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </Typography>
              </Box>
            </Modal>
          </>
        ) : (
          <>loader</>
        )}
      </div>
    </>
  );
};

export default CurrencyModal;
