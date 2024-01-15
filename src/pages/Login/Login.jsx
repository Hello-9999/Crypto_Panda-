import {
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
import { LoginForm } from "../../Services/axios";
import { Container, Navbar } from "react-bootstrap";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../Login/login.css";
import logImage from "./4H2ltRKGxL.json";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import Logindetails, {
  LoginDataslice,
  LoginDetails,
} from "../../slice/Logindetails";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Server/Loginserver";
import { errortoast } from "../../Services/toastify";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPasswoard] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [Loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const style = {
    height: "60vh",
    width: "70%",
    margin: "auto",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    // const logindata = {
    //   email: Email,
    //   password: Password,
    // };

    // const response = await LoginForm(logindata, setLoader);
    // if (response.data.status === "success") {
    //   console.log("okay");
    //   dispatch(LoginDataslice(response.data));
    //   navigate("/coinlist");
    // } else {
    // }

    // console.log(logindata, "data");
    // console.log(response.data.authData, "da");

    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        setLoader(false);
        const user = userCredential.user;
        const user_Data ={

          JWT : user.uid,
          Email:user.email,
          Name :user.displayName


        }
        dispatch(LoginDataslice(user_Data));
        navigate("/coinlist");      
      })
      .catch((error) => {
        setLoader(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        errortoast(errorMessage);
      });
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setshowpassword(!showpassword);
  };
  const handlenavigate = (e) => {
    e.preventDefault();

    navigate("/signup");
  };
  return (
    <>
      <div className="login" style={{ backgroundColor: "#24243c" }}>
        <Navbar style={{ padding: "20px" }} />{" "}
        <div
          className="d-flex mt-5"
          style={{
            flexWrap: "wrap",
            height: "100vh",
            padding: "10px",
            // alignItems: "center",
          }}
        >
          <div className="bacground-login col-7">
            {" "}
            <div className="container mt-5">
              {" "}
              <Lottie animationData={logImage} style={style} />
            </div>
          </div>

          <div className=" login-form col-4" style={{}}>
            <Container className="mt-5">
              <Card className="signin-form">
                {" "}
                <div
                  className="container"
                  style={{ textAlign: "center", width: "80%" }}
                >
                  <h4 className="mt-4 ">Login Your Account</h4>{" "}
                  <div className="mt-4">
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
                        <h6> Enter your Password </h6>
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
                              {showpassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                    onClick={handleLogin}
                  >
                    {" "}
                    {Loader ? (
                      <>
                        {" "}
                        <CircularProgress disableShrink />
                      </>
                    ) : (
                      <>Login</>
                    )}
                  </Button>
                  <div className="mb-5 mt-4 footer">
                    <h6>
                      Don't have an account ?{" "}
                      <Link to={"/signup"}>Create Account</Link>{" "}
                    </h6>
                  </div>
                </div>
              </Card>{" "}
            </Container>{" "}
          </div>

          {/* <FormControl>sd</FormControl>{" "} */}
        </div>{" "}
      </div>
    </>
  );
};

export default Login;
