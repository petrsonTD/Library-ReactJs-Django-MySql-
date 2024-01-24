import useSWR from "swr";
import HistoryOfBorrow from "../components/HistoryOfBorrow";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const History = () => {
  const { data: borrows } = useSWR(
    "http://127.0.0.1:8000/server/borrows/",
    fetcher
  );

  return (
    <div>
      <HistoryOfBorrow borrows={borrows} />
    </div>
  );
};

export default History;
