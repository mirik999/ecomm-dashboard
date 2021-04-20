import { gql } from '@apollo/client';

export const CREATE_BRAND = gql`
  mutation CreateBrand($newBrand: CreateBrandReq!) {
    createBrand(newBrand: $newBrand) {
      id
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($updatedBrand: UpdateBrandReq!) {
    updateBrand(updatedBrand: $updatedBrand) {
      id
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: String!) {
    getBrandById(id: $id) {
      id
      name
      imageUrl
      category {
        id
      }
      createdAt
      isDisabled
    }
  }
`;

export const GET_BRANDS = gql`
  query GetBrands($controls: GetReq!) {
    getBrands(controls: $controls) {
      count
      payload {
        id
        name
        imageUrl
        category {
          id
          name
          subCategories {
            id
            name
          }
        }
        createdAt
        isDisabled
      }
    }
  }
`;

export const DISABLE_BRANDS = gql`
  mutation DisableBrands($disabledBrands: GetByIdsInput!) {
    disableBrands(disabledBrands: $disabledBrands) {
      id
    }
  }
`;

export const ACTIVATE_BRANDS = gql`
  mutation ActivateBrands($activateBrands: GetByIdsInput!) {
    activateBrands(activateBrands: $activateBrands) {
      id
    }
  }
`;

export const DELETE_BRANDS = gql`
  mutation DeleteBrands($deleteBrands: GetByIdsInput!) {
    deleteBrands(deleteBrands: $deleteBrands) {
      ids
    }
  }
`;

export const GET_BRANDS_FOR_SELECT = gql`
  query GetBrands($controls: GetReq!) {
    getBrands(controls: $controls) {
      count
      payload {
        id
        name
      }
    }
  }
`;

export const GET_BRANDS_BY_CATEGORY_ID = gql`
  query GetBrandsByCategoryId($id: String!) {
    getBrandsByCategoryId(id: $id) {
      id
      name
      isDisabled
      category {
        id
        name
        isDisabled
      }
    }
  }
`;
