"use client";

import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Author } from "@/types/book";
import {
  getAndSetAuthors,
  getAuthorBooks,
  getAuthors,
  getBook,
  getBooks,
  getBooksOfAuthorsBelowAge,
} from "@/services";

export default function Home() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [bookInput, setBookInput] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [bookAuthorId, setBookAuthorId] = useState("");

  useEffect(() => {
    getAndSetAuthors(setAuthors);
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
      <div className="flex gap-5">
        <Button
          title="get books"
          onClick={() => {
            getBooks();
          }}
        />
        <Button
          title="get authors"
          onClick={() => {
            getAuthors();
          }}
        />
      </div>

      <div className="flex gap-4">
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={bookInput}
          onChange={(e) => setBookInput(e.target.value)}
        />
        <Button
          className="h-[40px]"
          title="get book"
          onClick={() => {
            getBook(bookInput);
          }}
        />
      </div>

      <div className="flex gap-4">
        <select
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          onChange={(event) => {
            console.log("vent.target", event.target.value);
            setBookAuthorId(event.target.value);
          }}
          value={bookAuthorId}
        >
          {authors?.map((a, i) => (
            <option key={i} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <Button
          className="h-[40px]"
          title="get author books"
          onClick={() => {
            getAuthorBooks(bookAuthorId);
          }}
        />
      </div>

      <div className="flex gap-4">
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={authorAge}
          onChange={(e) => setAuthorAge(e.target.value)}
        />
        <Button
          className="h-[40px]"
          title="get books of authors below this age"
          onClick={() => {
            getBooksOfAuthorsBelowAge(authorAge);
          }}
        />
      </div>
    </main>
  );
}
