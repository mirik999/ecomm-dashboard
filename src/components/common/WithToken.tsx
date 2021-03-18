import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';
import { isEmpty } from '../../utils/functions.utils';

type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authCredentials, user, nav } = useSelector(
    (state: RootState) => state,
  );

  console.log('xose', rest);

  // const currentNav = nav.find((n) => n.path === rest.path);
  //
  // if (isEmpty(currentNav)) {
  //   return <Redirect to="/404" />;
  // }
  //
  // const hasAccess = user.roles.some((acr) =>
  //   currentNav!.accessRoles.includes(acr),
  // );

  // if (!isEmpty(currentNav)) {
  //   console.log(user);
  //   console.log(currentNav[0]);
  //   const noAccess = currentNav[0].accessRoles.some((acr: string) => {
  //     return user.roles.length ? user.roles.includes(acr) : 'guest';
  //   });
  //   console.log('access', noAccess);
  //   if (!noAccess && authCredentials.accessToken) {
  //     return <Redirect to="/404" />;
  //   }
  // }

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
