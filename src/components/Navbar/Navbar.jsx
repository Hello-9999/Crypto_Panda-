import * as React from "react";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import PersonIcon from "@mui/icons-material/Person";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Button from 'antd'
// import Button from "@mui/material";
import { Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "../Navbar/Navbar.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import SearchModal from "./SearchModal";
import { SearchCoin } from "../../Services/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyModal from "./CurrencyModal";
import "./Navbar.css";
const Bar = ({
  setcurrencyUid,
  setcurrencySign,
  setcurrencyName,
  setcurrencySymbol,
}) => {
  const [searchdata, setsearchdata] = useState({});
  const [Coins, setCoins] = useState([]);
  const [Exchanges, setExchanges] = useState([]);
  const [Markets, setMarkets] = useState([]);
  const [searchvalue, setsearchvalue] = useState([]);
  const [displayinput, setdisplayinput] = useState(false);
  const nav = document.querySelector("navDropdown");
  const display_block = document.querySelector("dropdown-menu show");
  const Logindetails = useSelector((state) => state.Login_Details);
  const navigate = useNavigate();
  const [openModal, setopenModal] = useState(false);
  const [ButtonSign, setButtonSign] = useState("$");

  // nav.addEventListener('mouseover',()=>{
  //   console.log('asd')
  // })

  const getSearchSuggest = async () => {
    const response = await SearchCoin(searchvalue);
    // console.log(response, "search");

    if (response.data.status === "success") {
      setsearchdata(response.data);
      setCoins(response.data.data.coins);
      setExchanges(response.data.data.exchanges);
      setMarkets(response.data.data.markets);
    } else {
    }
  };
  // console.log(searchdata.data, "data");
  // debugger
  const clickInput = (e) => {
    e.preventDefault();
    setdisplayinput(true);
  };
  const Loggedin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const Loggedout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setopenModal(true);
  };
  useEffect(() => {
    getSearchSuggest();
  }, [searchvalue]);

  return (
    <>
      <div
        className="nav-bar"
        style={{ position: "sticky", top: "0", zIndex: "9" }}
      >
        <Navbar
          className="pt-3 pb-3"
          expand="lg"
          // className="bg-body-tertiary"
          style={{ backgroundColor: "#35353c", color: "aliceblue" }}
        >
          <Container>
            <Navbar.Brand href="#">
              {" "}
              <h6 className="logo">
                <span> Crypto</span>
                <b>Panda</b>
              </h6>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{ color: "aliceblue" }}>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">Coins</Nav.Link>
                <Nav.Link href="/new-coin">New Coins</Nav.Link>
                <Nav.Link href="/crypto-gainers-losers">
                  Gainers & Losers
                </Nav.Link>
                <Nav.Link href="#action4">News</Nav.Link>
              </Nav>
              <Nav className="search-div ">
                <div style={{ color: "black" }}>
                  {" "}
                  <Button
                    className="mx-3 btn-currency"
                    type="primary"
                    size="large"
                    onClick={handleSearch}
                  >
                    <div className="d-flex">
                      <h5> {ButtonSign}</h5>
                      <ArrowDropDownIcon />
                    </div>
                  </Button>
                  <CurrencyModal
                    openModal={openModal}
                    setopenModal={setopenModal}
                    setcurrencyUid={setcurrencyUid}
                    setcurrencySign={setcurrencySign}
                    setButtonSign={setButtonSign}
                    setcurrencyName={setcurrencyName}
                    setcurrencySymbol={setcurrencySymbol}
                  />
                </div>
                {Logindetails.isLoggedin ? (
                  <>
                    <NavDropdown
                      title={<PersonIcon />}
                      id="navDropdown"
                      className="mx-3"
                    >
                      <NavDropdown.Item href="/favorites">
                        Portfolio
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/alert">
                        price alert
                      </NavDropdown.Item>
                      <NavDropdown.Divider />

                      <NavDropdown.Item href="#action5">
                        {" "}
                        {Logindetails.isLoggedin ? (
                          <>
                            {" "}
                            <Button
                              sx={{
                                backgroundColor: "blue",
                                color: "aliceblue",
                              }}
                              fullWidth
                              onClick={Loggedout}
                            >
                              Log out{" "}
                            </Button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Button
                              sx={{
                                backgroundColor: "blue",
                                color: "aliceblue",
                              }}
                              fullWidth
                              onClick={Loggedin}
                            >
                              {" "}
                              Login
                            </Button>{" "}
                          </>
                        )}{" "}
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Form className="d-flex">
                      <div style={{}}>
                        <Form.Control
                          type=""
                          // disabled
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          onClick={clickInput}
                          // onDrop={}
                        />
                        <div style={{}}>
                          <p>
                            {" "}
                            <SearchModal
                              searchdata={searchdata}
                              Coins={Coins}
                              exchanges={Exchanges}
                              markets={Markets}
                              setsearchvalue={setsearchvalue}
                              searchvalue={searchvalue}
                              displayinput={displayinput}
                              setdisplayinput={setdisplayinput}
                            />
                          </p>
                        </div>
                      </div>
                    </Form>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={clickInput}
                      size="large"
                      style={{ width: "180px" }}
                      className="btn-search"
                    >
                      Search
                    </Button>
                    {/* <Form className="d-flex">
                      <div style={{}}>
                        <Form.Control
                          type=""
                          // disabled
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          onClick={clickInput}
                          // onDrop={}
                        />
                        <div style={{}}>
                          <p>
                            {" "}

                          </p>
                        </div>
                      </div>
                    </Form> */}
                    <Button
                      className="mx-4 btn-login"
                      style={{ alignItems: "center" }}
                      // variant="contained"
                      type="primary"
                      size="large"
                      href="/login"
                      // onClick={Loggedin}
                      ghost
                    >
                      Login
                    </Button>
                    <Button
                      className=" btn-signup"
                      style={{ alignItems: "center" }}
                      // variant="contained"
                      type="primary"
                      size="large"
                      // onClick={Loggedin}
                      href="/signup"
                    >
                      Sign up
                    </Button>
                    <SearchModal
                      searchdata={searchdata}
                      Coins={Coins}
                      exchanges={Exchanges}
                      markets={Markets}
                      setsearchvalue={setsearchvalue}
                      searchvalue={searchvalue}
                      displayinput={displayinput}
                      setdisplayinput={setdisplayinput}
                    />
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Bar;
