import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
//reducers
import themeSlice from './slices/theme.slice';
import navSlice from './slices/nav.slice';
import rolesSlice from './slices/roles.slice';
import userSlice from './slices/user.slice';
import authCredentialsSlice from './slices/auth-credentials.slice';
import netStatusSlice from './slices/net-status.slice';

const rootReducer = combineReducers({
  theme: themeSlice,
  nav: navSlice,
  roles: rolesSlice,
  user: userSlice,
  authCredentials: authCredentialsSlice,
  netStatus: netStatusSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
