// 구조분해할당

function test({ apple, banana }) {
	console.log(apple);
	console.log(banana);
}

const basket = {
	apple: 3,
	banana: 10,
};

test(basket);
