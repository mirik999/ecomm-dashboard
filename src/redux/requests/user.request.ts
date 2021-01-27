import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($newUser: AuthReq!) {
    createUser(newUser: $newUser) {
      accessToken
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($user: AuthReq!) {
    loginUser(user: $user) {
      accessToken
    }
  }
`;
