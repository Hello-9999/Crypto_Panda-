import React from "react";
import Bar from "../../components/Navbar/Navbar";
// import { Button } from "antd";
import CryptoImage from "./animation_lnep8z8o.json";
// import "@lottiefiles/lottie-player";
import Lottie from "lottie-react";
import "../Home1/Home1.css";
import {
  Card,
  CardActionArea,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";
// import { useLottie } from "lottie-react";
import timeIcon from "../../../icons/efficiency.png";
import aleart from "../../../icons/alert.gif";
import database from "../../../icons/database.gif";
import shield from "../../../icons/shield.gif";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
// import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home1 = () => {
  // console.log(CryptoImage,'er')
  const Login = useSelector((state) => state.Login_Details);
  console.log(Login.isLoggedin);
  const navigate = useNavigate();
  const style = {
    height: "100vh",
    // width:'100%'
  };
  const lunch = () => {
    navigate("/coinlist");
  };
  const loginButton = (e) => {
    e.preventDefault();
    console.log("first");
    navigate("/login");
  };
  return (
    <>
      <div className="homepage">
        <div
          className="bar"
          style={{
            position: "sticky",
            top: "0",
            zIndex: "9",
            backgroundColor: "white",
          }}
        >
          <Navbar expand="lg" className=" ">
            <Container style={{ gap: "50%" }}>
              <Navbar.Brand href="#" className="me-auto my-2 my-lg-0">
                Navbar scroll
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll" style={{ flexGrow: "0" }}>
                <Nav style={{ maxHeight: "100px" }} navbarScroll>
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                  <Nav.Link href="#service">Feature</Nav.Link>
                </Nav>
                <Button className="mx-3" onClick={loginButton}>
                  {Login.isLoggedin ? <>Sign Out</> : <>Login</>}{" "}
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        {/* <Bar /> */}

        <div className="home" id="home" style={{ backgroundColor: "black" }}>
          <div
            className="d-flex container gap-5"
            style={{ alignItems: "center" }}
          >
            <div className="home-head col-5 mt-5 ">
              {" "}
              <h1>Real-time Crypto Price Tracker</h1>
              <p>
                Welcome to <b>Cryptopanda !! </b>
                your one-stop destination for all things cryptocurrency. Whether
                you're a seasoned crypto enthusiast or just starting your
                journey into the world of digital assets, CryptoPanda is here to
                empower you with essential tools and information.
              </p>
              <Button onClick={lunch}> Start Trading 🚀</Button>
            </div>

            <Lottie animationData={CryptoImage} style={style} />
          </div>
        </div>
        <div className="about" id="about" style={{ marginBottom: "10%" }}>
          <div className="">
            {" "}
            <h4 className="text-center ">About CryptoPanda</h4>
          </div>{" "}
          <div
            className="d-flex  gap-5 container"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <div className="col-6">
              {" "}
              <img
                src="https://media.licdn.com/dms/image/D4D12AQE6skKg4FvI5w/article-cover_image-shrink_720_1280/0/1680512713506?e=2147483647&v=beta&t=j6kATkPiTnQNL_ImbUCfx_rgbSLYkLNl0LP5E74ScW8"
                alt=""
                width={"100%"}
              />
            </div>

            <div className="who col-5">
              <h5>
                {" "}
                <b>Driven by Passion</b>
              </h5>
              <p>
                CryptoPanda is a project fueled by a single passionate
                individual, dedicated to making the world of cryptocurrency
                accessible to everyone. As a solo venture, our journey begins
                with a deep-rooted commitment to the crypto community.
              </p>

              <div className="mission">
                <h5>
                  {" "}
                  <b>Our Mission</b>
                </h5>
                <p>
                  <b style={{ fontWeight: "bold" }}> Our mission is clear : </b>
                  to empower individuals with the knowledge and tools they need
                  to thrive in the world of cryptocurrencies. We're here to
                  simplify the complexities, provide real-time data, and create
                  a secure and user-friendly platform for crypto enthusiasts,
                  traders, and investors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="feature  mb-4" id="service">
          <h4 style={{ textAlign: "center" }}>Our Features</h4>

          <div
            className="feature-body d-flex container gap-5 mt-4"
            style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
          >
            <div className="realtime col-3 ">
              <Card className="body p-4">
                <div className="d-flex gap-3" style={{ alignItems: "center" }}>
                  <img src={database} alt="" width={"50px"} />
                  <h4>Real-time Data</h4>{" "}
                </div>

                <p className="mt-3">
                  Stay ahead of the curve with our real-time cryptocurrency
                  market data. We provide up-to-the-minute price updates,
                  trading volumes, and market capitalizations for a wide range
                  of digital assets. Our intuitive charts and graphs help you
                  visualize market trends and make informed decisions.
                </p>
              </Card>
            </div>
            <div className="pricealeart col-3">
              {" "}
              <Card className="body p-4">
                <div className="d-flex gap-3" style={{ alignItems: "end" }}>
                  <img src={aleart} alt="" width={"50px"} />
                  <h4> Price Alerts</h4>
                </div>

                <p className="mt-3">
                  Never miss a price movement with CryptoPanda's customizable
                  price alerts. Set alerts for your favorite cryptocurrencies,
                  and we'll notify you instantly when your specified price
                  targets are reached. Whether it's a bullish breakout or a dip
                  in the market, you'll be the first to know.
                </p>
              </Card>
            </div>
            <div className="loginsignup col-3">
              {" "}
              <Card className="body p-4">
                <div className="d-flex gap-3" style={{ alignItems: "end" }}>
                  <img src={shield} alt="" width={"50px"} />
                  <h4>Secure Login & Logout</h4>
                </div>
                <p className="mt-3">
                  Your security is our top priority. Our secure login and logout
                  processes ensure that your personal information and assets are
                  protected. Use CryptoPanda with confidence, knowing that your
                  account is in safe hands.
                </p>
              </Card>
            </div>
          </div>
        </div>
        {/* <hr />
        <div
          className="explore d-flex container"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div className="col-5">
            <h4>Let's Explore Together</h4>
            <p>
              CryptoPanda may be a solo project, but it's fueled by a profound
              passion for cryptocurrencies and their potential. Join us on this
              exciting journey, and let's explore the world of digital assets
              together.
            </p>
          </div>

          <div>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Subscribe</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home1;
