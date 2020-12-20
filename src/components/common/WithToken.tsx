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
  const { user } = useSelector((state: RootState) => state);

  return (
    <Route
      {...rest}
      render={(props) => (user.id ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );
};

export default WithToken;
