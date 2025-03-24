import express from "express";

import { claimCoupon, getAllClaims } from "../controllers/claim.controller.js";

const router = express.Router();

router.post("/", claimCoupon);
router.get("/all", getAllClaims);

export default router;
