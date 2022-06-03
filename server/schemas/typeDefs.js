const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews(bookId: String): [Review]
  }

  type User {
    _id: ID!
    username: String
    email: String
    readingList: [Book]
    reviews: [Review]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Review {
    _id: ID!
    username: String
    bookId: String
    reviewText: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    username: String
    createdAt: String
    commentText: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addToList(input: BookInput!): User
    createReview(reviewText: String!, bookId: String): Review
    removeBook(bookId: String!): User
    addComment(reviewId: ID!, commentText: String!): Review
  }
`;

module.exports = typeDefs;
