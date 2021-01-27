import { createSlice } from '@reduxjs/toolkit';
//types
import { NavType } from '../types/nav.type';

const initialState: NavType[] = [
  {
    id: 1,
    name: 'Main',
    path: '/',
    accessRoles: ['guest', 'admin', 'sudo']
  },
  {
    id: 2,
    name: 'Categories',
    path: '/categories',
    accessRoles: ['admin', 'sudo']
  },
  {
    id: 3,
    name: 'Products',
    path: '/products',
    accessRoles: ['admin', 'sudo']
  },
  {
    id: 4,
    name: 'Users and roles',
    path: '/users-and-roles',
    accessRoles: ['admin', 'sudo']
  }
];

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {},
});

export default navSlice.reducer;
