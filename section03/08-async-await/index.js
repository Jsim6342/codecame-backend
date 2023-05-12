import axios from "axios";

// 1. 비동기방식
const fetchAsync = () => {
	const result = axios.get("https://koreanjson.com/posts/1");
	console.log("비동기방식: ", result); // Promise { <pending> } 으로 출력
};

fetchAsync();

// 2. 동기방식
// =>   함수 중복 선언 문제를 피하자!!! (화살표 함수로 변경)
const fetchSync = async () => {
	const result = await axios.get("https://koreanjson.com/posts/1");
	console.log("동기방식: ", result); // 제대로된 결과 출력 => { title: "....." }
	console.log("동기방식: ", result.data.title);
};

fetchSync();
