const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Video {
    id: ID!
    nombre: String!
    url: String!
    descripcion: String
    playlistId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    videos(playlistId: ID!): [Video!]!
    perfiles(usuarioId: ID!): [Perfil!]!
  }

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
