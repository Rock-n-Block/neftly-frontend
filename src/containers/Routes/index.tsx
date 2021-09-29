import {Redirect, Route, Switch} from 'react-router-dom';
import {routes} from 'appConstants';
import {Discover, Home, ProfileEdit, UploadVariants, UploadDetailsSingle, UploadDetailsMultiple} from 'pages';

const Routes = () => (
  <Switch>
    <Route path={routes.discover.root} component={Discover}/>
    <Route path={routes.profile.edit} component={ProfileEdit}/>
    <Route path={routes.create.single} component={UploadDetailsSingle}/>
    <Route path={routes.create.multiple} component={UploadDetailsMultiple}/>
    <Route path={routes.create.root} component={UploadVariants}/>
    <Route path={routes.home.root} component={Home}/>
    <Redirect to={{pathname: routes.home.root}}/>
  </Switch>
);

export default Routes;
