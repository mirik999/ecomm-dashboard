import { createSlice } from '@reduxjs/toolkit';
//types
import { NavType } from '../types/nav.type';

const initialState: NavType[] = [
  {
    id: 1,
    name: 'Auth',
    path: '/auth',
    accessRoles: ['guest', 'admin', 'sudo'],
    visible: false
  },
  {
    id: 2,
    name: 'Not Found',
    path: '/404',
    accessRoles: ['guest', 'admin', 'sudo'],
    visible: false
  },
  {
    id: 3,
    name: 'Main',
    path: '/',
    accessRoles: ['guest', 'admin', 'sudo'],
    visible: true
  },
  {
    id: 4,
    name: 'Categories',
    path: '/categories',
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    visible: true,
    subPaths: ['/create']
  },
  {
    id: 5,
    name: 'Products',
    path: '/products',
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['admin', 'sudo'],
    visible: true,
    subPaths: ['/create']
  },
  {
    id: 6,
    name: 'Users',
    path: '/users',
    accessRoles: ['guest', 'admin', 'sudo'],
    editableRoles: ['sudo'],
    visible: true,
    subPaths: ['/create']
  }
];

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {},
});

export default navSlice.reducer;
