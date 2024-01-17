import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import { Button } from "antd";
const TransactionCurrencyModal = ({
  OpenCurrencyModal,
  CurrencyList,
  setOpenCurrencyModal,
  setCurrencyList1,
  CloseCurrencyModal,
  CurrencyList1,
  setCurrencyName,
  setConverterCoin,
  setcurrencyDetail,
  setCurrencySign,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const SearchCoin = (value) => {
    // console.log(CurrencyList, "ddasd");
    const Searchvalue = CurrencyList.filter((search) => {
      return search.name.toLowerCase().includes(value);
    });
    setCurrencyList1(Searchvalue);
  };

  const buttonvalue = (e, curencyId, currencySymbol, curencydetail, sign) => {
    e.preventDefault();

    setConverterCoin(curencyId);
    setCurrencyName(currencySymbol);
    setOpenCurrencyModal(false);

    setcurrencyDetail(curencydetail);

    setCurrencySign(sign);
  };
  return (
    <>
      <Modal
        open={OpenCurrencyModal}
        // open={tru}
        onClose={OpenCurrencyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Input
              onChange={(e) => SearchCoin(e.target.value.toLowerCase())}
            ></Input>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fiat Cuurency
            <div className="mt-3" style={{ overflow: "auto", height: "50vh" }}>
              {CurrencyList1.length === 0 ? (
                <>
                  {" "}
                  <h6>No Curency</h6>{" "}
                </>
              ) : (
                <>
                  {" "}
                  {CurrencyList1.map((curency) => {
                    return (
                      <>
                        {" "}
                        <Button
                          className="m-2"
                          onClick={(e) =>
                            buttonvalue(
                              e,
                              curency.uuid,
                              curency.symbol,
                              curency,
                              curency.sign
                            )
                          }
                        >
                          <h6>
                            {curency.symbol} <small>{curency.name}</small>
                          </h6>
                        </Button>{" "}
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
  );
};

export default TransactionCurrencyModal;
