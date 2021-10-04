import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'appConstants';
import { DetailArtwork, Discover, Home, ProfileEdit, ProfilePage, Activity } from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.nft.root} component={DetailArtwork} />
    <Route exact path={routes.discover.root} component={Discover} />
    <Route exact path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.profile.root} component={ProfilePage} />
    <Route exact path={routes.home.root} component={Home} />
    <Route exact path={routes.activity.root} component={Activity} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
