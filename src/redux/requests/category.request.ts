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

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: String!) {
    getCategoryById(id: $id) {
      id
      name
      tabName
      createdAt
      isDisabled
      subCategories {
        id
        parentId
        name
        tabName
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($controls: GetReq!) {
    getCategories(controls: $controls) {
      count
      payload {
        id
        name
        tabName
        createdAt
        isDisabled
        subCategories {
          id
          parentId
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
  query GetCategories($controls: GetReq!) {
    getCategories(controls: $controls) {
      count
      payload {
        id
        name
        subCategories {
          id
          parentId
          name
        }
      }
    }
  }
`;
