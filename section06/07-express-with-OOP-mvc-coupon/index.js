import express from "express";

import {
	ProductController,
	ProductController,
} from "./mvc/controllers/product.controller";

import { CouponController } from "./mvc/controllers/coupon.controller";

const app = express();
const port = 3000;

// 상품API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

// 쿠폰(상품권) API
app.post("/coupons/buy");

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
