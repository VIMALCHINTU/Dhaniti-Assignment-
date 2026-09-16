import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        DHANITI
      </div>

      <div className="nav-links">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/applications">
          Applications
        </Link>

        <Link to="/add-application">
          + Add Application
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;