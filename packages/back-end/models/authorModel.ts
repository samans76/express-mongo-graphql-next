import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: { type: String, require: true },
});

const Author = model("Author", authorSchema);

export default Author;
