import { gql } from '@apollo/client';

export const GET_STATISTICS = gql`
  query {
    getAll {
      product {
        count
        isDisabled
        price
        sold
        sale
      }
      category {
        count
        isDisabled
      }
      brand {
        count
        isDisabled
      }
    }
  }
`;
