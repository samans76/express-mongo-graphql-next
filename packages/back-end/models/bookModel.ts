import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: { type: String, require: true },
  author: { type: Schema.Types.ObjectId, require: true, ref: "Author" },
});

const Book = model("Book", bookSchema);

export default Book;
