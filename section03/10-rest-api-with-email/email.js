import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(email) {
	if (email === undefined || email === "" || email.includes("@") === false) {
		console.log("에러가 발생했습니다. 이메일을 확인해주세요.");
		return false;
	}
	return true;
}

export function getWelcomeTemplate({ name, age, school }) {
	const template = `
        <html>
            <body>
                <h1> ${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름: ${name} </div>
                <div>나이: ${age} </div>
                <div>학교: ${school} </div>
                <div>가입일: ${getToday()} </div>
            </body>
        </html>
    `;

	return template;
}

// export function sendTemplateToEmail({ email, template }) {
// 	console.log(`${email} 이메일로 ${template} 템플릿을 보냅니다.`);
// }

export async function sendTemplateToEmail(myemail, mytemplate) {
	const EMAIL_USER = process.env.EMAIL_USER; // 내 이메일
	const EMAIL_PASS = process.env.EMAIL_PASS; // 내 이메일의 앱 비밀번호
	const EMAIL_SENDER = process.env.EMAIL_SENDER; // 받는 이 이메일

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS,
		},
	});

	const result = await transporter.sendMail({
		from: EMAIL_SENDER,
		to: myemail,
		subject: "[테스트] 가입을 축하합니다!!!",
		html: mytemplate,
	});
	console.log(result);

	// console.log(myemail + "이메일로 가입환영템플릿 " + mytemplate + "를 전송합니다.")
}
