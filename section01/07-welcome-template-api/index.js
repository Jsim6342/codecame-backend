function crateUser({ name, age, school, email, createdAt }) {
	// 1. 이메일 체크(존재 여부, "@" 포함 여부)
	// 2. 가입환영 템플릿 만들기
	// 3. 이메일에 가입환영 템플릿 전송하기
}

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = "2021-10-05";
createUser({ name, age, school, email, createdAt });
