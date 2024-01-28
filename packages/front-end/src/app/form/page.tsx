"use client";

import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Author } from "@/types/book";
import { addAuthor, addBook, getAndSetAuthors } from "@/services";

function index() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthorId, setBookAuthorId] = useState("");

  useEffect(() => {
    getAndSetAuthors(setAuthors);
  }, []);

  return (
    <div className="w-full min-h-screen p-8 flex flex-col gap-6">
      <div className="text-[22px] font-bold">Insert Author</div>
      <div className="flex gap-2">
        <span>Author Name</span>
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <span>Author Age</span>
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={authorAge}
          onChange={(e) => setAuthorAge(e.target.value)}
        />
      </div>
      <Button
        title="add author"
        onClick={() => {
          addAuthor(authorName, authorAge);
        }}
      />

      <div className="text-[22px] font-bold mt-10">Insert Book</div>
      <div className="flex gap-2">
        <span>Book Name</span>
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <span>Book Author</span>
        <select
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          onChange={(event) => {
            console.log("vent.target", event.target.value);
            setBookAuthorId(event.target.value);
          }}
          value={bookAuthorId}
        >
          {authors.map((a, i) => (
            <option key={i} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        title="add book"
        onClick={() => {
          addBook(bookName, bookAuthorId);
        }}
      />
    </div>
  );
}

export default index;
