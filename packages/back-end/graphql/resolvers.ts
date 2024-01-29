import Author from "../models/authorModel";
import Book from "../models/bookModel";

export const resolvers = {
  //   Book: {
  //     async author(_: any) {
  //       return await Author.findById(_.author);
  //     },
  //   },
  Author: {
    async books(_: any) {
      return await Book.find({ author: _._id });
    },
  },
  Query: {
    async book(_: any, { id }: { id: string }) {
      return await Book.findById(id);
    },
    async books() {
      //   return await Book.find();
      return await Book.find().populate("author");
    },
    async author(_: any, { id }: { id: string }) {
      return await Author.findById(id);
    },
    async authors() {
      return await Author.find();
    },
  },
  Mutation: {
    async addBook(_: any, { name, author }: { name: String; author: String }) {
      const newBook = new Book({
        name,
        author,
      });
      const res = await newBook.save();
      return res;
    },
    async addAuthor(_: any, { name, age }: { name: String; age: String }) {
      const newAuthor = new Author({
        name,
        age,
      });
      const res = await newAuthor.save();
      return res;
    },
  },
};
