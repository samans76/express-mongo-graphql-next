import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: { type: String, require: true },
  age: {type:Number}
});

const Author = model("Author", authorSchema);

export default Author;
