export function getRecommendation(budget, risk) {
  budget = Number(budget);

  if (risk === "Low") {
    if (budget < 5000) {
      return {
        budget,
        risk,
        suggestion:
          "60% BTC, 20% ETH, 20% Stablecoin (small safe portfolio)"
      };
    } else if (budget < 20000) {
      return {
        budget,
        risk,
        suggestion:
          "50% BTC, 30% ETH, 20% Stablecoin"
      };
    } else {
      return {
        budget,
        risk,
        suggestion:
          "40% BTC, 30% ETH, 20% Stablecoin, 10% Gold-backed crypto"
      };
    }
  }

  if (risk === "Medium") {
    if (budget < 5000) {
      return {
        budget,
        risk,
        suggestion:
          "40% BTC, 30% ETH, 20% SOL, 10% MATIC"
      };
    } else if (budget < 20000) {
      return {
        budget,
        risk,
        suggestion:
          "35% BTC, 25% ETH, 20% SOL, 20% Altcoins"
      };
    } else {
      return {
        budget,
        risk,
        suggestion:
          "30% BTC, 25% ETH, 20% SOL, 15% MATIC, 10% AI Tokens"
      };
    }
  }

  if (budget < 5000) {
    return {
      budget,
      risk,
      suggestion:
        "30% BTC, 20% ETH, 30% SOL, 20% Meme Coins"
    };
  } else if (budget < 20000) {
    return {
      budget,
      risk,
      suggestion:
        "25% BTC, 20% ETH, 25% SOL, 15% Altcoins, 15% Meme Coins"
    };
  } else {
    return {
      budget,
      risk,
      suggestion:
        "20% BTC, 20% ETH, 20% SOL, 20% AI Tokens, 20% Growth Altcoins"
    };
  }
}