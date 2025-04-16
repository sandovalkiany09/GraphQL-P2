const Usuario = require('../server/models/usuariosModel');
const Perfil = require('../server/models/perfilModel');

const resolvers = {
  Query: {
    perfiles: async (_, { usuarioId }) => {
      try {
        const perfiles = await Perfil.find({ usuarioId });
        return perfiles;
      } catch (error) {
        throw new Error('Error al obtener los perfiles');
      }
    },
  },
};

module.exports = resolvers;
