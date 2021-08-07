import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';
//utils
import { getFromCookies } from '../../utils/storage.utils';

type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authCredentials, user } = useSelector((state: RootState) => state);
  const isLoggedIn = getFromCookies('authCredentials');

  if (!user.id && !isLoggedIn) {
    return <Redirect to="/auth" />;
  }

  if (!user.id && isLoggedIn) {
    return null;
  }

  const hasAccess = rest.accessRoles.some((er: string) =>
    user.roles.includes(er),
  );

  if (authCredentials.accessToken && !hasAccess) {
    return <Redirect to="/permission-denied" />;
  }

  if (rest.computedMatch.url === '/') {
    return <Redirect to="/articles" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authCredentials.accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default WithToken;
