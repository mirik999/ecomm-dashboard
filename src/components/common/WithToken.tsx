import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';
//utils
import { checkTokenExp } from "../../utils/token.utils";


type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { token, user, nav } = useSelector((state: RootState) => state);

  const isTokenExpired = checkTokenExp();
  if (rest.path !== "/" && isTokenExpired) {
    return <Redirect to="/" />
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
