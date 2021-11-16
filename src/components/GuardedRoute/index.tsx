import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface IProps {
  path: string;
  auth: boolean;
  component?: FC<{}>;
  exact?: boolean;
  render?: FC<{}>;
}

const GuardedRoute: FC<IProps> = ({ component, auth, path, exact, render }) => {
  return auth ? (
    <Route path={path} exact={exact} component={component || render} />
  ) : (
    <Redirect to="/" />
  );
};

export default GuardedRoute;
