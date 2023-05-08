// shorthand property

function test(ob) {
	console.log(ob);
	console.log(ob.name);
	console.log(ob.age);
	console.log(ob.school);
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";

// const profile = {
//     name: name,
//     age: age,
//     school: school
// }

const profile = { name, age, school };

test(profile); // 1. 변수에 담아서 보내기
test({ name, age, school }); // 2. 그냥 통째로 보내기
