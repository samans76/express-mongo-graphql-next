import { Request } from "./axios-instance";
import { Author } from "./types/book";

const endPoint = "http://www.localhost:3001/graphql";

export const addBook = (name: string, author: string) => {
  const query = `mutation {
        addBook(name:\"${name}\",  author:\"${author}\") {
          id
          name
          author{
          id
          name
          age
        }
        }
        }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const addAuthor = (name: string, age: string) => {
  const query = `mutation {
        addAuthor(name:\"${name}\", age:\"${age}\") {
          id
          name
          age
        }
        }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const getAuthors = () => {
  const query = `{
    authors {
      id
      name
      age
    }
    }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const getAndSetAuthors = (
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>
) => {
  const query = `{
        authors {
          id
          name
          age
        }
        }`;
  Request.post(endPoint, { query: query })
    .then((res) => {
      console.log("before set authors :", res.data.data.authors);
      setAuthors(res.data.data.authors);
    })
    .catch((err) => console.log(err));
};

export const getBooks = () => {
  const query = `{
        books {
          id
          name
          author {
            id
            name
            age
          }
        }
        }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const getBook = (id: string) => {
  const query = `{
        book(id: \"${id}\") {
          id
          name
          author{
          id
          name
          age
        
        }
        }
        }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const getAuthorBooks = (id: string) => {
  const query = `{
    author(id: \"${id}\") {
      id
      name
      age
      books {
        id
        name
      }
    }
    }`;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};

export const getBooksOfAuthorsBelowAge = (age: string) => {
  const query = ``;
  Request.post(endPoint, { query: query }).then((res) => {
    console.log("message :", res.data);
  });
};
