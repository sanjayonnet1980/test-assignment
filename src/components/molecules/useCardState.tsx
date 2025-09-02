import { useState } from "react";
import { fetchFromScript } from "../../utils/fetchFromScript";
import { SIPEntry } from "./SIPPopupCard";

export const useCardState = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickedCredit, setClickedCredit] = useState<boolean>(false);
  const [clickedSIP, setClickedSIP] = useState<boolean>(false);
  const [clickedStock, setClickedStock] = useState<boolean>(false);
  const [clickedSalary, setClickedSalary] = useState<boolean>(false);
  const [viewSalary, setViewSalary] = useState<boolean>(false);
  const [viewCreditCard, setViewCreditCard] = useState<boolean>(false);
  const [clickView, setClickView] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [salarydata, setSalaryData] = useState([]);
  const [CreditCardInvData, setCreditCardInvData] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isSalaryCredit, setIsSalaryCredit] = useState<boolean>(false);
  const [isViewSalary, setIsViewSalary] = useState<boolean>(false);
  const [isViewSIP, setIsViewSIP] = useState<boolean>(false);
  const [viewSalaryData, setViewSalaryData] = useState([]);
  const [sipList, setSipList] = useState<SIPEntry[]>([]);
  const refreshData = async () => {
    setisLoading(true);
    try {
      const result = await fetchFromScript();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setisLoading(false);
    }
  };

  return {
    clicked,
    setClicked,
    data,
    setData,
    isLoading,
    setisLoading,
    refreshData,
    isHovered,
    setIsHovered,
    clickedCredit,
    setClickedCredit,
    clickedSIP,
    setClickedSIP,
    clickedStock,
    setClickedStock,
    clickedSalary,
    setClickedSalary,
    viewSalary,
    setViewSalary,
    viewCreditCard,
    setViewCreditCard,
    clickView,
    setClickView,
    salarydata,
    setSalaryData,
    CreditCardInvData,
    setCreditCardInvData,
    isSalaryCredit,
    setIsSalaryCredit,
    isViewSalary,
    setIsViewSalary,
    viewSalaryData,
    setViewSalaryData,
    isViewSIP, 
    setIsViewSIP,
    sipList, 
    setSipList,
  };
};
