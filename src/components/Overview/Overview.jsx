import React from "react";
import Chart from "react-apexcharts";

const Overview = ({ timechart, CryptoCoinSymbol }) => {
  // console.log(timechart.data, "cj=hart");
  const formattedData =
    timechart.data.history &&
    timechart.data.history.map((item) => ({
      // console.log(item)

      x: new Date(item.timestamp * 1000).getTime(),
      y: Number(item.price),
      // y: (item.price),
      // console.log(Number(item.price)),
    }));
  console.log(timechart.data,'timechart')

  // console.log(formattedData ,'dataer')

  //

  var options = {
    // console.log(first)
    chart: {
      type: "area",
      height: 150,
     
      zoom: {
        autoScaleYaxis: true,
      },
      theme: {
        // mode: "dark",
        // palette: "palette1",
        // monochrome: {
        //   enabled: true,
        //   color: "#ee2525",
        //   shadeTo: "dark",
        //   shadeIntensity: 0.65,
        // },
      },

      animations: {
        enabled: true,
        easing: "linear",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    plotOptions: {
      area: {
        // borderColor: '#FF0000', // Change the border color of the area chart lines here
      },
    },
    annotations: {
      // yaxis: [
      //   {
      //     // y: 30,

      //     // borderColor: "#FF0000",
      //     label: {
      //       show: true,
      //       text: "Support",
      //       style: {
      //         color: "#FF0000",
      //         // background: "#FF0000",
      //       },
      //     },
      //     // colors: ["#F44336"],
      //   },
      // ],
      xaxis: [
        {
          borderColor: "#FF0000",
          yAxisIndex: 0,
          label: {
            show: true,
            text: "Rally",
            style: {
              color: "#FF0000",
              background: "#FF0000",
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      tickAmount: 1,
    },
    series: [
      {
        name: "Price",
        data: formattedData,
        // color:'red'
        // color: timechart.data.change.match("-") ? "#dc2626" : "#4BB543",
        color : timechart.data.change === null  ? '#dc2626':timechart.data.change.match("-") ? "#dc2626" : "#4BB543",
      },
    ],
    title: {
      // text: "Price Chart",
      align: "left",
    },

    // yaxis: {
    //   tooltip: {
    //     enabled: false,
    //   },
    //   // color:'red'
    // },

    // {console.log('first')}

    fill: {
      // colors: ['#FF0000', '#FF0000'],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5, // Set the starting opacity
        opacityTo: 0.1, // Set the ending opacity
        stops: [100, 0], // Define the gradient stops
      },
      colors:
        timechart.data.change === null
          ? ["#B33A3A"]
          : timechart.data.change.match("-")
          ? ["#dc2626"]
          : ["#4BB543"],
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          // Use JavaScript's toLocaleString() function to add thousands separators
          return `${CryptoCoinSymbol} ` + val.toLocaleString(2);
        },
        style: {
          colors: "#8eb9ed",
          fontSize: "0.8rem",
        },
      },
    },

    responsive: [
      {
        breakpoint: 990, // Adjust the breakpoint as needed
        options: {
          chart: {
            height: '300px',
            width:'100%' // Height for smaller screens
          },
        },
      },

      // {
      //   breakpoint: 990, // Adjust the breakpoint as needed
      //   options: {
      //     chart: {
      //       height: '300px',
      //       width:'300%' // Height for smaller screens
      //     },
      //   },
      // },


      
    ]
  };

  console.log(formattedData[0], "graph");

  return (
    <>
      <div id="chart-container">
        <Chart options={options} series={options.series} type="area" />
      </div>
      {console.log(options.series, "option")}
    </>
  );
};

export default Overview;
