const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
      loginUser(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(bookInput: BookInput!): User
      removeBook(bookId: String!): User
  }

  input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
  }

  type Auth {
    token: ID!
    user: User
  }

`;
// export the typeDefs
module.exports = typeDefs;
