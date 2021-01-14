import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateCategory($newProduct: CreateProductInput!) {
    createProduct(newProduct: $newProduct) {
      id
      name
      images
      cover
      color
      description
      createdAt
      stars
      price
      viewCount
      wishlistCount
      sale
      saleCount
      new
      best
      isDisabled
      category {
        id
        name
        tabName
      }
     }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updatedProduct: UpdateProductInput!) {
    updateProduct(updatedProduct: $updatedProduct) {
      id
      name
      images
      cover
      color
      description
      createdAt
      stars
      price
      viewCount
      wishlistCount
      sale
      saleCount
      new
      best
      isDisabled
      category {
        id
        name
        tabName
      }
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
        images
        cover
        color
        description
        category {
          id
          name
        }
        stars
        price
        viewCount
        wishlistCount
        sale
        saleCount
        new
        best
        isDisabled
        createdAt
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
