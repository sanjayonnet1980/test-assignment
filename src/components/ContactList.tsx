import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addContact } from "../features/contact/contactSlice";
import { Omit } from "utility-types";
import { Contact } from "../types/contactTypes";

type ContactFormData = Omit<Contact, "id">;

const AddContactForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Omit<ContactFormData, "id">>({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.relation) return;
    dispatch(addContact(formData as Omit<Contact, "id">));
    setFormData({ name: "", address: "", phone: "", relation: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>Add Contact</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="text"
        name="relationship"
        value={formData.relation}
        onChange={handleChange}
        placeholder="Relationship"
        required
        style={{ marginRight: "0.5rem" }}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
