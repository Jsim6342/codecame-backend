import { CashService } from "./services/cash.service";

export class CouponController {
	buyCoupon = (req, res) => {
		// 1. 가진돈 검증하는 코드 (대략 10줄)
		const cashService = new CashService();
		const hasMoney = cashService.checkValue();

		// 2. 상품권 구매하는 코드
		if (hasMoney) {
			res.send("상품권 구매 완료!!");
		}
	};
}
