
function checkEmail(email) {
	if (email === undefined || email === "" || email.includes("@") === false) {
		console.log("에러가 발생했습니다. 이메일을 확인해주세요.");
		return false;
	}
	return true;
}


function getWelcomeTemplate({ name, age, school, createdAt }) {
	const template = `
        <html>
            <body>
                <h1> ${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름: ${name} </div>
                <div>나이: ${age} </div>
                <div>학교: ${school} </div>
                <div>가입일: ${createdAt} </div>
            </body>
        </html>
    `;

	return template;
}

function sendTemplateToEmail({email, template}) {
	console.log(`${email} 이메일로 ${template} 템플릿을 보냅니다.`);
}



function createUser({ name, age, school, email, createdAt }) {
	// 1. 이메일 체크(존재 여부, "@" 포함 여부)
	const isValid = checkEmail(email);
	if(isValid === false) return

	// 2. 가입환영 템플릿 만들기
	const template = getWelcomeTemplate({name, age, school, createdAt});

	// 3. 이메일에 가입환영 템플릿 전송하기
	sendTemplateToEmail({email, template});

}


const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = new Date();
createUser({ name, age, school, email, createdAt });

