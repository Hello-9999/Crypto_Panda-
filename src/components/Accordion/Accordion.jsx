import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Accordion/Accor.css";
const Accordionlist = () => {
  return (
    <>
      {" "}
      <div>
        {" "}
        <div className="mt-5 accor col-6">
          <div className="title">
            <h6>Popular questions</h6>
          </div>{" "}
          <Accordion className="mt-5 " id="accor">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {" "}
                <h6>How do we rank cryptocurrencies? </h6>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We rank cryptocurrencies based on the market cap by default.
                However, we do offer filters according to other metrics such as
                trading volume or price. Besides market cap, we also implement
                certain criteria that decide which 'tier' a cryptocurrency would
                be placed at.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="mt-2 " id="accor">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {" "}
                <h6>How do we calculate coin prices? </h6>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our pricing system operates in real-time, constantly monitoring
                price notifications (tickers) from various exchanges across
                different markets. Upon receiving these notifications, the
                prices are promptly recalculated and updated. To ensure
                stability in pricing, we generally consider the top 20 markets
                for our calculations.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="mt-2 "id="accor">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {" "}
                <h6>What is market cap? </h6>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>
                  Market capitalization, commonly known as "market cap," is a
                  measure of a coin's value in the coin market.
                </p>
                <br />
                <p>
                  In simpler terms, it's the value of a coin as determined by
                  the coin market. The higher the market cap, the more valuable
                  the coin is considered to be. It's an important metric for
                  investors because it gives them an idea of the coin size, and
                  it can also be used to compare it to other coins in the same
                  industry.
                </p>

                <br />

                <p>
                  A crypto market cap for a single coin represents the total
                  value of all circulating units of a particular cryptocurrency.
                </p>
                <br />
                <p>
                  To calculate the market cap of a cryptocurrency, you need to
                  multiply the current market price of the coin by the total
                  number of coins that are in circulation. For example, if a
                  cryptocurrency has 10 million coins in circulation and the
                  current market price is $10 per coin, then its market cap
                  would be $100 million.
                </p>
                <br />

                <p>
                  The cryptocurrency market capitalization refers to the overall
                  value of all the coins that are currently in circulation for a
                  specific digital currency. This valuation is critical in
                  ranking cryptocurrencies according to their market share and
                  popularity. The higher the market capitalization of a
                  particular cryptocurrency, the higher its position and
                  percentage of the total market share.
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Accordionlist;
