import React from "react";
import { Edit, Trash2, Save, XCircle } from "lucide-react";
import { Contact } from "./types";
import { useEditContact } from "./hooks";
import { deleteContact, updateContact } from "./api";

type Props = {
  data: Contact[];
  scriptUrl: string;
  refreshData: () => void;
};

const ContactTable: React.FC<Props> = ({ data, scriptUrl, refreshData }) => {
  const { editIndex, editData, startEdit, cancelEdit, updateField } =
    useEditContact();

  const handleSave = () => {
    updateContact(scriptUrl, editData, () => {
      cancelEdit();
      refreshData();
    });
  };

  return (
    <table className="popup-table">
      <thead>
        <tr>
          <th>SrNo.</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Relationship</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((contact, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {editIndex === index ? (
              <>
                {["name", "address", "phone", "relationship"].map((field) => (
                  <td key={field}>
                    <input
                      className="editable-input"
                      value={editData[field as keyof Contact]}
                      onChange={(e) =>
                        updateField(field as keyof Contact, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleSave}>
                    <Save size={20} color="#28a745" />
                  </button>
                  <button onClick={cancelEdit}>
                    <XCircle size={20} color="#dc3545" />
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{contact.name}</td>
                <td>{contact.address}</td>
                <td>{contact.phone}</td>
                <td>{contact.relationship}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="icon-button"
                    onClick={() => startEdit(contact, index)}
                  >
                    <Edit size={20} color="#007bff" />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => deleteContact(contact.srno, refreshData)}
                  >
                    <Trash2 size={20} color="#dc3545" />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
