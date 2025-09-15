import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const BusinessDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <nav className="card border border border-warning">
        <div className="card-body">
          <p className="fw-bold text-secondary text-uppercase">
            Designed for clarity and speed, This dashboard empowers informed
            decision-making.
          </p>
          <button
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
            }}
            className="btn btn-outline-secondary"
            onClick={() => navigate("/dashboard")}
            title="Back to Dashboard"
          >
            <ArrowLeftCircle size={24} />
          </button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/dailysellitems"
                >
                  <i className="bi bi-bag-fill me-1"></i>Daily Sell Items
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/rice"
                >
                  <i className="bi bi-bag-fill me-1"></i>Add Buying Rice Items
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/wheat"
                >
                  <i className="bi bi-bag-fill me-1"></i> Add Buying Wheats
                  Items
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/viewwheat"
                >
                  <i className="bi bi-bag-fill me-1"></i> View Stock
                  Items
                </Link>
              </button>
            </li>
          </ul>
        </div>
        <div className="card-footer text-primary">
          Changes won’t be saved until you click ‘Confirm’ || Powered by Sanjay
          Sah@2025
        </div>
      </nav>
    </div>
  );
};

export default BusinessDashboard;
