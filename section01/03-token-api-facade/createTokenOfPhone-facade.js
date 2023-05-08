// 휴대폰 인증 로직

function checkPhoneNumber(phoneNumber) {
	if (phoneNumber.length < 10 || phoneNumber.length > 11) {
		console.log("휴대폰 번호를 제대로 입력해주세요.");
		return false;
	}
	return true;
}

function getToken() {
	return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

function sendTokenToSMS(phoneNumber, token) {
	console.log(`${phoneNumber} 번호로 인증번호 ${token}를 전송합니다.`);
}

function createTokenOfPhone(phoneNumber) {
	// 1. 휴대폰번호 자릿수 확인(!0~11자리)
	const isValid = checkPhoneNumber(phoneNumber);
	if (isValid === false) return;

	// 2. 휴대폰 토큰 6자리 생성
	const token = getToken();

	// 3. 핸드폰 번호에 토큰 전송하기
	sendTokenToSMS(phoneNumber, token);
}

createTokenOfPhone("01012345678");
