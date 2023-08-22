import React from 'react';
import './App.css';
import CryptoChart from './CryptoChart';
import LiveData from './LiveData';
import SymbolChart from './SymbolChart';
import CurrencyTable from './CurrencyTable';

function App() {
  return (
    <><header className='header'>React Assignment By Vineet Mishra</header><div className="App">


      <div><CurrencyTable /></div>
      <div><LiveData /></div>
      <div><CryptoChart /></div>
      <div><SymbolChart /></div>

    </div></>
        
        
        

  );
}

export default App;
