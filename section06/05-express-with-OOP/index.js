import express from "express";
import { CashService } from "./cash";
import { productService } from "./product";

const app = express();
const port = 3000;

// 상품 구매하기 API
app.post("/products/buy", (req, res) => {
	// 1. 가진 돈 검증하는 코드
	const cashService = new CashService();
	const hasMoney = cashService.checkValue();

	// 2. 판매 여부를 검증하는 코드
	const productService = new productService();
	const isSoldout = productService.checkSoldout();

	// 3. 상품 구매하는 코드
	if (hasMoney && !isSoldout) {
		res.send("상품 구매 완료!");
	}
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
	// 1. 판매 여부를 검증하는 코드
	const productService = new productService();
	const isSoldout = productService.checkSoldout();

	// 2. 상품 환불하는 코드
	if (isSoldout) {
		res.send("상품 환불 완료!");
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
