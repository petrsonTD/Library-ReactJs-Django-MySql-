import useSWR from "swr";
import ListOfBooks from "../components/ListOfBooks";
import { fetcher } from "../functions";

const Books = () => {
  const { data: books, mutate: mutateBooks } = useSWR(
    "http://127.0.0.1:8000/server/books/",
    fetcher
  );

  return (
    <div>
      <ListOfBooks books={books} mutateBooks={mutateBooks} />
    </div>
  );
};

export default Books;
