import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import Author from "./models/authorModel";
import Book from "./models/bookModel";
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/book", async (req, res) => {
  try {
    const newBook = new Book({
      name: req.body.name,
      author: req.body.authorId,
    });
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/author", async (req, res) => {
  console.log("req", req.body);
  try {
    const newAuthor = new Author({
      name: req.body.name,
      age:req.body.age
    });
    await newAuthor.save();
    res.status(200).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/book", async (req, res) => {
  let books = await Book.find({}).populate("author");
  res.status(200).json(books);
});

app.get("/book/:id", async (req, res) => {
  let book = await Book.findById(req.params.id);
  res.status(200).json(book);
});

app.get("/author", async (req, res) => {
  let authors = await Author.find({});
  res.status(200).json(authors);
});

app.get("/author/:id", async (req, res) => {
  let author = await Author.findById(req.params.id);
  res.status(200).json(author);
});

app.get("/author/:id/books", async (req, res) => {
  // get author books
  console.log()
  let books = await Book.find({author: req.params.id})
  res.status(200).json(books);
});

app.get("/book/authorsYoungerThan/:age", async (req, res) => {
  // get books of authors younger than this age
const authors = await Author.find({age:{$lt: parseInt(req.params.age) }}) as any
const authorsIds = authors.map((a:any)=> a._id) 
const books = await Book.find({author: {$in: authorsIds}})

res.status(200).json(books);
});

app.listen(port, () => {
  console.log("Server is Running !!!");
});
