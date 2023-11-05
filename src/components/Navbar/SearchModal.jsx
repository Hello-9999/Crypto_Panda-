import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { Input, TextField, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './search.css'
const SearchModal = ({
  setsearchvalue,
  searchdata,
  Coins,
  exchanges,
  markets,
  searchvalue,
  displayinput,
  setdisplayinput,
}) => {
  const navigate = useNavigate()
  const style = {
    position: "relative",
    // top: "70%",
    // left: "50%",

    // transform: "translate(-50%, -50%)",
    overflow: "auto",
    right: 0,
    width: 400,
    height: "100vh",
    bgcolor: "#202020",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const inputchange = (value) => {
    // console.log('first');
    // console.log(value)
    const inputvalue = value.toLowerCase();
    setsearchvalue(inputvalue);
    // console.log(inputvalue);
  };
  const handleclose =(e)=>{
    e.preventDefault()
    setdisplayinput(false)

  }
  const coinDetails = (value) => {
    console.log(value);
    navigate(`/coindetail/${value}`)
    setdisplayinput(false)
  };
  return (
    <>
      <div>
        {/* <Button onClick={"handleOpen"}>Open modal</Button> */}
        <Modal
          open={displayinput}
          onClose={handleclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ overflow: "auto" }}
        >
          <Box sx={style}>
            {/* <Inoput></Inoput>{" "} */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                id="outlined-basic"
                label="Search coins, markets, exchange"
                variant="outlined"
                fullWidth
                onChange={(e) => inputchange(e.target.value)}
                sx={{backgroundColor:'aliceblue', borderRadius:"20px"}}
              />{" "}
            </Typography>
            {searchdata.status === "success" ? (
              <>
                {" "}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <h6>Coins</h6>
                  <hr />
                  <div className="coilist  mb-3">
                    {Coins.length === 0 ? (
                      <>
                        <h6>No result for {searchvalue} </h6>
                      </>
                    ) : (
                      <>
                        {" "}
                        {Coins.map((coin) => {
                          return (
                            <>
                              {" "}
                              <div onClick={(e) => coinDetails(coin.uuid)}  style={{cursor:'pointer'}}> 
                                {" "}
                                <div
                                  className="d-flex gap-3 mt-2"
                                  style={{ alignItems: "flex-start" }}
                                >
                                  <img
                                    src={coin.iconUrl}
                                    alt=""
                                    width={"20px"}
                                  />
                                  <h6>
                                    {coin.name}{" "}
                                    <span>
                                      {" "}
                                      <small>{coin.symbol} </small>
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>{" "}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <h6>Exchanges</h6>
                  <hr />
                  <div className="coilist">
                    {exchanges.length === 0 ? (
                      <>
                        <h6>No result for {searchvalue} </h6>
                      </>
                    ) : (
                      <>
                        {" "}
                        {exchanges.map((exchange) => {
                          // console.log(exchange)
                          return (
                            <>
                              {" "}
                              <div onClick={(e) => coinDetails(exchange.uuid)}>
                                {" "}
                                <div
                                  className="d-flex gap-3 mt-2"
                                  style={{ alignItems: "flex-start" }}
                                >
                                  <img
                                    src={exchange.iconUrl}
                                    alt=""
                                    width={"20px"}
                                  />
                                  <h6>
                                    {exchange.name}{" "}
                                    <span>
                                      {" "}
                                      {exchange.recommended === true ? (
                                        <>
                                          {<VerifiedUserIcon color="success" />}
                                        </>
                                      ) : (
                                        <>
                                          {
                                            <GppMaybeOutlinedIcon color="warning" />
                                          }{" "}
                                        </>
                                      )}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>{" "}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <h6>Markets</h6>
                  <hr />
                  <div className="coilist">
                    {markets.length === 0 ? (
                      <>
                        <h6>No result for {searchvalue}</h6>
                      </>
                    ) : (
                      <>
                        {markets.map((market) => {
                          return (
                            <>
                              {" "}
                              <div onClick={(e) => coinDetails(market.uuid)}>
                                {" "}
                                <div
                                  className="d-flex gap-3 mt-2"
                                  style={{ alignItems: "flex-start" }}
                                >
                                  <img
                                    src={market.exchangeIconUrl}
                                    alt=""
                                    width={"20px"}
                                  />
                                  <div
                                    className="d-flex gap-3"
                                    style={{ justifyContent: "space-between" }}
                                  >
                                    <div
                                      className="d-flex"
                                      style={{
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <h6>
                                        <div className="d-flex gap-3">
                                          {market.exchangeName}{" "}
                                          <span>
                                            {" "}
                                            <small>{market.quoteSymbol}</small>
                                          </span>
                                        </div>
                                      </h6>
                                    </div>
                                    <div>
                                      <span>
                                        {" "}
                                        {market.recommended === true ? (
                                          <>
                                            {
                                              <VerifiedUserIcon color="success" />
                                            }
                                          </>
                                        ) : (
                                          <>
                                            {
                                              <GppMaybeOutlinedIcon color="warning" />
                                            }{" "}
                                          </>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>{" "}
                </Typography>
              </>
            ) : (
              <>loader</>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default SearchModal;
