import { gql } from '@apollo/client';

export const GET_STATISTICS = gql`
  query {
    getAll {
      product {
        count
        isDisabled
        comment
        price
        sold
        sale
      }
      category {
        count
        isDisabled
      }
    }
  }
`;
