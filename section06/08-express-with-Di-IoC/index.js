import express from "express";

import {
	ProductController,
	ProductController,
} from "./mvc/controllers/product.controller";

import { CouponController } from "./mvc/controllers/coupon.controller";
import { ProductService } from "./mvc/controllers/services/product.service";
import { CashService } from "./mvc/controllers/services/cash.service";
import { PointService } from "./mvc/controllers/services/point.service";

const app = express();
const port = 3000;

// 의존성 주입
const productService = new ProductService();
const cashService = new CashService();
const pointService = new PointService();

// 의존성 주입으로 인한 장점
// 1. new 한 번으로 모든 곳에서 재사용. 효율적.(싱글톤 패턴)
// 2. 의존성 주입으로 한꺼번에 변경 가능.
// 3. 의존성 주입으로 service 기능을 손쉽고, 안전하게 변경 가능

// [부가설명]
// 1. ProductController가 CashService에 의존하고 있음  => 이 상황을 강하게 결합되어 있다라고 표현(tight-coupling).
// 2. 이를 개선하기 위해서 "느슨한 결합"으로 변경할 필요가 있음.(loose-coupling) => 이를 의존성 주입으로 해결.(의존성 주입: Dependency-Injection. DI).
// DI를 대신 해주는 Nestjs 기능: IoC 컨테이너 (알아서 new 해서 넣어줌. 즉, DI를 간편하게 해줌). => IoC: Inversion-Of-Control
// 3. 의존성 주입으로 싱글톤패턴 구현 가능. => 의존성주입이면, 싱글톤패턴인가? 그건 아님!. 상황에 따라 싱글톤패턴을 사용하지 않을 수도 있음.

// 상품API
const productController = new ProductController(productService, cashService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 상품권을 돈주고 구매하는 API

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
