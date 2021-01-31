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

export const GET_USERS = gql`
  query GetUsers($controls: GetElementsInput!) {
    getUsers(controls: $controls) {
      count
      payload {
        id
        email
        roles
        isDisabled
        createdAt
      }
    }
  }
`;


export const DISABLE_USERS = gql`
  mutation DisableUsers($disabledUsers: GetByIdsInput!) {
    disableUsers(disabledUsers: $disabledUsers) {
      ids
    }
  }
`;

export const ACTIVATE_USERS = gql`
  mutation ActivateUsers($activateUsers: GetByIdsInput!) {
    activateUsers(activateUsers: $activateUsers) {
      ids
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updatedUser: UpdateUserReq!) {
    updateUser(updatedUser: $updatedUser) {
      id
      email
      roles
      isDisabled
    }
  }
`;
