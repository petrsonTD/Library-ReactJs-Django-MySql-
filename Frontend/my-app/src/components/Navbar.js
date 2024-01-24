import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
