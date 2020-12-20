import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($newUser: CreateUserDto!) {
    createUser(newUser: $newUser) {
      id
      email
      accessToken
    }
  }
`;
