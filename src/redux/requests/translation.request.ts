import { gql } from '@apollo/client';

export const CREATE_TRANSLATION = gql`
  mutation CreateTranslation($newTranslation: CreateTranslationReq!) {
    createTranslation(newTranslation: $newTranslation) {
      id
    }
  }
`;

export const UPDATE_TRANSLATION = gql`
  mutation UpdateTranslation($updatedTranslation: UpdateTranslationReq!) {
    updateTranslation(updatedTranslation: $updatedTranslation) {
      id
    }
  }
`;

export const GET_TRANSLATION_BY_ID = gql`
  query GetTranslationById($id: String!) {
    getTranslationById(id: $id) {
      id
      keyword
      translation {
        AZ
        RU
        TR
        EN
        FR
        SP
        DE
      }
    }
  }
`;

export const GET_TRANSLATIONS = gql`
  query GetTranslations($controls: GetReq!) {
    getTranslations(controls: $controls) {
      count
      payload {
        id
        keyword
        translation {
          AZ
          RU
          TR
          EN
          FR
          SP
          DE
        }
      }
    }
  }
`;

export const DELETE_TRANSLATIONS = gql`
  mutation DeleteTranslations($deleteTranslations: GetByIdsReq!) {
    deleteTranslations(deleteTranslations: $deleteTranslations) {
      ids
    }
  }
`;
