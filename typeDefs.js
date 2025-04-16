const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Perfil {
  id: ID!
  nombre: String!
  pin: String!
  imagen: String!
  usuarioId: ID!
  createdAt: String!
  updatedAt: String!
  }

  type Query {
  perfiles(usuarioId: ID!): [Perfil!]!
  }
`;

module.exports = typeDefs;
