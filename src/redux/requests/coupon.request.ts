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

export const GET_COUPON_BY_ID = gql`
  query GetCouponById($id: String!) {
    getCouponById(id: $id) {
      id
      name
      description
      type
      value
      used
      couponList {
        used
        key
      }
      endDate
      createdAt
      createdBy
      modifiedBy
      isDisabled
    }
  }
`;

export const GET_COUPONS = gql`
  query GetCoupons($controls: GetReq!) {
    getCoupons(controls: $controls) {
      count
      payload {
        id
        name
        description
        type
        value
        used
        couponList {
          used
          key
        }
        endDate
        createdAt
        createdBy
        modifiedBy
        isDisabled
      }
    }
  }
`;

export const DISABLE_COUPONS = gql`
  mutation DisableCoupons($disabledCoupons: GetByIdsReq!) {
    disableCoupons(disabledCoupons: $disabledCoupons) {
      ids
    }
  }
`;

export const ACTIVATE_COUPONS = gql`
  mutation ActivateCoupons($activateCoupons: GetByIdsReq!) {
    activateCoupons(activateCoupons: $activateCoupons) {
      ids
    }
  }
`;

export const DELETE_COUPONS = gql`
  mutation DeleteCoupon($deleteCoupons: GetByIdsReq!) {
    deleteCoupons(deleteCoupons: $deleteCoupons) {
      ids
    }
  }
`;

export const GET_COUPONS_FOR_SELECT = gql`
  query GetCoupons($controls: GetReq!) {
    getCoupons(controls: $controls) {
      count
      payload {
        id
        name
        type
        value
        endDate
      }
    }
  }
`;
