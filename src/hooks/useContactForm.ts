import { useState } from "react";
import { toast } from "react-toastify";
import { ContactFormData } from "../types";

export const useContactForm = (
  onSubmit: (data: ContactFormData) => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    address: "",
    phone: "",
    relationship: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
  
      const url =
        "https://script.google.com/macros/s/AKfycbzaTEzFaEcHbqfivxNBVcp8_IwrEAkKZ9jGTVBatbAyI_BmtlalXOxWwqZHULZyKFm0/exec";
      const formattedData = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        relationship: formData.relationship,
      });
  
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formattedData.toString(),
        });
        const result = await res.text();
        const parsed = JSON.parse(result);
        toast.success(parsed.message, {
          position: "top-right",
          autoClose: 5000,
        });
  
        setFormData({ name: "", address: "", phone: "", relationship: "" });
        onClose();
      } catch (err) {
        console.error(err);
        toast.error("Submission failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

  return { formData, handleChange, handleSubmit, isLoading };
};
