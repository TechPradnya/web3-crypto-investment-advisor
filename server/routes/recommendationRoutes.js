import express from "express";
import {
  recommendCrypto,
  saveRecommendation,
  getHistory
} from "../controllers/recommendationController.js";

const router = express.Router();

router.post("/recommend", recommendCrypto);
router.post("/save", saveRecommendation);
router.get("/history/:wallet", getHistory);

export default router;