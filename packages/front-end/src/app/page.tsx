"use client";

import axios from "axios";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Author } from "./form/page";

export default function Home() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [bookInput, setBookInput] = useState("");
  const [authorAge, setAuthorAge] = useState("");
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
    <main className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
      <div className="flex gap-5">
        <Button
          title="get books"
          onClick={() => {
            axios.get("http://www.localhost:3001/book").then((res) => {
              console.log("message :", res.data);
            });
          }}
        />
        <Button
          title="get authors"
          onClick={() => {
            axios.get("http://www.localhost:3001/author").then((res) => {
              console.log("message :", res.data);
            });
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
            axios
              .get(`http://www.localhost:3001/book/${bookInput}`)
              .then((res) => {
                console.log("message :", res.data);
              });
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
          {authors.map((a, i) => (
            <option key={i} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
        <Button
          className="h-[40px]"
          title="get author books"
          onClick={() => {
            axios
              .get(`http://www.localhost:3001/author/${bookAuthorId}/books`)
              .then((res) => {
                console.log("message :", res.data);
              });
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
            axios
              .get(
                `http://www.localhost:3001/book/authorsYoungerThan/${authorAge}`
              )
              .then((res) => {
                console.log("message :", res.data);
              });
          }}
        />
      </div>
    </main>
  );
}
