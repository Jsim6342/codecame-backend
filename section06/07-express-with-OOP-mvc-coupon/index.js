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
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 상품권을 돈주고 구매하는 API

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
