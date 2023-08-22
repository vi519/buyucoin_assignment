import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function LiveData() {
  const [seriesDetail, setSerieDetail] = useState([]);

  useEffect(() => {
    async function getApiData() {
      axios
        .get("https://api.buyucoin.com/ticker/v1.0/liveData")
        .then((response) => {
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
      type: "area",
    },
    credits: {
        enabled: true, 
        text: 'Vineet Mishra', 
      },
    title: {
      text: "Live Data",
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
export default LiveData;
