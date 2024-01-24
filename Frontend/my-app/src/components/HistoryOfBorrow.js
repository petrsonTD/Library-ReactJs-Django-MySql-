import "./List.css";
import { formatDate } from "../functions";

const HistoryOfBorrow = ({ borrows }) => {
  return (
    <div className="list">
      <h2>Books</h2>
      {borrows &&
        borrows.map((borrow) => (
          <div key={borrow.id_borrow} className="borrowCard">
            <div className="half">
              <div>
                <label>Book:</label>
                <span>{borrow.book.title}</span>
              </div>
              <div>
                <label>Member:</label>
                <span>{`${borrow.member.first_name} ${borrow.member.last_name}`}</span>
              </div>
            </div>
            <div className="half">
              <div>
                <label>Borrow date:</label>
                <span>{formatDate(borrow.borrow_date)}</span>
              </div>
              <div>
                <label>Return date:</label>
                <span>
                  {borrow.return_date ? formatDate(borrow.return_date) : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HistoryOfBorrow;
