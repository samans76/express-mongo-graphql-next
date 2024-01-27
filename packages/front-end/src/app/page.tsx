"use client";

import axios from "axios";
import Button from "../components/Button";
import { useState } from "react";

export default function Home() {
  const [bookInput, setBookInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

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
        <input
          className="w-[260px] h-[40px] px-3 border-2 border-gray-400 rounded-md flex items-center gap-5"
          value={authorInput}
          onChange={(e) => setAuthorInput(e.target.value)}
        />
        <Button
          className="h-[40px]"
          title="get author"
          onClick={() => {
            axios
              .get(`http://www.localhost:3001/book/${authorInput}`)
              .then((res) => {
                console.log("message :", res.data);
              });
          }}
        />
      </div>
    </main>
  );
}
