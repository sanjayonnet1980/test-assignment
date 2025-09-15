import { Link } from "react-router-dom";

const Main = () => (
  <div className="page-container">
    <nav className="card border border border-warning">
      <div className="card-body">
        <p className="fw-bold text-secondary text-uppercase">
          Designed for clarity and speed, This dashboard empowers informed
          decision-making.
        </p>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="btn fancy-border w-50 mt-4 animated-button">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/business"
              >
                <i className="bi bi-bag-fill me-1"></i> Business
              </Link>
            </button>
          </li>
          <li className="nav-item">
            <button className="btn fancy-border w-50 mt-4 animated-button">
              <Link
                className="nav-link success fw-bold fst-italic me-1"
                to="/personal"
              >
                <i className="bi bi-person-lines-fill me-1"></i> Personal
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

export default Main;
