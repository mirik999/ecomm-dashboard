export type OptionType = {
  id: any;
  name: string;
};

export type CreatePageMode = 'create' | 'update';

export type CustomErrorType = {
  [key: string]: {
    type: string;
    message: string;
  };
};
