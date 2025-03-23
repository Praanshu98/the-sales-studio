import express from "express";

import couponRoute from "./routes/coupon.route.js";
import claimRoute from "./routes/claim.route.js";

const app = express();

app.use(express.json());

app.use("/api/v1/coupon", couponRoute);
app.use("/api/v1/claim", claimRoute);

export default app;
