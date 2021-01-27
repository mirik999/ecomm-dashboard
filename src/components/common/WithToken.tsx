import React, {useEffect, useState} from 'react';
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
    const noAccess = findNav.accessRoles.some((acr: string, i: number) => acr === user.roles[i]);
    if (!noAccess) {
      return <Redirect to="/no-access" />
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
