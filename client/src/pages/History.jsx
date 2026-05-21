import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=8&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <h1>📈 Crypto Analytics Dashboard</h1>

      <div className="card">
        <h2>Live Top Crypto Market</h2>

        {/* TABLE HEADERS */}
        <div className="analytics-header">
          <span># Coin</span>
          <span>Price</span>
          <span>1h</span>
          <span>24h</span>
          <span>7d</span>
          <span>Volume</span>
          <span>Market Cap</span>
          <span>Trend</span>
        </div>

        {/* TABLE DATA */}
        {coins.map((coin, index) => {
          const chartData = coin.sparkline_in_7d.price.map((price, i) => ({
            index: i,
            price,
          }));

          return (
            <div key={coin.id} className="analytics-row">
              {/* Coin */}
              <span className="coin-box">
                {index + 1}.{" "}
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="24"
                  height="24"
                />{" "}
                {coin.symbol.toUpperCase()}
              </span>

              {/* Price */}
              <span>₹{coin.current_price.toLocaleString()}</span>

              {/* 1h */}
              <span
                style={{
                  color:
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
              </span>

              {/* 24h */}
              <span
                style={{
                  color:
                    coin.price_change_percentage_24h > 0
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>

              {/* 7d */}
              <span
                style={{
                  color:
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </span>

              {/* Volume */}
              <span>₹{coin.total_volume.toLocaleString()}</span>

              {/* Market Cap */}
              <span>₹{coin.market_cap.toLocaleString()}</span>

              {/* Sparkline */}
              <div className="sparkline-box">
                <ResponsiveContainer width={120} height={50}>
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={
                        coin.price_change_percentage_7d_in_currency > 0
                          ? "#22c55e"
                          : "#ef4444"
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Analytics;