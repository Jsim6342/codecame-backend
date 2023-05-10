export function checkPhoneNumber(phoneNumber) {
	if (phoneNumber.length < 10 || phoneNumber.length > 11) {
		console.log("휴대폰 번호를 제대로 입력해주세요.");
		return false;
	}
	return true;
}

export function getToken() {
	return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

export function sendTokenToSMS(phoneNumber, token) {
	console.log(`${phoneNumber} 번호로 인증번호 ${token}를 전송합니다.`);
}
