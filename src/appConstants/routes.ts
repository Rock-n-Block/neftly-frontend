export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
  },
  gallery: {
    detailArtwork: {
      root: '/gallery/artwork/:id',
      link: '/gallery/artwork',
    },
    detailAuction: {
      root: '/gallery/auction/:id',
      link: '/gallery/auction',
    },
  },
  profile: {
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
};
