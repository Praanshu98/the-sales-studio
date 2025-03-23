import express from "express";

import {
  generateCoupon,
  deleteCoupon,
  activateCoupon,
  deactivateCoupon,
  getCoupon,
  getAllCoupons,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/generate", generateCoupon);
router.get("/all", getAllCoupons);
router.get("/:id", getCoupon);
router.delete("/:id", deleteCoupon);
router.put("/activate/:id", activateCoupon);
router.put("/deactivate/:id", deactivateCoupon);

export default router;
