const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

async function startGraphQLServer(app) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`GraphQL listo en /graphql`);
}

module.exports = startGraphQLServer;
