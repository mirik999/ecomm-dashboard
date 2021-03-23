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
  const { authCredentials, user } = useSelector((state: RootState) => state);
  const hasAccess = rest.accessRoles.some((er: string) => user.roles.includes(er));

  if (!hasAccess) {
    return <Redirect to="/404" />;
  }

  if (rest.computedMatch.url === '/') {
    return <Redirect to="/main" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authCredentials.accessToken ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default WithToken;
