import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from 'appConstants';
import { Discover, Home, ProfileEdit, ProfilePage } from 'pages';

const Routes = () => (
  <Switch>
    <Route exact path={routes.discover.root} component={Discover} />
    <Route exact path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.profile.root} component={ProfilePage} />
    <Route exact path={routes.home.root} component={Home} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
