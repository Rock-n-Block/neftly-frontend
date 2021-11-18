import { Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { routes } from 'appConstants';
import { GuardedRoute } from 'components';
import { useMst } from 'store';
import {
  Discover,
  ProfileEdit,
  Profile,
  Activity,
  UploadVariants,
  CreateToken,
  CollectionPage,
  Home,
  Nft,
  LostPage404,
} from 'pages';

const Routes = observer(() => {
  const { user } = useMst();

  return (
    <Switch>
      <Route path={routes.nft.root} component={Nft} />
      <Route path={routes.discover.root} component={Discover} />
      <Route exact path={routes.profile.edit} component={ProfileEdit} />
      <Route path={routes.profile.root} component={Profile} />

      <Route exact path={routes.home.root} component={Home} />
      <Route exact path={routes.activity.root} component={Activity} />
      <Route path={routes.collection.root} component={CollectionPage} />
      <Route path={routes.lostPage.root} component={LostPage404} />
      {/* GUARDED ROUTES */}
      <GuardedRoute auth={user.isAuth} path={routes.create.single} component={CreateToken} />
      <GuardedRoute
        auth={user.isAuth}
        path={routes.create.multiple}
        render={() => <CreateToken isMultiple />}
      />
      <GuardedRoute auth={user.isAuth} path={routes.create.root} component={UploadVariants} />
      {/* GUARDED ROUTES */}
      <Redirect to={{ pathname: routes.lostPage.root }} />
    </Switch>
  );
});

export default Routes;
