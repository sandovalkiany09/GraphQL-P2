const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Playlist {
    id: ID!
    nombre: String!
    cantidadVideos: Int!
  }
  type Query {
    playlistsPorPerfil(perfilId: ID!): [Playlist!]!
  }

  type Playlist {
    id: ID!
    nombre: String!
    usuarioId: ID!
    perfilesAsociados: [ID!]!
    cantidadVideos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    playlists(usuarioId: ID!): [Playlist!]!
  }

  type Video {
    id: ID!
    nombre: String!
    url: String!
    descripcion: String
    playlistId: ID!
    listaNombre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    videosPorPlaylist(playlistId: ID!): [Video!]!
    videos(playlistId: ID!): [Video!]!
    perfiles(usuarioId: ID!): [Perfil!]!
    buscarVideosPorPerfil(perfilId: ID!, query: String!): [Video]
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
