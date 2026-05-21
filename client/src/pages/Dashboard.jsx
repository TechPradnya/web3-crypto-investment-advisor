import React, { useState, useEffect } from "react";
import WalletConnect from "../components/WalletConnect";

function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [budget, setBudget] = useState("");
  const [risk, setRisk] = useState("Low");
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);

  // LIVE MARKET API
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=inr&include_24hr_change=true"
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = [
          {
            coin: "BTC",
            name: "Bitcoin",
            price: data.bitcoin.inr,
            change: data.bitcoin.inr_24h_change.toFixed(2),
          },
          {
            coin: "ETH",
            name: "Ethereum",
            price: data.ethereum.inr,
            change: data.ethereum.inr_24h_change.toFixed(2),
          },
          {
            coin: "SOL",
            name: "Solana",
            price: data.solana.inr,
            change: data.solana.inr_24h_change.toFixed(2),
          },
          {
            coin: "USDT",
            name: "Tether",
            price: data.tether.inr,
            change: data.tether.inr_24h_change.toFixed(2),
          },
        ];

        setMarketData(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  const getPrice = (coin) => {
    const found = marketData.find((item) => item.coin === coin);
    return found ? found.price : 1;
  };

  // SMART RECOMMENDATION + CALCULATOR
  const getRecommendation = () => {
    if (!budget || budget < 500) {
      alert("Minimum budget should be ₹500");
      return;
    }

    let allocation = [];

    if (risk === "Low") {
      allocation = [
        { coin: "BTC", percent: 40 },
        { coin: "ETH", percent: 30 },
        { coin: "SOL", percent: 20 },
        { coin: "USDT", percent: 10 },
      ];
    } else if (risk === "Medium") {
      allocation = [
        { coin: "BTC", percent: 35 },
        { coin: "ETH", percent: 25 },
        { coin: "SOL", percent: 25 },
        { coin: "USDT", percent: 15 },
      ];
    } else {
      allocation = [
        { coin: "BTC", percent: 25 },
        { coin: "ETH", percent: 25 },
        { coin: "SOL", percent: 30 },
        { coin: "USDT", percent: 20 },
      ];
    }

    const calculated = allocation.map((item) => {
      const money = (budget * item.percent) / 100;
      const price = getPrice(item.coin);
      const quantity = (money / price).toFixed(6);

      return {
        ...item,
        money,
        quantity,
      };
    });

    setPortfolioData(calculated);
  };

  return (
    <div className="page">
      <h1>📊 Investment Dashboard</h1>

      {/* LIVE MARKET */}
      <div className="card">
        <h2>📈 Live Crypto Market</h2>

        {marketData.map((item, index) => (
          <div key={index} className="market-row">
            <span>
              <strong>{item.coin}</strong> - {item.name}
            </span>
            <span>₹ {item.price.toLocaleString()}</span>
            <span
              style={{
                color: item.change > 0 ? "#22c55e" : "#ef4444",
                fontWeight: "bold",
              }}
            >
              {item.change}%
            </span>
          </div>
        ))}
      </div>

      <br />

      {/* WALLET */}
      <WalletConnect wallet={wallet} setWallet={setWallet} />

      <br />
      <br />

      <label>Budget:</label>
      <input
        type="number"
        placeholder="Enter budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <label>Risk Level:</label>
      <select value={risk} onChange={(e) => setRisk(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="main-btn" onClick={getRecommendation}>
        🚀 Get Recommendation
      </button>

      {portfolioData.length > 0 && (
        <div className="recommendation">
          <h2>💡 Recommended Portfolio</h2>

          <p>
            Based on your <strong>₹{budget}</strong> budget and current live
            market prices, this shows how much crypto you can purchase.
          </p>

          <p>
            <strong>Risk Level:</strong> {risk}
          </p>

          <br />

          {/* TABLE HEADERS */}
          <div className="market-row">
            <strong>Coin</strong>
            <strong>Investment Amount</strong>
            <strong>Quantity You Can Buy</strong>
          </div>

          <br />

          {/* TABLE DATA */}
          {portfolioData.map((coin, index) => (
            <div key={index} className="market-row">
              <span>
                <strong>{coin.coin}</strong> ({coin.percent}%)
              </span>

              <span>₹{coin.money.toFixed(2)}</span>

              <span>
                {coin.quantity} {coin.coin}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;