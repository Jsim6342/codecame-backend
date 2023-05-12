import express from "express";
import {
	checkEmail,
	getWelcomeTemplate,
	sendTemplateToEmail,
} from "./email.js";
import "dotenv/config";

const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
	const { name, age, school, email } = req.body;

	// 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
	const isValid = checkEmail(email);
	if (isValid === false) return;

	// 2. 가입환영 템플릿 만들기
	const myTemplate = getWelcomeTemplate({ name, age, school });

	// 3. 이메일에 가입환영 템플릿 전송하기
	sendTemplateToEmail(email, myTemplate);
	res.send("가입완료!!!");
});

app.listen(3000, () => {
	console.log("백엔드 API 서버가 켜졌어요!!!");
});
