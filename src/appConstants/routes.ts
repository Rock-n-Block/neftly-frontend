export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
  },
  gallery: {
    detailArtwork: {
      root: '/gallery/detailed-artwork/:id',
      link: '/gallery/detailed-artwork',
    },
  },
  profile: {
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
};
