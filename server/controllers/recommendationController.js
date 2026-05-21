import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRecommendation } from "../recommendationEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyFile = path.join(__dirname, "..", "history.json");

export const recommendCrypto = (req, res) => {
  const { budget, risk } = req.body;

  if (!budget || !risk) {
    return res.status(400).json({
      message: "Budget and risk are required"
    });
  }

  const recommendation = getRecommendation(budget, risk);

  res.json(recommendation);
};

export const saveRecommendation = (req, res) => {
  const { wallet, budget, risk, suggestion } = req.body;

  console.log("SAVE REQUEST:", req.body);

  if (!wallet || !budget || !risk || !suggestion) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  let history = [];

  if (fs.existsSync(historyFile)) {
    const fileData = fs.readFileSync(historyFile, "utf8");

    if (fileData.trim()) {
      history = JSON.parse(fileData);
    }
  }

  const newEntry = {
    wallet,
    budget,
    risk,
    suggestion,
    date: new Date().toLocaleString()
  };

  history.push(newEntry);

  fs.writeFileSync(
    historyFile,
    JSON.stringify(history, null, 2)
  );

  res.json({
    message: "Recommendation saved successfully"
  });
};

export const getHistory = (req, res) => {
  const { wallet } = req.params;

  if (!fs.existsSync(historyFile)) {
    return res.json([]);
  }

  const fileData = fs.readFileSync(historyFile, "utf8");

  if (!fileData.trim()) {
    return res.json([]);
  }

  const history = JSON.parse(fileData);

  const userHistory = history.filter(
    (item) =>
      item.wallet.toLowerCase() === wallet.toLowerCase()
  );

  res.json(userHistory);
};