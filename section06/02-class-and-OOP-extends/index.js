// date 내장 객체 호출 사용
const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth() + 1);

// Monster 객체 만들어 사용
class Monster {
	// 멤버 변수
	power = 10;

	// 생성자
	constructor(power) {
		this.power = power;
	}

	// 함수
	attack = () => {
		console.log("공격하자!");
		console.log(`내 공격력은 ${this.power}이야`);
	};

	run = () => {
		console.log("도망가자!");
	};
}

// Monster 상속
class 공중몬스터 extends Monster {
	constructor(power) {
		super(power); // 부모 class constructor로 전달
	}

	// 오버라이딩(부모의 run을 덮어쓰기)
	run = () => {
		console.log("날아서 도망가자!");
	};
}

class 지상몬스터 extends Monster {
	constructor(power) {
		super(power + 5); // 부모 class constructor로 전달
	}

	// 오버라이딩(부모의 run을 덮어쓰기)
	run = () => {
		console.log("뛰어서 도망가자!");
	};
}

const myMonster1 = new 공중몬스터(20);
myMonster1.attack();
myMonster1.run();

const myMonster2 = new 지상몬스터(30);
myMonster2.attack();
myMonster2.run();
