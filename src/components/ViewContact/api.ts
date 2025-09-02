// api.ts
import { fetchPut } from "../../utils/fetchPut";
import { Contact } from "./types";
import { toast } from "react-toastify";

export const deleteContact = async (srno: number, refreshData: () => void) => {
  const body = new URLSearchParams({ mode: "delete", srno: srno.toString() });
  refreshData();
  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxzPnzTm6LYRDvl4cS6SLxHyziOrCOuwxhJ--RLywwaJMAtf1J5XfuRA3PL5vzBuJY/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    const result = await res.json();
    refreshData();

    if (result.success) {
      toast.success("Deleted Successfully!");
    } else {
      console.error("Delete failed:", result.message);
    }
  } catch (err) {
    console.error("Network error during delete:", err);
  }
};

export const updateContact = async (
  scriptUrl: string,
  contact: Contact,
  onSuccess: () => void
) => {
  const response = await fetchPut(scriptUrl, contact);
  if (response) {
    toast.success("✅ Contact updated via PUT!");
    onSuccess();
  } else {
    toast.error("❌ PUT update failed.");
  }
};
