const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// GET RECOMMENDATION
export const getRecommendation = async (budget, risk) => {
  try {
    const response = await fetch(`${API_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budget, risk }),
    });

    return await response.json();
  } catch (error) {
    console.error("Recommendation error:", error);
    return null;
  }
};

// SAVE RECOMMENDATION
export const saveRecommendation = async (
  wallet,
  budget,
  risk,
  suggestion
) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet,
        budget,
        risk,
        suggestion,
      }),
    });

    if (!response.ok) {
      console.log("Save failed status:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Save error:", error);
    return null;
  }
};

// GET HISTORY
export const getHistory = async (wallet) => {
  try {
    const response = await fetch(`${API_URL}/history/${wallet}`);
    return await response.json();
  } catch (error) {
    console.error("History error:", error);
    return [];
  }
};