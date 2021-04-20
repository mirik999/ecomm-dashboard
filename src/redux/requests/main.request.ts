import { gql } from '@apollo/client';

export const GET_STATISTICS = gql`
  query GetAll($dateRange: DateRangeReq!) {
    getAll(dateRange: $dateRange) {
      product {
        count
        sale
        new
        used
        defective
      }
    }
  }
`;
