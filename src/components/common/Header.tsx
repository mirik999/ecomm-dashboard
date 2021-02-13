import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from "@apollo/client";
//types
import { RootState } from "../../redux/store";
//actions
import { removeToken } from '../../redux/slices/auth-credentials.slice';
import { removeUser } from '../../redux/slices/user.slice';
//request
import { LOGOUT_USER } from "../../redux/requests/user.request";

type Props = {};

const Header: React.FC<Props> = memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, authCredentials } = useSelector((state: RootState) => state);
  const [Logout, logoutResponse] = useLazyQuery(LOGOUT_USER);

  async function _onLogout(): Promise<void> {
    try {
      await Logout({
        variables: {
          clientId: authCredentials.clientId
        }
      });
      dispatch(removeToken())
      dispatch(removeUser())
    } catch(err) {
      console.log('Logout error => ', err.message)
    }
  }

  const path = history.location.pathname;

  return (
    <div
      className="h-20 px-9 py-2.5 bg-gray-200 border-b-4 border-gray-300 flex
      justify-between items-center"
    >
      <div>
        <span className="font-medium">path: {path}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium">{user.email}</span>
        <MdExitToApp
          size={32}
          color="black"
          className="ml-2 cursor-pointer transition-all hover:opacity-40"
          onClick={_onLogout}
        />
      </div>
    </div>
  );
}, () => {
  return true;
});

Header.defaultProps = {};

export default Header;
