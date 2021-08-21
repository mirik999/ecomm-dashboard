import { gql } from '@apollo/client';

export const CREATE_SLIDER = gql`
  mutation CreateSlider($newSlider: CreateSliderReq!) {
    createSlider(newSlider: $newSlider) {
      id
    }
  }
`;

export const UPDATE_SLIDER = gql`
  mutation UpdateSlider($updatedSlider: UpdateSliderReq!) {
    updateSlider(updatedSlider: $updatedSlider) {
      id
    }
  }
`;

export const GET_SLIDER_BY_ID = gql`
  query GetSliderById($id: String!) {
    getSliderById(id: $id) {
      id
      name
      images {
        src
        alt
        videoId
        link
      }
      vertical
      fade
      createdAt
      createdBy
      modifiedBy
      isDisabled
    }
  }
`;

export const GET_SLIDERS = gql`
  query GetSliders($controls: GetReq!) {
    getSliders(controls: $controls) {
      count
      payload {
        id
        name
        images {
          src
          alt
          videoId
          link
        }
        vertical
        fade
        createdAt
        createdBy
        modifiedBy
        isDisabled
      }
    }
  }
`;

export const DISABLE_SLIDERS = gql`
  mutation DisableSliders($disabledSliders: GetByIdsReq!) {
    disableSliders(disabledSliders: $disabledSliders) {
      id
    }
  }
`;

export const ACTIVATE_SLIDERS = gql`
  mutation ActivateSliders($activateSliders: GetByIdsReq!) {
    activateSliders(activateSliders: $activateSliders) {
      id
    }
  }
`;
