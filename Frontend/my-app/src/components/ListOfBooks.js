import "./List.css";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../functions";
import ModalBook from "./ModalBook";

const ListOfBooks = ({ books, mutateBooks }) => {
  const [selectedBook, setSelectedBook] = useState({ id: "", mode: "" });

  const { data: detail, mutate: mutateBook } = useSWR(
    selectedBook.mode === "edit"
      ? `http://127.0.0.1:8000/server/book/${selectedBook.id}`
      : null,
    fetcher
  );

  return (
    <>
      <div className="list">
        <h2>Books</h2>
        {books &&
          books.map((book) => (
            <div className="card">
              <div className="name" key={book.id}>
                <p>{`${book.title} (${
                  book.available
                    ? "Book is available"
                    : `Book is borrowed to ${book.borrowed_by?.first_name} ${book.borrowed_by?.last_name}`
                })`}</p>
              </div>
              <span
                onClick={() => setSelectedBook({ id: book.id, mode: "edit" })}
              >
                Edit
              </span>
            </div>
          ))}
        <div className="button-wrapper">
          <button onClick={() => setSelectedBook({ id: "", mode: "add" })}>
            Add Book
          </button>
        </div>
      </div>
      {(selectedBook.mode === "add" || detail) && (
        <ModalBook
          detail={detail}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          mutateBook={mutateBook}
          mutateBooks={mutateBooks}
        />
      )}
    </>
  );
};

export default ListOfBooks;
