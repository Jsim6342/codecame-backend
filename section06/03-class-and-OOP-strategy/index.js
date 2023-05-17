// 전략패턴

class 공중부품 {
	run = () => {
		console.log("날아서 도망가자!");
	};
}

class 지상부품 {
	run = () => {
		console.log("뛰어서 도망가자!");
	};
}

class Monster {
	// 멤버 변수
	power = 10;
	부품;

	// 생성자
	constructor(부품) {
		this.부품 = 부품;
	}

	// 함수
	attack = () => {
		console.log("공격하자!");
		console.log(`내 공격력은 ${this.power}이야`);
	};

	run = () => {
		this.부품.run();
	};
}

const myMonster1 = new Monster(new 공중부품());
myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(new 지상부품());
myMonster2.attack();
myMonster2.run();
