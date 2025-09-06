import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addContact } from "../features/contact/contactSlice";
import { Omit } from "utility-types";
import { Contact } from "../types/contactTypes";
import SlidingHeaderText from "../atoms/SlidingText";

type ContactFormData = Omit<Contact, "id">;

const AddContactForm = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<ContactFormData, "id">>({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  const validateForm = () => {
    const newErrors = {
      name:
        formData.name.trim().length < 2
          ? "Name must be at least 2 characters."
          : "",
      address:
        formData.address.trim().length < 5
          ? "Address must be at least 5 characters."
          : "",
      phone: !/^\d{10}$/.test(formData.phone) ? "Phone must be 10 digits." : "",
      relation:
        formData.relation.trim().length < 3
          ? "Relation must be at least 3 characters."
          : "",
    };

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const trimmedValue = value.trim();
  const sanitizedValue = name === "phone" ? value.replace(/\D/g, "") : value;

  // Update form data
  setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

  // Validate only the field being typed
  let errorMsg = "";
  switch (name) {
    case "name":
      errorMsg = trimmedValue.length >= 2 ? "" : "Name must be at least 2 characters.";
      break;
    case "address":
      errorMsg = trimmedValue.length >= 5 ? "" : "Address must be at least 5 characters.";
      break;
    case "phone":
      errorMsg = /^\d{10}$/.test(sanitizedValue)
        ? ""
        : "Phone must be exactly 10 digits.";
      break;
    case "relation":
      errorMsg = trimmedValue.length >= 3 ? "" : "Relation must be at least 3 characters.";
      break;
  }

  // Update only the error for the current field
  setErrors((prev) => ({ ...prev, [name]: errorMsg }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.relation
    ) {
      validateForm();
      return;
    }

    setLoading(true); // Start loading

    try {
      await dispatch(addContact(formData as Omit<Contact, "id">));
      setFormData({ name: "", address: "", phone: "", relation: "" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the Investment Dashboard — Real-time updates ahead!" />
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="contact-form">
            <h3 className="form-title">Add Contact for Information</h3>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="form-input"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="form-input"
              />
              {errors.address && (
                <span className="error-text">{errors.address}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className="form-input"
                pattern="\d{10}"
                maxLength={10}
                inputMode="numeric"
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="relation">Relation:</label>
              <input
                type="text"
                name="relation"
                id="relation"
                value={formData.relation}
                onChange={handleChange}
                placeholder="e.g. Friend, Colleague"
                className="form-input"
              />
              {errors.relation && (
                <span className="error-text">{errors.relation}</span>
              )}
            </div>

            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Adding..." : "Add Contact"}
            </button>
            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
          </form>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default AddContactForm;
