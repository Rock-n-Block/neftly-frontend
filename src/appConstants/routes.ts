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
  collection: {
    root: '/collection/:collectionId',
    link: '/collection',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
  },
  profile: {
    link: (id: string | number): string => `/profile/${id}`,
    root: '/profile/:userId',
    link: '/profile',
    edit: '/profile/edit',
  },
  activity: {
    root: '/activity',
  },
};
