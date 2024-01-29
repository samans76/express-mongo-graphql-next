import { gql } from "apollo-server";

export const typeDefs = gql`
  type Author {
    id: String
    name: String
    age: String
    books: [Book]
  }

  type Book {
    id: String
    name: String
    author: Author
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    addBook(name: String, author: String): Book
    addAuthor(name: String!, age: String): Author
  }
`;
