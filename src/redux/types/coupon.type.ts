export type CouponType = {
  id: string;
  name: string;
  description: string;
  value: number;
  used: number;
  type: string[];
  createdAt: Date;
  endDate: Date;
  createdBy: string;
  modifiedBy: string;
  isDisabled: boolean;
};

export type CreateCouponType = {
  id: string;
  name: string;
  description: string;
  type: string[];
  value: number;
  endDate: Date;
};
