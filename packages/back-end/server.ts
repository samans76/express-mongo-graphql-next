import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(port, () => {
  console.log("Server is Running !!!");
});
