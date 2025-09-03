import { useState } from "react";
import { SIPEntry } from "./type";

export const useSIPRowEdit = () => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<SIPEntry>>({});

  const startEdit = (entry: SIPEntry) => {
    setEditRowId(entry.id);
    setEditValues(entry);
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditValues({});
  };

  const handleChange = (field: keyof SIPEntry, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  return {
    editRowId,
    editValues,
    startEdit,
    cancelEdit,
    handleChange,
    setEditRowId,
    setEditValues,
  };
};