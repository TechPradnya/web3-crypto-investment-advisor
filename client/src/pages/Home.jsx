import React from "react";

function Home() {
  return (
    <div className="hero">
      <h1>🚀 Web3 Crypto Investment Advisor</h1>

      <p>
        Build smarter crypto portfolios with live market prices,
        budget-based recommendations, risk analysis and secure
        Web3 wallet integration — all in one platform.
      </p>

      <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h2>Why use our platform?</h2>

        <br />

        <p>✅ AI-powered budget-based crypto portfolio suggestions</p>
        <p>✅ Real-time live crypto market prices</p>
        <p>✅ Secure MetaMask Web3 wallet integration</p>
        <p>✅ Blockchain-based recommendation saving</p>
        <p>✅ Beginner-friendly crypto investment guidance</p>
      </div>
    </div>
  );
}

export default Home;