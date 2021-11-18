export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
    filter: (fileterValue: string): string => `/discover?filter=${fileterValue}`,
  },
  nft: {
    link: (id: string | number): string => `/nft/${id}`,
    root: '/nft/:id',
  },
  collection: {
    link: (id: string | number, tab?: 'sale' | 'collectibles'): string =>
      `/collection/${id}${tab ? `/?tab=${tab}` : ''}`,
    root: '/collection/:collectionId',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
  },
  profile: {
    link: (id: string | number, tab?: 'created' | 'owned' | 'favorited' | 'about'): string =>
      `/profile/${id}${tab ? `/?tab=${tab}` : ''}`,
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
  activity: {
    root: '/activity',
  },
  connectWallet: {
    root: '/connect',
  },
};
