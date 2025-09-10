import { Contact } from "../../types/contactTypes";
import { PencilSquare, Trash} from "react-bootstrap-icons";

export interface ReadOnlyRowProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactReadOnlyRow: React.FC<ReadOnlyRowProps> = ({ contact, onEdit, onDelete }) => (
  <>
    <td>{contact.name}</td>
    <td>{contact.address}</td>
    <td>{contact.phone}</td>
    <td>{contact.relation}</td>
    <td style={{ display: "flex", gap: "0.5rem" }}>
      <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(contact)}>
        <PencilSquare size={20}/>
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(contact.id)}>
        <Trash size={20}/>
      </button>
    </td>
  </>
);

export default ContactReadOnlyRow;