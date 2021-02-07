import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($newCategory: CreateCategoryReq!) {
    createCategory(newCategory: $newCategory) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updatedCategory: UpdateCategoryReq!) {
    updateCategory(updatedCategory: $updatedCategory) {
      id
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
        subCategories {
          name
          tabName
        }
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

export const DELETE_CATEGORIES = gql`
  mutation DeleteCategories($deleteCategories: GetByIdsInput!) {
    deleteCategories(deleteCategories: $deleteCategories) {
      ids
    }
  }
`;

export const GET_CATEGORIES_FOR_SELECT = gql`
  query GetCategories($controls: GetElementsInput!) {
    getCategories(controls: $controls) {
      count
      payload {
        id
        name
      }
    }
  }
`;
