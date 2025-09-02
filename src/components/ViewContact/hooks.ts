// hooks.ts
import { useState } from "react";
import { Contact } from "./types";

export const useEditContact = () => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Contact>({
    srno: 0,
    name: "",
    address: "",
    phone: "",
    relationship: "",
  });

  const startEdit = (contact: Contact, index: number) => {
    setEditIndex(index);
    setEditData({ ...contact });
  };

  const cancelEdit = () => setEditIndex(null);

  const updateField = (field: keyof Contact, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return { editIndex, editData, startEdit, cancelEdit, updateField };
};