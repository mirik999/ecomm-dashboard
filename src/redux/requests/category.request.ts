import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($newCategory: UpdateCategoryInput!) {
    createCategory(newCategory: $newCategory) {
      id
      name
      tabName
      createdAt
      isDisabled
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updatedCategory: UpdateCategoryInput!) {
    updateCategory(updatedCategory: $updatedCategory) {
      id
      name
      tabName
      isDisabled
      createdAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($controls: GetElementsInput!) {
    getCategories(controls: $controls) {
      count
      payload {
        id
        name
        tabName
        createdAt
        isDisabled
      }
    }
  }
`;

export const DISABLE_CATEGORIES = gql`
  mutation DisableCategories($disabledCategories: GetByIdsInput!) {
    disableCategories(disabledCategories: $disabledCategories) {
      id
    }
  }
`;

export const ACTIVATE_CATEGORIES = gql`
  mutation ActivateCategories($activateCategories: GetByIdsInput!) {
    activateCategories(activateCategories: $activateCategories) {
      id
    }
  }
`;
