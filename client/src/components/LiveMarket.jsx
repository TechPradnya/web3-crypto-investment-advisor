import React, { useEffect, useState } from "react";
import { getLivePrices } from "../services/marketApi";

function LiveMarket() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    const data = await getLivePrices();
    setCoins(data);
  };

  return (
    <div className="card">
      <h2>📈 Live Crypto Market</h2>

      {coins.map((coin) => (
        <div key={coin.symbol} className="market-row">
          <div>
            <strong>{coin.symbol}</strong> - {coin.name}
          </div>

          <div>₹ {coin.price.toLocaleString()}</div>

          <div
            style={{
              color: coin.change >= 0 ? "#22c55e" : "#ef4444",
              fontWeight: "bold"
            }}
          >
            {coin.change}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiveMarket;