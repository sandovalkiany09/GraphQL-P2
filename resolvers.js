const Perfil = require('./models/perfilModel');
const Video = require('./models/videoModel');

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
    videos: async (_, { playlistId }) => {
      try {
        return await Video.find({ playlistId });
      } catch (error) {
        throw new Error('Error al obtener los videos');
      }
    },
  },
};

module.exports = resolvers;
