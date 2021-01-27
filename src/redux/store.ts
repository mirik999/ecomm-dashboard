import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
//reducers
import navSlice from './slices/nav.slice';
import rolesSlice from './slices/roles.slice';
import userSlice from './slices/user.slice';
import tokenSlice from './slices/token.slice';

const rootReducer = combineReducers({
  nav: navSlice,
  roles: rolesSlice,
  user: userSlice,
  token: tokenSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
