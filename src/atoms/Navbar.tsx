import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
          
        </ul>

        <form className="d-flex" onSubmit={handleSearch}>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
