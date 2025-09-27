import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import AtomButton from "../../atoms/AtomButton";

const PersonalDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <nav className="card border border border-warning">
        <div className="card-body">
          <p className="fw-bold text-secondary text-uppercase">
            Designed for clarity and speed, This dashboard empowers informed
            decision-making.
          </p>

          <AtomButton
            icon={<ArrowLeftCircle size={24} />}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
            }}
            className="btn btn-outline-secondary"
            onClick={() => navigate("/dashboard")}
            title="Back to Dashboard"
            label=""
            disabled={false}
          />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
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
              <button className="btn fancy-border w-50 mt-4 animated-button">
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
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/viewcsvcontact"
                >
                  <i className="bi bi-person-lines-fill me-1"></i>Upload File &
                  View Contact Details
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
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
              <button className="btn fancy-border w-50 mt-4 animated-button">
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
              <button className="btn fancy-border w-50 mt-4 animated-button">
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
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/viewmnthinv"
                >
                  <i className="bi bi-credit-card-2-front-fill me-1"></i> View
                  Monthly Investment
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn fancy-border w-50 mt-4 animated-button">
                <Link
                  className="nav-link success fw-bold fst-italic me-1"
                  to="/todoinv"
                >
                  <i className="bi bi-credit-card-2-front-fill me-1"></i>Add & View
                  Todo Monthly Investment Plans
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

export default PersonalDashboard;
