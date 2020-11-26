export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    endpoints: {
      getAlbums: '/albums',
      deleteAlbum: '/albums/:id',
      postAlbum: '/albums',
      putAlbum: '/albums/:id'
    }
  }
};
