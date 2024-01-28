import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import Author from "./models/authorModel";
import Book from "./models/bookModel";
import cors from "cors";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { graphqlHTTP as expressGraphQL } from "express-graphql";
// const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();
const port = 3001;
const uri =
  "mongodb+srv://samanDB:123159159@cluster0.uvrcdhb.mongodb.net/mongodb?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to Database!"))
  .catch((err) => console.log("Could not Connect to Database!", err));

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Methods", "");
  next();
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return Author.findById(book.author);
      },
    },
  }),
});

const AuthorType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Author",
  description: "This represents a author of a book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return Book.find({ author: author.id });
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A Single Book",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let book = await Book.findById(args.id).populate("author");
        return book;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of All Books",
      resolve: async () => {
        let books = await Book.find({}).populate("author");
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of All Authors",
      resolve: async () => {
        let authors = await Author.find({});
        return authors;
      },
    },
    author: {
      type: AuthorType,
      description: "A Single Author",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let author = await Author.findById(args.id);
        return author;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let newBook = new Book({
          name: args.name,
          author: args.author,
        });
        await newBook.save();
        return newBook;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let newAuthor = new Author({
          name: args.name,
          age: args.age,
        });
        await newAuthor.save();
        return newAuthor;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  cors(),
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Server is Running !!!");
});
