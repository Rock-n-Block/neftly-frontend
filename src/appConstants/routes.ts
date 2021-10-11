export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
  },
  nft: {
    root: '/nft/:id',
    link: '/nft',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
  },
  profile: {
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
  activity: {
    root: '/activity',
  },
  collection: {
    root: '/collection/:collectionId'
  }
};
