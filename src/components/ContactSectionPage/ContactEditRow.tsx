import { Check2, X } from "react-bootstrap-icons";
export interface EditRowProps {
  editForm: {
    name: string;
    address: string;
    phone: string;
    relation: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ContactEditRow: React.FC<EditRowProps> = ({
  editForm,
  onChange,
  onSave,
  onCancel,
}) => (
  <>
    {Object.entries(editForm).map(([key, value]) => (
      <td key={key}>
        <input
          type="text"
          name={key}
          value={value}
          onChange={onChange}
          className="form-control"
        />
      </td>
    ))}
    <td style={{ display: "flex", gap: "0.5rem" }}>
      <button className="btn btn-sm btn-success" onClick={onSave}>
        <Check2 size={20} />
      </button>
      <button className="btn btn-sm btn-secondary" onClick={onCancel}>
        <X size={20} />
      </button>
    </td>
  </>
);

export default ContactEditRow;
