import {
  Alert,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
// import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { RegisterForm } from "../../Services/axios";
import { Container, Navbar } from "react-bootstrap";
import "../Login/Signup.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Lottie from "lottie-react";
import Images from "./tgqIMdmMYR.json";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// import Link from "react-router-dom";
const Signup = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Passwoard, setPasswoard] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [Loader ,setLoader]=useState(false)
  const navigate = useNavigate();

  const handlenavigate = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader(true)

    const RegisterData = {
      name: Name,
      email: Email,
      password: Confirmpassword,
    };

    const response = await RegisterForm(RegisterData,setLoader);
    console.log(response.data.status);
    if (response.data.status) {
      // setLoader(false)
      navigate("/login")
      
    } else {
      // setLoader(false)
      console.log('falsxe')
    }
    // console.log(RegisterData);
  };
  const style = {
    height: "60vh",
    width: "70%",
    margin: "auto",
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setshowpassword(!showpassword);
  };
  // Alert('er')
  return (
    <div>
      <Navbar style={{ padding: "30px" }} />
      <div
        className="d-flex "
        style={{
          flexWrap: "wrap",
          backgroundColor: "#24243c",
          height: "100vh",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <div className="background col-7 " style={{}}>
          {" "}
          <div className="container mt-5">
            {" "}
            <Lottie animationData={Images} style={style} />
          </div>
        </div>

        <div className=" reg-form col-4" style={{}}>
          <Container className="mt-5">
            <Card className="signup-form">
              {" "}
              <div
                className="container"
                style={{ textAlign: "center", width: "80%" }}
              >
                <h4 className="mt-4">Create an Account</h4>{" "}
                <div className="mt-4 name">
                  {" "}
                  <TextField
                    fullWidth
                    // placeholder="name"
                    // helperText="asd"
                    label="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  {" "}
                  <TextField
                    fullWidth
                    // placeholder="email"
                    label="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      <h6>Create a password </h6>
                    </InputLabel>
                    <OutlinedInput
                      // fullWidth
                      id="outlined-adornment-password"
                      type={showpassword ? "text" : "password"}
                      onChange={(e) => setPasswoard(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showpassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="mt-3">
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      <h6> Confirm Password </h6>
                    </InputLabel>
                    <OutlinedInput
                      // fullWidth
                      id="outlined-adornment-password"
                      type={showpassword ? "text" : "password"}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showpassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <Button
                  fullWidth
                  className="mt-4 submit "
                  onClick={handleRegister}
                >
                  {" "}
                 {Loader ? <> <CircularProgress disableShrink /></>:<>Create Account</>}  
                </Button>
                <div className="mb-5 mt-4 footer">
                  <h6>
                    Have an account ? <Link to={"/login"}>Sign In</Link>{" "}
                  </h6>
                </div>
              </div>
            </Card>{" "}
          </Container>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
