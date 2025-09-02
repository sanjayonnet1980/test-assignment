// services/mutualFundService.ts
import axios from "axios";
import { SIPEntry } from "../components/molecules/SIPPopupCard";

const BASE_URL = "http://localhost:3001/mutualfund";

export const fetchMutualFundData = async (): Promise<SIPEntry[]> => {
  const response = await axios.get<SIPEntry[]>(BASE_URL);
  return response.data;
};

export const updateMutualFundEntry = async (entry: SIPEntry): Promise<void> => {
  await axios.put(`${BASE_URL}/${entry.id}`, entry);
};

export const deleteMutualFundEntry = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};