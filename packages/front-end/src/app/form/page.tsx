"use client";

import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";

type Author = { _id: string; name: string };
function index() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthorId, setBookAuthorId] = useState("");

  useEffect(() => {
    axios
      .get("http://www.localhost:3001/author")
      .then((res) => {
        setAuthors(res.data);
        console.log("authors :", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Button
        title="add author"
        onClick={() => {
          axios.post("http://www.localhost:3001/author", {
            name: authorName,
          });
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
            <option key={i} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        title="add book"
        onClick={() => {
          axios.post("http://www.localhost:3001/book", {
            name: bookName,
            authorId: bookAuthorId,
          });
        }}
      />
    </div>
  );
}

export default index;
