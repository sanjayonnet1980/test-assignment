import React from "react";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import SlidingHeaderText from "./SlidingText";

interface headerProps{
  text: string;
}

const HeaderSection: React.FC<headerProps> = ({text}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="card-header">
        <SlidingHeaderText text="🚀 Welcome to the Investment Dashboard — Real-time updates ahead!" />
      </div>
      <div className="header-title d-flex align-items-center justify-content-between">
        <h2 className="mx-auto">📇 {text}</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
        >
          <ArrowLeftCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
