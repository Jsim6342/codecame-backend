import { ApolloServer } from "@apollo/server"; // express 서버 역할
import { startStandaloneServer } from "@apollo/server/standalone"; // listen 역할

const typeDefs = `#graphql
    type Query {
        test: String
    }
`;

const resolvers = {
	Query: {
		test: () => {
			return "응답입니다!";
		},
	},
};

// graphql은 swagger와 api를 함께 만들어야 한다.
const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
});

startStandaloneServer(server); // 4000
