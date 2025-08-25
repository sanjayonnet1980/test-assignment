import React, { useState } from "react";
import Button from "../atoms/Button";
import { toast } from "react-toastify";

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  address: string;
  phone: string;
  relationship: string;
}

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    address: "",
    phone: "",
    relationship: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Allow only digits
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const url = "https://script.google.com/macros/s/AKfycbzogs9-slL_2fV3nHdV2RHND6iUmKObeVXYEbVcuDJ6tebUBR_nH11c94JRgL5WhFm3pg/exec";
    const url =
      "https://script.google.com/macros/s/AKfycbxYKAImgaMWVmpUXZ82oRty_z4WPWWjwrRgrJtkOXfvx0UJ2GUwzq1PXqG9nBChHWdzTg/exec";
    let formattedData = new URLSearchParams({
      name: formData.name.toString(),
      phone: formData.phone.toString(),
      address: formData.address.toString(),
      relationship: formData.relationship.toString(),
    });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formattedData.toString(),
    })
      .then((res) => res.text())
      .then(() => {
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })

      .catch((err) => console.log(err));
    onSubmit(formData);
    setFormData({
      name: "",
      address: "",
      phone: "",
      relationship: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmitClick = () => {};
  const handleCancelClick = () => {
    onClose();
  };
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeIcon} onClick={onClose}>
          ×
        </button>
        <h2 style={styles.heading}>Add Family Members Contact Details</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <label style={styles.label}>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Relationship</label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.buttonGroup}>
            <Button
              label={"Cancel"}
              onClick={handleCancelClick}
              classname="cancelForm-button"
            />
            <Button
              label={"Submit"}
              onClick={handleSubmitClick}
              classname="submitForm-button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "20%",
    position: "relative",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
  },
  closeIcon: {
    position: "absolute",
    top: "12px",
    right: "12px",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "red",
  },
  heading: {
    marginBottom: "16px",
    fontSize: "1.05rem",
    color: "green",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "92%",
    padding: "10px",
    marginBottom: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    width: "92%",
    padding: "10px",
    height: "80px",
    marginBottom: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "vertical",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelButton: {
    padding: "10px 16px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ContactFormPopup;
