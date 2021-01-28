import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';

type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { token, user, nav } = useSelector((state: RootState) => state);

  const findNav = nav.find(n => n.path === rest.path)!;
  if (Object.keys(findNav).length) {
    const noAccess = findNav.accessRoles.some((acr: string) => {
      return user.roles.length ? user.roles.includes(acr) : "guest"
    });
    if (!noAccess && token) {
      return <Redirect to="/404" />
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> :
        <Redirect to="/auth" />)}
    />
  );
};

export default WithToken;
