require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const startGraphQLServer = async () => {
  const app = express();

  // Conectar a MongoDB (compartida con REST)
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("GraphQL conectado a la base de datos");

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.GRAPHQL_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startGraphQLServer();

