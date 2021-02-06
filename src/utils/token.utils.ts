import jwt_decode from "jwt-decode";
//store
import store from '../redux/store';

export const checkTokenExp = () => {
  const token = store.getState().token;
  return token && jwt_decode<any>(token).exp < Date.now() / 1000
}
