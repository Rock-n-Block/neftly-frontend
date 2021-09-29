import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from 'appConstants';
import { Discover, Home, ProfileEdit } from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.discover.root} component={Discover} />
    <Route path={routes.profile.edit} component={ProfileEdit} />
    <Route path={routes.home.root} component={Home} />
    <Redirect to={{ pathname: routes.home.root }} />
  </Switch>
);

export default Routes;
