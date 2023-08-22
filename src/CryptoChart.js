import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CryptoChart = () => {
  const [seriesDetail, setSerieDetail]=useState([])
  
  useEffect(() => {
    async function getApiData()
    {
     await axios.get('https://api.buyucoin.com/ticker/v1.0/allCurrencies').then(response => {
        
     let apiData=response.data.data
     const arrayOfObjects = [];
     
   for (let i = 0; i < apiData.length; i++) {

           const newObj = {
     
           name: apiData[i].name,
          data:[parseInt(apiData[i].maxDeposit)]
         


             };
             
         arrayOfObjects.push(newObj);
     }
     

     console.log(arrayOfObjects)
     setSerieDetail(arrayOfObjects)
     
   })
   .catch(error => {
     // Handle any errors here
     console.error('Error:', error);
   });
    }
    

    getApiData()
  }, []);

  const options = {
    chart: {
        type: 'bar'
    },
    credits: {
        enabled: true, 
        text: 'Vineet Mishra', 
      },
    title: {
      text: 'Currency Prices',
    },
    xAxis: {
      categories: seriesDetail.map((crypto) => crypto.name),
    },
    yAxis: {
      title: {
        text: 'Price (USD)',
      },
    },
    series:seriesDetail
  };

  return (
    <div>
       
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CryptoChart;
