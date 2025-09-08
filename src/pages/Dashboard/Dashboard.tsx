import { Link } from "react-router-dom";

const Dashboard = () => (
  <div className="page-container">
    <nav className="card">
      <div className="card-body">
        <h1>Dashboard</h1>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="btn btn-outline-success w-50">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/addcontact"
              >
                <i className="bi bi-person-lines-fill me-1"></i> Add Contact
                Details
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-success w-50 mt-4">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/viewcontact"
              >
                <i className="bi bi-person-lines-fill me-1"></i> View Contact
                Details
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-success w-50 mt-4">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/addcreditcard"
              >
                <i className="bi bi-credit-card-2-front-fill me-1"></i> Add
                Credit Card Information
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-success w-50 mt-4">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/viewcreditcard"
              >
                <i className="bi bi-credit-card-2-front-fill me-1"></i> View
                Credit Card Information
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-success w-50 mt-4">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/addmnthinv"
              >
                <i className="bi bi-credit-card-2-front-fill me-1"></i> Add
                Monthly Investment
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-success w-50 mt-4">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/viewmnthinv"
              >
                <i className="bi bi-credit-card-2-front-fill me-1"></i> View
                Monthly Investment
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Dashboard;
