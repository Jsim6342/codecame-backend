import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default; // SDK 가져오기

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

// export function sendTokenToSMS(phoneNumber, token) {
// 	console.log(`${phoneNumber} 번호로 인증번호 ${token}를 전송합니다.`);
// }

export async function sendTokenToSMS(phoneNumber, token) {
	const SMS_KEY = process.env.SMS_KEY;
	const SMS_SECRET = process.env.SMS_SECRET;
	const SMS_SENDER = process.env.SMS_SENDER;

	const mysms = coolsms.default;
	const messageService = new mysms(SMS_KEY, SMS_SECRET);
	const result = await messageService.sendOne({
		to: phoneNumber,
		from: SMS_SENDER,
		text: `[테스트] 안녕하세요?! 요청하신 인증번호는 [${token}] 입니다.`,
	});
	console.log(result);

	// console.log(myphone + '번호로 인증번호' + token + '를 전송합니다!!!');
}
