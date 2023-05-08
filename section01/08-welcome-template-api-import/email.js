import { getToday } from './utils.js';

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

export function sendTemplateToEmail({email, template}) {
	console.log(`${email} 이메일로 ${template} 템플릿을 보냅니다.`);
}

