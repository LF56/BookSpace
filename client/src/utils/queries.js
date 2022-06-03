import { gql } from "@apollo/client";
//QUERY GETING USER/BOOK DATA AND EXECUTION
export const GET_ME = gql`
  {
    me {
      username
      email
      readingList {
        authors
        description
        bookId
        image
        link
        title
      }
      reviews {
        _id
        reviewText
        createdAt
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query reviews($bookId: String) {
    reviews(bookId: $bookId) {
      _id
      username
      createdAt
      reviewText
      comments {
        _id
        username
        createdAt
        commentText
      }
    }
  }
`;
