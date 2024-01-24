import { Link } from "react-router-dom";
import "./DashBoard.css";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <h1>DashBoard</h1>
      <button>
        <Link to="/books">Books</Link>
      </button>
      <button>
        <Link to="/members">Members</Link>
      </button>
      <button>
        <Link to="/history">History</Link>
      </button>
    </div>
  );
};

export default DashBoard;
