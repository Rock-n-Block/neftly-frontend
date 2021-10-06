export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
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
  activity: {
    root: '/activity',
  },
};
