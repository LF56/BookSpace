const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(_id: ID, username: String, bookId: String): [Thought]
    thought(_id: ID!): Thought
  }
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    readingList: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID!
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
    title: String
    description: String
    image: String
    link: String
  }

  type Review {
    _id: ID!
    stars: String
    reviewText: String
  }

  input ReviewInput {
    stars: String
    reviewText: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createReview(input: ReviewInput): Review
    addComment(reviewId: ID!, commentText: String!): Review
    addToList(input: BookInput!): Book
    markAsRead(bookId: ID!): User
    removeBook(bookId: ID!): User
    addThought(thoughtText: String!, reviewedBook: BookInput!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
  }
`;

module.exports = typeDefs;
