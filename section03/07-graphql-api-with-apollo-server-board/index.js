import { ApolloServer } from "@apollo/server"; // express 서버 역할
import { startStandaloneServer } from "@apollo/server/standalone"; // listen 역할

const typeDefs = `#graphql

	# type 정의(input type은 input으로 명시)
	type MyResult {
		number: Int
		writer: String
		title: String
		contents: String
	}

	input MyInput {
		writer: String
		title: String
		contents: String
	}

	# Query, Mutation 정의
    type Query {
        fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미
    }

	type Mutation {
		createBoard(createBoardInput: MyInput!): String
	}
`;

const resolvers = {
	Query: {
		fetchBoards: (parent, args, context, info) => {
			// 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
			const result = [
				{
					number: 1,
					writer: "철수",
					title: "제목입니다~~",
					contents: "내용이에요@@@",
				},
				{
					number: 2,
					writer: "영희",
					title: "영희 제목입니다~~",
					contents: "영희 내용이에요@@@",
				},
				{
					number: 3,
					writer: "훈이",
					title: "훈이 제목입니다~~",
					contents: "훈이 내용이에요@@@",
				},
			];

			// 2. 꺼내온 결과 응답 주기
			return result;
		},
	},

	Mutation: {
		createBoard: (_, args) => {
			// 1. 브라우저에서 보내준 데이터 확인하기
			console.log(args);
			console.log("=========================");
			console.log(args.createBoardInput.writer);
			console.log(args.createBoardInput.title);
			console.log(args.createBoardInput.contents);

			// 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

			// 3. DB에 저장된 결과를 브라우저 응답(response) 추가
			return "게시물 등록에 성공하였습니다.";
		},
	},
};

// graphql은 swagger와 api를 함께 만들어야 한다.
const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	cors: true, // 모든 사이트 허용하고 싶을 때
	// cors: { origin: ["https://naver.com", "https://daum.net"] } // 특정 사이트만 지정하고 싶을 때
});

startStandaloneServer(server); // 4000
