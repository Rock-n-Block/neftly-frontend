import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'appConstants';
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
} from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.nft.root} component={Nft} />
    <Route path={routes.discover.root} component={Discover} />
    <Route exact path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.profile.root} component={Profile} />
    <Route path={routes.create.single}>
      <CreateToken />
    </Route>
    <Route path={routes.create.multiple}>
      <CreateToken isMultiple />
    </Route>
    <Route path={routes.create.root} component={UploadVariants} />
    <Route exact path={routes.home.root} component={Home} />
    <Route exact path={routes.activity.root} component={Activity} />
    <Route path={routes.collection.root} component={CollectionPage} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
