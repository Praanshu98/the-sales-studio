import express from "express";

import couponRoute from "./routes/coupon.route.js";

const app = express();

app.use("/api/v1/coupon", couponRoute);

export default app;
