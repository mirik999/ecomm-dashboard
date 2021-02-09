import jwt_decode from "jwt-decode";
//store
import store from '../redux/store';

export const checkTokenExp = () => {
  const accessToken = store.getState().authCredentials.accessToken;
  return accessToken && jwt_decode<any>(accessToken).exp < Date.now() / 1000
}
