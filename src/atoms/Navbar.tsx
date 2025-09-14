import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Navbar = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg shadow-box p-1 mb-1">
      <Link className="navbar-brand" to="/dashboard">
        <i
          className="bi bi-list"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}
        ></i>
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <form className="d-flex" onSubmit={handleSearch}></form>
        {isAuthenticated && (
          <div className="d-flex align-items-center ms-auto gap-3">
            <div className="d-flex flex-column align-items-center">
              <img
                src="/images/sanjayPhoto.jpg"
                alt="User Avatar"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
              />
              <span
                className="text-white fw-semibold mt-1"
                style={{ fontSize: "0.9rem" }}
              >
                {user &&
                  user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()}
              </span>
            </div>
            <button
              className="btn btn-outline-light me-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
