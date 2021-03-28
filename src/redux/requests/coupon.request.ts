import { gql } from '@apollo/client';

export const CREATE_COUPON = gql`
  mutation CreateCoupon($newCoupon: CreateCouponReq!) {
    createCoupon(newCoupon: $newCoupon) {
      id
    }
  }
`;

export const UPDATE_COUPON = gql`
  mutation UpdateCoupon($updatedCoupon: UpdateCouponReq!) {
    updateCoupon(updatedCoupon: $updatedCoupon) {
      id
    }
  }
`;

export const GET_COUPONS = gql`
  query GetCoupons($controls: GetElementsInput!) {
    getCoupons(controls: $controls) {
      count
      payload {
        id
        name
        description
        type
        value
        used
        createdAt
        createdBy
        modifiedBy
        endDate
        isDisabled
      }
    }
  }
`;

export const DISABLE_COUPONS = gql`
  mutation DisableCoupons($disabledCoupons: GetByIdsInput!) {
    disableCoupons(disabledCoupons: $disabledCoupons) {
      ids
    }
  }
`;

export const ACTIVATE_COUPONS = gql`
  mutation ActivateCoupons($activateCoupons: GetByIdsInput!) {
    activateCoupons(activateCoupons: $activateCoupons) {
      ids
    }
  }
`;

export const DELETE_COUPONS = gql`
  mutation DeleteCoupon($deleteCoupons: GetByIdsInput!) {
    deleteCoupons(deleteCoupons: $deleteCoupons) {
      ids
    }
  }
`;
