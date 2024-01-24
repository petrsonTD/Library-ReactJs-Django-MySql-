import { useForm } from "react-hook-form";
import "./List.css";
import useSWR from "swr";
import { fetcher } from "../functions";
import { useEffect, useState } from "react";

const ModalMember = ({ detail, setSelectedMember, mutateMember }) => {
  const { data: books, mutate: mutateBooks } = useSWR(
    "http://127.0.0.1:8000/server/availableBooks/",
    fetcher
  );

  const [selectedBook, setSelectedBook] = useState(books?.[0]?.id || "");

  useEffect(() => {
    setSelectedBook(books?.[0]?.id || "");
  }, [books]);

  const returnBook = (id) => {
    fetch(`http://127.0.0.1:8000/server/returnBook/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_borrow: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        mutateMember();
        mutateBooks();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const borrowBook = () => {
    fetch(`http://127.0.0.1:8000/server/borrowBook/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_book: selectedBook,
        id_member: detail.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        mutateMember();
        mutateBooks();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        className="backdrop"
        onClick={() => setSelectedMember({ id: "", mode: "" })}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <h2>{`${detail.first_name} ${detail.last_name}`}</h2>
          <button
            className="close-button"
            onClick={() => setSelectedMember({ id: "", mode: "" })}
          >
            &times;
          </button>
        </div>
        <div className="borrowModal">
          <h3>Borrowed books:</h3>
          {detail?.borrowed_books?.map((book) => (
            <div key={book.borrow_id} className="borrow-row">
              <span>{book.book.title}</span>
              <button
                className="button"
                onClick={() => returnBook(book.borrow_id)}
              >
                Return
              </button>
            </div>
          ))}
          <div>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              {books?.map((book) => (
                <option value={book.id}>{book.title}</option>
              ))}
            </select>
            <button className="button" onClick={borrowBook}>
              Borrow
            </button>
          </div>
          <div className="button-wrapper">
            <button
              type="button"
              onClick={() => setSelectedMember({ id: "", mode: "" })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMember;
