import { gql } from '@apollo/client';

export const CREATE_BIO = gql`
  mutation CreateBio($newBiography: CreateBiographyReq!) {
    createBiography(newBiography: $newBiography) {
      id
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation UpdateBio($updatedBiography: UpdateBiographyReq!) {
    updateBiography(updatedBiography: $updatedBiography) {
      id
    }
  }
`;

export const GET_BIO_BY_ID = gql`
  query GetBioById($id: String!) {
    getBiographyById(id: $id) {
      id
      images {
        src
        alt
        videoId
        link
      }
      name
      content
      keywords
      htmlTitle
      description
      createdAt
      createdBy
      modifiedBy
      isDisabled
    }
  }
`;

export const GET_BIOS = gql`
  query GetBio($controls: GetReq!) {
    getBiographies(controls: $controls) {
      count
      payload {
        id
        images {
          src
          alt
          videoId
          link
        }
        name
        content
        keywords
        htmlTitle
        description
        createdAt
        createdBy
        modifiedBy
        isDisabled
      }
    }
  }
`;

export const DISABLE_BIO = gql`
  mutation DisableBio($disableBiographies: GetByIdsReq!) {
    disableBiographies(disabledBiographies: $disableBiographies) {
      id
    }
  }
`;

export const ACTIVATE_BIO = gql`
  mutation ActivateBio($activateBiographies: GetByIdsReq!) {
    activateBiographies(activateBiographies: $activateBiographies) {
      id
    }
  }
`;

export const DELETE_BIO = gql`
  mutation DeleteBio($deleteBiographies: GetByIdsReq!) {
    deleteBiographies(deleteBiographies: $deleteBiographies) {
      ids
    }
  }
`;
