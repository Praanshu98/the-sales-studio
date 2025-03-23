import express from "express";

import { claimCoupon } from "../controllers/claim.controller.js";

const router = express.Router();

router.post("/", claimCoupon);

export default router;
