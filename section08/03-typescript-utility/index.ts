interface IProfile {
	name: string;
	age: number;
	school: string;
	hobby?: string;
}

// 1. Partial 타입
// 모든 속성을 선택사항으로 바꿔주는 역할을 합니다.
type aaa = Partial<IProfile>;

// 2. Required 타입
// 모든 속성을 필수사항으로 바꿔주는 역할을 합니다. ( Partial Type과 반대 )
type bbb = Required<IProfile>;

// 3. Pick 타입
// 원하는 속성만을 뽑아서 사용하고 싶을 때 사용합니다.
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
// 원하는 속성만 제거하여 사용하고 싶을 때 사용합니다.
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
// Utility Type 속성을 다른 Type으로 매핑 시키고자 할 때 사용합니다.
// `Record<Key, Type>`으로 사용하며, Key로 들어온 타입을 Type 값을 가지는 타입으로 만들 수 있습니다.
type eee = "철수" | "영희" | "훈이"; // Union 타입
type fff = Record<eee, IProfile>; // Record 타입

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";

// 7. type vs interface 차이
// interface는 같은 변수명으로 정의 시 기존 내용에 추가됨.
// type은 같은 변수명으로 정의 시 새로운 내용으로 덮어짐.
interface IProfile {
	candy: number;
}

// 배운 내용 응용(Partial 사용)
let profile: Partial<IProfile> = {
	candy: 10,
};
