export const routes = {
  home: {
    root: '/',
  },
  discover: {
    root: '/discover',
  },
  create:{
    root:'/create',
    single:'/create/single',
    multiple:'/create/multiple',
  },
  profile: {
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
};
