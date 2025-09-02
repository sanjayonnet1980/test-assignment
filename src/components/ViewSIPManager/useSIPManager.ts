import { useCallback, useEffect, useState } from "react";
import { fetchMutualFundData } from "../../services/mutualFundService";
import { SIPEntry } from "../molecules/SIPPopupCard";

export const useSIPManager = (initialList: SIPEntry[]) => {
  const [sipListData, setSipListData] = useState<SIPEntry[]>(initialList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchMutualFundData();
      setSipListData(data);
    } catch (error) {
      console.error("Failed to fetch mutual fund data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { sipListData, isLoading, loadData };
};