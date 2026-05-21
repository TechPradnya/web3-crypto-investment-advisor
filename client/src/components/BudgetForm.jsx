import React, { useState } from "react";
import { getRecommendation } from "../services/api";

function BudgetForm({ setRecommendation }) {
  const [budget, setBudget] = useState("");
  const [risk, setRisk] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await getRecommendation(budget, risk);

    if (result) {
      setRecommendation(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Budget:</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />

      <label>Risk Level:</label>
      <select value={risk} onChange={(e) => setRisk(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="main-btn" type="submit">
        🚀 Get Recommendation
      </button>
    </form>
  );
}

export default BudgetForm;