import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'appConstants';
import {
  DetailArtwork,
  DetailAuction,
  Discover,
  Home,
  ProfileEdit,
  ProfilePage,
  Activity,
  UploadVariants,
  CreateToken,
} from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.gallery.detailArtwork.root} component={DetailArtwork} />
    <Route path={routes.gallery.detailAuction.root} component={DetailAuction} />
    <Route exact path={routes.discover.root} component={Discover} />
    <Route exact path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.profile.root} component={ProfilePage} />
    <Route path={routes.create.single}>
      <CreateToken />
    </Route>
    <Route path={routes.create.multiple}>
      <CreateToken isMultiple />
    </Route>
    <Route path={routes.create.root} component={UploadVariants} />
    <Route exact path={routes.home.root} component={Home} />
    <Route exact path={routes.activity.root} component={Activity} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
