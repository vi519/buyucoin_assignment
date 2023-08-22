import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function SymbolChart() {
  const [seriesDetail, setSerieDetail] = useState([]);

  useEffect(() => {
    async function getApiData() {
      await axios.get("https://api.buyucoin.com/ticker/v1.0/liveData?symbol=USDT-BTC").then((response) => {
          
          console.log("Data:", response.data.data);
          let apiData = response.data.data;
          const arrayOfObjects = [];

          for (let i = 0; i < apiData.length; i++) {
            const newObj = {
              name: apiData[i].currToName,
              data: [
                parseInt(apiData[i].bid),
                parseInt(apiData[i].ask),
                parseInt(apiData[i].sprd),
              ],
            };

            arrayOfObjects.push(newObj);
          }

          console.log(arrayOfObjects);
          setSerieDetail(arrayOfObjects);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    }
    getApiData();
  }, []);

  // Define the chart options
  const options = {
    chart: {
      type: "spline",
    },
    credits: {
        enabled: true, 
        text: 'Vineet Mishra', 
      },
    title: {
      text: "USDT-BTC Data",
    },
    xAxis: {
      categories: ["Bid", "Ask", "Spread"],
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },
    series: seriesDetail,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
export default SymbolChart;
