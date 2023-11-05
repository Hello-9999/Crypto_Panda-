import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CoinListdata } from "../../Services/axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { favoriteList } from "../../slice/AddtoFavorite";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./favadd.css";
const FavAdd = ({ Open, setOpen }) => {
  const [Coinlist, setCoinlist] = useState([]);
  const [NextCoinlist, setNextCoinlist] = useState([]);
  const [Inputvalue, setInputvalue] = useState([]);
  const [close, setclose] = useState(false);
  const dispatch = useDispatch();

  const getCoinList = async () => {
    const response = await CoinListdata("coins");
    // console.log(response.data, "res");
    if (response.data.status === "success") {
      setCoinlist(response.data.data.coins);
      setNextCoinlist(response.data.data.coins);
    } else {
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#272424",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Searchcoin = (value) => {
    const Inputvalue = value.toLowerCase();
    const coindata = NextCoinlist.filter((serchvalue) => {
      // console.log(serchvalue.name, "er");
      return serchvalue.name.toLowerCase().includes(Inputvalue);
    });
    setCoinlist(coindata);

    // console.log(coindata, "data");
  };
  //   export default function KeepMountedModal() {
  //     const [open, setOpen] = React.useState(false);
  //     const handleOpen = () => setOpen(true);
  //     const handleClose = () => setOpen(false);

  //   }

  const addInFavlist = (e, CoinDetail) => {
    e.preventDefault();
    dispatch(favoriteList(CoinDetail));

    // console.log(CoinDetail, "ad");
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    getCoinList();
    // Searchcoin()
  }, []);
  // console.log(Coinlist, "coinlist");
  return (
    <>
      <div>
        {" "}
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          keepMounted
          open={Open}
          onClose={closeModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
          sx={{ backgroundColor: "#00000091" }}
          
        >
          <Box sx={style} className="favmodal">
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              <div
                className="d-flex "
                style={{ justifyContent: "space-between" }}
              >
                <h4>Search your favorite coin</h4>
                <CloseOutlinedIcon
                  onClick={closeModal}
                  sx={{ cursor: "pointer" }}
                />
              </div>

              <div className="search">
                <TextField
                  className="mt-2"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your coin name"
                  onChange={(e) => Searchcoin(e.target.value)}
                  sx={{ backgroundColor: "aliceblue" }}
                  // classes={}
                />
              </div>
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <Paper>
                <TableContainer
                  sx={{
                    maxHeight: 440,
                    backgroundColor: "#413e3ee0",
                    color: "aliceblue",
                  }}
                >
                  <Table>
                    {/* <TableHead></TableHead> */}

                    <TableBody>
                      {Coinlist.length === 0 ? (
                        <>
                          {/* {console.log(Inputvalue, "value")} */}
                          <h5 className="notfound"> Coin not found !! </h5>
                        </>
                      ) : (
                        <>
                          {" "}
                          {Coinlist.map((coin) => {
                            //   console.log(typeof coin, "asd");
                            //   console.log(Coinlist.data.coins, "d");
                            return (
                              <>
                                {" "}
                                <TableRow hover sx={{ cursor: "pointer" }}>
                                  <TableCell
                                    onClick={(e) => addInFavlist(e, coin)}
                                  >
                                    <div className="d-flex gap-3">
                                      <div className="logo">
                                        {" "}
                                        <img
                                          src={coin.iconUrl}
                                          alt={coin.name}
                                          width="30px"
                                        />
                                      </div>
                                      <div
                                        className="name d-flex gap-2"
                                        style={{
                                          textAlign: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <h6>{coin.name}</h6>
                                        <small>{coin.symbol}</small>
                                      </div>{" "}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>{" "}
            </Typography>
          </Box>
        </Modal>
      </div>{" "}
    </>
  );
};

export default FavAdd;
