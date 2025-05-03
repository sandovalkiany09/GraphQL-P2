const Playlist = require('./models/playlistModel');
const Perfil = require('./models/perfilModel');
const Video = require('./models/videoModel');

const resolvers = {
  Query: {
    playlistsPorPerfil: async (_, { perfilId }) => {
      const playlists = await Playlist.find({ perfilesAsociados: perfilId });
      return Promise.all(playlists.map(async (p) => {
        const cantidadVideos = await Video.countDocuments({ playlistId: p._id });
        return {
          id: p._id.toString(),
          nombre: p.nombre,
          cantidadVideos
        };
      }));
    },
    playlists: async (_, { usuarioId }) => {
      try {
        const playlists = await Playlist.find({ usuarioId });

        // Para cada playlist, contar sus videos
        const conConteo = await Promise.all(
          playlists.map(async (pl) => {
            const cantidad = await Video.countDocuments({ playlistId: pl._id });
            return {
              id: pl._id.toString(),
              nombre: pl.nombre,
              usuarioId: pl.usuarioId.toString(),
              perfilesAsociados: pl.perfilesAsociados.map(p => p.toString()),
              cantidadVideos: cantidad
            };
          })
        );

        return conConteo;
      } catch (error) {
        throw new Error("Error al obtener las playlists");
      }
    },
    perfiles: async (_, { usuarioId }) => {
      try {
        const perfiles = await Perfil.find({ usuarioId });
        return perfiles;
      } catch (error) {
        throw new Error('Error al obtener los perfiles');
      }
    },
    videosPorPlaylist: async (_, { playlistId }) => {
      return await Video.find({ playlistId });
    },
    videos: async (_, { playlistId }) => {
      try {
        return await Video.find({ playlistId });
      } catch (error) {
        throw new Error('Error al obtener los videos');
      }
    },
    async buscarVideosPorPerfil(_, { perfilId, query }) {
      try {
        // 1. Buscar playlists donde el perfil esté asociado
        const playlists = await Playlist.find({
          perfilesAsociados: perfilId
        });
    
        const playlistIds = playlists.map(p => p._id);
    
        // 2. Buscar videos que estén en esas playlists y coincidan con el nombre
        const videos = await Video.find({
          playlistId: { $in: playlistIds },
          nombre: { $regex: query, $options: 'i' }
        });
    
        // 3. Mapear y agregar nombre de la lista a cada video
        return videos.map(video => {
          const playlist = playlists.find(p => p._id.toString() === video.playlistId.toString());
          return {
            id: video._id.toString(), // Asegúrate de incluir el id explícitamente
            nombre: video.nombre,
            url: video.url,
            descripcion: video.descripcion,
            playlistId: video.playlistId,
            createdAt: video.createdAt,
            updatedAt: video.updatedAt,
            listaNombre: playlist ? playlist.nombre : 'Desconocida'
          };
        });
      } catch (error) {
        console.error('Error al buscar videos por perfil:', error);
        throw new Error('No se pudo buscar videos');
      }
    },    
  },
};

module.exports = resolvers;
