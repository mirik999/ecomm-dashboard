import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation CreateCategory($newArticle: CreateArticleReq!) {
    createArticle(newArticle: $newArticle) {
      id
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($updatedArticle: UpdateArticleReq!) {
    updateArticle(updatedArticle: $updatedArticle) {
      id
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query GetArticle($id: String!) {
    getArticle(id: $id) {
      id
      cover {
        src
        alt
      }
      images {
        src
        alt
      }
      author
      title
      content
      slug
      keywords
      htmlTitle
      description
      isDisabled
      createdAt
      createdBy
      modifiedBy
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles($controls: GetReq!) {
    getArticles(controls: $controls) {
      count
      payload {
        id
        cover {
          src
          alt
        }
        images {
          src
          alt
        }
        author
        title
        content
        slug
        keywords
        htmlTitle
        description
        isDisabled
        createdAt
        createdBy
        modifiedBy
      }
    }
  }
`;

export const DISABLE_ARTICLES = gql`
  mutation DisableArticles($disabledArticles: GetByIdsReq!) {
    disableArticles(disabledArticles: $disabledArticles) {
      ids
    }
  }
`;

export const ACTIVATE_ARTICLES = gql`
  mutation ActivateArticles($activateArticles: GetByIdsReq!) {
    activateArticles(activateArticles: $activateArticles) {
      ids
    }
  }
`;

export const DELETE_ARTICLES = gql`
  mutation DeleteArticles($deleteArticles: GetByIdsReq!) {
    deleteArticles(deleteArticles: $deleteArticles) {
      ids
    }
  }
`;

export const GET_ARTICLES_BY_CATEGORY_ID = gql`
  query GetArticlesByCategoryId($id: String!) {
    getArticlesByCategoryId(id: $id) {
      id
      title
      isDisabled
    }
  }
`;
