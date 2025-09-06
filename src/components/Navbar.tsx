import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", search);
    // You can route or filter based on search here
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-box p-2.5 mb-2.5">
      <Link className="navbar-brand" to="/">
        <i className="bi bi-list" style={{ fontSize: "2rem", fontWeight: 'bold', color: 'white' }}>
        </i>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link text-light fw-bold fst-italic me-1"
              to="/"
            >
              <i className="bi bi-person-lines-fill me-1"></i> Add Contact Details
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fw-bold fst-italic me-1"
              to="/"
            >
              <i className="bi bi-person-lines-fill me-1"></i> View Contact Details
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fw-bold fst-italic me-1"
              to="/creditcard"
            >
              <i className="bi bi-credit-card-2-front-fill me-1"></i> Credit
              Card
            </Link>
          </li>
        </ul>

        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
