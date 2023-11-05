import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { spread } from "axios";

const TableChart = ({ Coindata }) => {
  return (
    <Stack direction="row" style={{width:'100%'}}>
      <Box sx={{ flexGrow: 1 }}>

        <SparkLineChart data={Coindata.sparkline} height={100} />
      </Box>
    </Stack>
  );
};

export default TableChart;
