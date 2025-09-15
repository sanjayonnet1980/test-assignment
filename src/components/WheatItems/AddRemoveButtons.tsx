import React from "react";
import { PlusCircle } from "react-bootstrap-icons";

interface AddRemoveButtonsProps {
  onAdd: () => void;
}

const AddRemoveButtons: React.FC<AddRemoveButtonsProps> = ({ onAdd }) => {
  return (
    <div className="text-end mb-3">
      <button type="button" className="btn btn-outline-primary" onClick={onAdd}>
        <PlusCircle className="me-1" /> Add More
      </button>
    </div>
  );
};

export default AddRemoveButtons;