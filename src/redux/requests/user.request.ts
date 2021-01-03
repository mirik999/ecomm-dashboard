import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($newUser: AuthInput!) {
    createUser(newUser: $newUser) {
      accessToken
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($user: AuthInput!) {
    loginUser(user: $user) {
      accessToken
    }
  }
`;
