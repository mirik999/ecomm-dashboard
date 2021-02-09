import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';
//utils
import { checkTokenExp } from "../../utils/token.utils";
import { removeFromCookies } from "../../utils/storage.utils";


type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authCredentials, user, nav } = useSelector((state: RootState) => state);

  const isTokenExpired = checkTokenExp();
  if (rest.path !== "/" && isTokenExpired) {
    removeFromCookies('authCredentials');
    return <Redirect to="/auth" />
  }

  const findNav = nav.find(n => {
    if (n.path === rest.path) {
      return n;
    }
    if (n.subPaths) {
      const checkSubPath = n.subPaths.some(p => rest.path.includes(p))
      if (checkSubPath) {
        return n;
      }
    }
    return n;
  })!;

  if (Object.keys(findNav).length) {
    const noAccess = findNav.accessRoles.some((acr: string) => {
      return user.roles.length ? user.roles.includes(acr) : "guest"
    });
    if (!noAccess && authCredentials.accessToken) {
      return <Redirect to="/404" />
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => (authCredentials.accessToken ? <Component {...props} /> :
        <Redirect to="/auth" />)}
    />
  );
};

export default WithToken;
