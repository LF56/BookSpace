import { gql } from '@apollo/client';

//LOGIN FUNCTIONALITY
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
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
export const addTolist = gql`
  mutation saveBook($title: String!) {
    saveBook(book: $book) {
      username
      email
      savedBooks{
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