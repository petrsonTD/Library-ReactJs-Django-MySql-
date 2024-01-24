import { useForm } from "react-hook-form";
import "./List.css";

const ModalBook = ({
  detail,
  selectedBook,
  setSelectedBook,
  mutateBook,
  mutateBooks,
}) => {
  const form = useForm({
    defaultValues: {
      id: selectedBook.mode === "edit" ? detail.id : null,
      title: selectedBook.mode === "edit" ? detail.title : "",
      author: selectedBook.mode === "edit" ? detail.author : "",
      book_id: selectedBook.mode === "edit" ? detail.book_id : "",
    },
  });

  const deleteBook = () => {
    fetch(`http://127.0.0.1:8000/server/deleteBook/${detail.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Book deleted successfully");
        mutateBooks();
        setSelectedBook({ id: "", mode: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSubmit = (data) => {
    fetch(
      `http://127.0.0.1:8000/server/${
        selectedBook.mode === "edit" ? "updateBook" : "createBook"
      }/`,
      {
        method: selectedBook.mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        mutateBook();
        mutateBooks();
        setSelectedBook({ id: "", mode: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        className="backdrop"
        onClick={() => setSelectedBook({ id: "", mode: "" })}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <h2>
            {selectedBook.mode === "edit" ? detail.title : "Adding new book"}
          </h2>
          <button
            className="close-button"
            onClick={() => setSelectedBook({ id: "", mode: "" })}
          >
            &times;
          </button>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="form">
            <div>
              <label>Title</label>
              <input {...form.register("title")} />
            </div>
            <div>
              <label>Author:</label>
              <input {...form.register("author")} />
            </div>
            <div>
              <label>Book ID:</label>
              <input {...form.register("book_id")} />
            </div>
            {selectedBook.mode === "edit" &&
              (detail?.available ? (
                <div>
                  <label>Book is available.</label>
                </div>
              ) : (
                <div>
                  <label>Borrowed to:</label>
                  <lavel>{`${detail.borrowed_by?.first_name} ${detail.borrowed_by?.last_name}`}</lavel>
                </div>
              ))}
            <div className="button-wrapper">
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setSelectedBook("")}>
                  Close
                </button>
                {selectedBook.mode === "edit" && (
                  <button
                    className={detail?.available ? "delete" : "disabled"}
                    type="button"
                    onClick={deleteBook}
                    disabled={!detail?.available}
                  >
                    Delete
                  </button>
                )}
              </div>
              {/* {!detail?.available && (
                <span>Book has to be returned before, it can be deleted.</span>
              )} */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalBook;
