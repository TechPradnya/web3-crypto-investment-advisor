import React from "react";
import { saveRecommendation } from "../services/api";

function RecommendationCard({ recommendation, wallet }) {
  const handleSave = async () => {
    if (!wallet) {
      alert("Please connect MetaMask first");
      return;
    }

    const result = await saveRecommendation(
      wallet,
      recommendation.budget,
      recommendation.risk,
      recommendation.suggestion
    );

    console.log(result);

    if (result) {
      alert("Recommendation saved!");
    } else {
      alert("Save failed!");
    }
  };

  return (
    <div className="recommendation">
      <h2>💡 Recommended Portfolio</h2>

      <p><strong>Budget:</strong> ₹{recommendation.budget}</p>
      <p><strong>Risk:</strong> {recommendation.risk}</p>

      <div>
        <span className="crypto-tag">BTC</span>
        <span className="crypto-tag">ETH</span>
        <span className="crypto-tag">SOL</span>
      </div>

      <p>{recommendation.suggestion}</p>

      <button className="main-btn" onClick={handleSave}>
        Save Recommendation
      </button>
    </div>
  );
}

export default RecommendationCard;