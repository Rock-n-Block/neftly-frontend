import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from 'appConstants';
import { DetailArtwork, DetailAuction, Discover, Home, ProfileEdit } from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.gallery.detailArtwork.root} component={DetailArtwork} />
    <Route path={routes.gallery.detailAuction.root} component={DetailAuction} />
    <Route path={routes.discover.root} component={Discover} />
    <Route path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.home.root} component={Home} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
