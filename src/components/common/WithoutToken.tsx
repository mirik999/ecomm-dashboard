import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//types
import { RootState } from '../../redux/store';

type Props = {
  component: React.FunctionComponent<any>;
  [key: string]: any;
};

const WithoutToken: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state: RootState) => state);

  return (
    <Route
      {...rest}
      render={(props) => (!token ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default WithoutToken;
