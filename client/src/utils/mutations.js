import { gql } from "@apollo/client";

//LOGIN FUNCTIONALITY
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;
//ADD USER FUNCTIONALITY
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//SAVING BOOK FUNCTIONALITY
export const SAVE_BOOK = gql`
  mutation addToList($input: BookInput!) {
    addToList(input: $input) {
      username
      readingList {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
//REMOVE BOOK FUNCTIONALITY
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

//CREATE REVIEW FUNCTIONALITY
// export const CREATE_REVIEW = gql`
//   mutation createReview($input: ReviewInput!) {
//     createReview(input: $input) {
//       stars
//       username
//       bookId
//       reviewText
//     }
//   }
// `;

//CREATE COMMENT FUNCTIONALITY
// export const ADD_COMMENT = gql`
//   mutation createReview($input: ReviewInput!) {
//     createReview(input: $input) {
//       stars
//       username
//       bookId
//       reviewText
//     }
//   }
// `;
