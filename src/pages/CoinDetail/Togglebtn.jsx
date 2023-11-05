import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import "./CoinDetail.css";

const Togglebtn = ({ settimevalue, settooglebtn, timechart }) => {
  const [alignment, setAlignment] = React.useState("24h");
  // console.log(timechart, "checkingdata");

  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment, "er");
    setAlignment(newAlignment);
  };
  const click = (e, value) => {
    e.preventDefault();

    console.log(value, "va");
    setAlignment(value);
    settimevalue(value);
    settooglebtn(true);
  };

  return (
    <>
      <div className="toggle">
        {" "}
        <ToggleButtonGroup
          value={alignment}
          // size="30%"75
          onChange={handleAlignment}
          aria-label="number allignment"
          id="tooglebtn"
          // exclusive
          sx={{
            border: "2px solid",
            // borderColor: "rgba(65, 63, 63, 0.885)",
            backgroundColor: "#d0d0d0",
            // width:'50%'
          }}
        >
          <ToggleButton
            value="1h"
            aria-label="left aligned"
            onClick={click}
            // sx={{ border: "2px solid", borderColor: "rgba(65, 63, 63, 0.885)" }}
            // color={alignment === "1h" ? "primary" : "default"}
            // color={alignment === '1h' ? 'primary' :'secondary'}
          >
            <h6>
              <b id="innertext">1h</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="3h"
            aria-label="left aligned"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>3h</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="12h"
            aria-label="right aligned"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>12h</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="24h"
            aria-label="justified"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>24h</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="7d"
            aria-label="justified"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>7d</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="30d"
            aria-label="justified"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>30d</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="3m"
            aria-label="justified"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>3m</b>
            </h6>{" "}
          </ToggleButton>
          <ToggleButton
            value="1y"
            aria-label="justified"
            onClick={click}
            // sx={{ border: "1px solid", borderColor: "#413f3fb0" }}
          >
            <h6>
              <b>1y</b>
            </h6>{" "}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  );
};

export default Togglebtn;
