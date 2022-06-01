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
    }
  }
`;

export const QUERY_REVIEWS = gql`
  {
    reviews {
      username
      createdAt
      reviewText
      comments {
        username
        createdAt
        commentText
      }
    }
  }
`;
