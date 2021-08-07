import { gql } from '@apollo/client';

export const CREATE_SETTING = gql`
  mutation CreateCategory($newSetting: CreateSettingReq!) {
    createSetting(newSetting: $newSetting) {
      id
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($updatedSetting: UpdateSettingReq!) {
    updateSetting(updatedSetting: $updatedSetting) {
      id
    }
  }
`;

export const GET_SETTING_BY_NAME = gql`
  query GetSetting($name: String!) {
    getSettingByName(name: $name) {
      id
      name
      description
      keywords
      title
    }
  }
`;
