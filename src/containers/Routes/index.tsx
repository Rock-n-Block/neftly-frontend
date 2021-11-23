import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from 'appConstants';
import { GuardedRoute } from 'components';
import { observer } from 'mobx-react-lite';
import {
  Activity,
  CollectionPage,
  ComingSoon,
  ConnectWallet,
  CreateToken,
  Discover,
  Home,
  LostPage404,
  Nft,
  Profile,
  ProfileEdit,
  UploadVariants,
} from 'pages';
import { useMst } from 'store';

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
      <Route path={routes.connectWallet.root} component={ConnectWallet} />
      <Route path={routes.lostPage.root} component={LostPage404} />
      <Route path={routes.comingSoon.root} component={ComingSoon} />
      {/* GUARDED ROUTES */}
      <GuardedRoute auth={user.isAuth} path={routes.create.single} component={CreateToken} />
      <GuardedRoute
        auth={user.isAuth}
        path={routes.create.multiple}
        render={() => <CreateToken isMultiple />}
      />
      <GuardedRoute auth={!!user.address} path={routes.create.root} component={UploadVariants} />
      {/* GUARDED ROUTES */}
      <Redirect to={{ pathname: routes.lostPage.root }} />
    </Switch>
  );
});

export default Routes;
