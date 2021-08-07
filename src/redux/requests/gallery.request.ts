import { gql } from '@apollo/client';

export const CREATE_GALLERY = gql`
  mutation CreateGallery($newGallery: CreateGalleryReq!) {
    createGallery(newGallery: $newGallery) {
      id
    }
  }
`;

export const UPDATE_GALLERY = gql`
  mutation UpdateGallery($updatedGallery: UpdateGalleryReq!) {
    updateGallery(updatedGallery: $updatedGallery) {
      id
    }
  }
`;

export const GET_GALLERY_BY_ID = gql`
  query GetGalleryById($id: String!) {
    getGalleryById(id: $id) {
      id
      images {
        src
        alt
        videoId
        link
      }
      name
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

export const GET_GALLERIES = gql`
  query GetGallery($controls: GetReq!) {
    getGalleries(controls: $controls) {
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

export const DISABLE_GALLERY = gql`
  mutation DisableGallery($disableGalleries: GetByIdsReq!) {
    disableGalleries(disableGalleries: $disableGalleries) {
      id
    }
  }
`;

export const ACTIVATE_GALLERY = gql`
  mutation ActivateGallery($activateGalleries: GetByIdsReq!) {
    activateGalleries(activateGalleries: $activateGalleries) {
      id
    }
  }
`;

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($deleteGalleries: GetByIdsReq!) {
    deleteGalleries(deleteGalleries: $deleteGalleries) {
      ids
    }
  }
`;
