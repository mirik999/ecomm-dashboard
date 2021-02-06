import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateCategory($newProduct: CreateProductReq!) {
    createProduct(newProduct: $newProduct) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updatedProduct: UpdateProductReq!) {
    updateProduct(updatedProduct: $updatedProduct) {
      id
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($controls: GetElementsInput!) {
    getProducts(controls: $controls) {
      count
      payload {
        id
        name
        articul
        images
        cover
        color
        group
        sold
        description
        category {
          id
          name
        }
        stars
        price
        viewCount
        sale
        saleCount
        new
        freeDelivery
        guarantee
        best
        isDisabled
        createdAt
        createdBy
        modifiedBy
      }
    }
  }
`;

export const DISABLE_PRODUCTS = gql`
  mutation DisableProducts($disabledProducts: GetByIdsInput!) {
    disableProducts(disabledProducts: $disabledProducts) {
      ids
    }
  }
`;

export const ACTIVATE_PRODUCTS = gql`
  mutation ActivateProducts($activateProducts: GetByIdsInput!) {
    activateProducts(activateProducts: $activateProducts) {
      ids
    }
  }
`;

export const DELETE_PRODUCTS = gql`
  mutation DeleteProducts($deleteProducts: GetByIdsInput!) {
    deleteProducts(deleteProducts: $deleteProducts) {
      ids
    }
  }
`;
