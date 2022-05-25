const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    readingList: [String]
    completedBooks: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Review {
    stars: String
    reviewText: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(reviewId: ID!, commentText: String!): Review
    createReview(bookId: ID!, stars: String!, reviewText: String!): Book
    addToList(newBook: InputBook!): User
    markAsRead(bookId: ID!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
