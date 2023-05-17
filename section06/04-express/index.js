import express from "express";

const app = express();
const port = 3000;

// 상품 구매하기 API
app.post("/products/buy", (req, res) => {
	// 1. 가진 돈 검증하는 코드
	// ..
	// 2. 판매 여부를 검증하는 코드
	// ..
	// 3. 상품 구매하는 코드
	// if(돈 있음 && !판매완료) {
	//   res.send("상품 구매 완료!");
	// }
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
	// 1. 판매 여부를 검증하는 코드
	// ..
	// 2. 상품 환불하는 코드
	// if(판매완료) {
	//   res.send("상품 환불 완료!");
	// }
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
