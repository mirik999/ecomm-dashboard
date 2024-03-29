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

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      id
      name
      code
      images {
        src
        alt
        videoId
        link
      }
      cover {
        src
        alt
        videoId
        link
      }
      color
      sold
      description
      category {
        id
      }
      brand {
        id
        name
      }
      coupon {
        id
      }
      stars
      price
      viewCount
      sale
      saleCount
      new
      hasCoupon
      used
      defective
      freeDelivery
      guarantee
      best
      isDisabled
      createdAt
      createdBy
      modifiedBy
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($controls: GetReq!) {
    getProducts(controls: $controls) {
      count
      payload {
        id
        name
        code
        images {
          src
          alt
        }
        cover {
          src
          alt
        }
        color
        sold
        description
        category {
          id
          name
          subCategories {
            id
            name
          }
        }
        brand {
          id
          name
        }
        coupon {
          name
          endDate
        }
        stars
        price
        viewCount
        sale
        saleCount
        new
        hasCoupon
        used
        defective
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
  mutation DisableProducts($disabledProducts: GetByIdsReq!) {
    disableProducts(disabledProducts: $disabledProducts) {
      ids
    }
  }
`;

export const ACTIVATE_PRODUCTS = gql`
  mutation ActivateProducts($activateProducts: GetByIdsReq!) {
    activateProducts(activateProducts: $activateProducts) {
      ids
    }
  }
`;

export const DELETE_PRODUCTS = gql`
  mutation DeleteProducts($deleteProducts: GetByIdsReq!) {
    deleteProducts(deleteProducts: $deleteProducts) {
      ids
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProductsByCategoryId($id: String!) {
    getProductsByCategoryId(id: $id) {
      id
      name
      isDisabled
      brand {
        id
        name
      }
    }
  }
`;
