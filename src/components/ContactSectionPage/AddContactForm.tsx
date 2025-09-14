import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Omit } from "utility-types";
import { Contact } from "../../types/contactTypes";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useAppDispatch } from "../../hooks";
import { addContact } from "../../features/contact/contactSlice";
import SlidingHeaderText from "../../atoms/SlidingText";
import ContactFormInput from "./ContactFormInput";
import LoaderOverlay from "./LoaderOverlay";

type ContactFormData = Omit<Contact, "id">;

const AddContactForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormData, string>>({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Friend",
    "Colleague",
    "Family",
    "Investor",
    "Mentor",
    "Partner",
    "Client",
  ];

  const validateField = (
    name: keyof ContactFormData,
    value: string
  ): string => {
    const trimmed = value.trim();
    switch (name) {
      case "name":
        return trimmed.length >= 2 ? "" : "Name must be at least 2 characters.";
      case "address":
        return trimmed.length >= 5
          ? ""
          : "Address must be at least 5 characters.";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone must be exactly 10 digits.";
      case "relation":
        return trimmed.length >= 3
          ? ""
          : "Relation must be at least 3 characters.";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitized = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof ContactFormData, sanitized),
    }));
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof ContactFormData] = validateField(
        key as keyof ContactFormData,
        formData[key as keyof ContactFormData]
      );
      return acc;
    }, {} as Record<keyof ContactFormData, string>);
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await dispatch(addContact(formData));
      setFormData({ name: "", address: "", phone: "", relation: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card border border border-warning">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the Investment Dashboard — Real-time updates ahead!" />
        </div>
        <div className="card-body">
          <div className="form-header d-flex justify-content-center gap-5 mb-5">
            <h2>📇 Add Contact Information</h2>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <ContactFormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              error={errors.name}
            />
            <ContactFormInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              error={errors.address}
            />
            <ContactFormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              error={errors.phone}
              inputMode="numeric"
              maxLength={10}
              pattern="\d{10}"
            />
            <ContactFormInput
              label="Relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              placeholder="e.g. Friend, Colleague"
              error={errors.relation}
              list="relation-options"
            />
            <datalist id="relation-options">
              {suggestions.map((item, idx) => (
                <option key={idx} value={item} />
              ))}
            </datalist>
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Adding..." : "Add Contact"}
            </button>
            {loading && <LoaderOverlay />}
          </form>
        </div>
        <div className="card-footer text-primary">Your contact details are securely stored · Need help? Reach out to support</div>
      </div>
    </div>
  );
};

export default AddContactForm;
