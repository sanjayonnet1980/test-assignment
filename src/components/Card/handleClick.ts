import { fetchMutualFundData } from "../../services/mutualFundService";
import { fetchFromCreditCardInv } from "../../utils/fetchFromCreditCardInv";
import { fetchFromSalaryMnth } from "../../utils/fetchFromMnthSalary";
import { fetchFromSalary } from "../../utils/fetchFromSalary";
import { fetchFromScript } from "../../utils/fetchFromScript";

export const handleClick = async (
  label: string,
  message: string | undefined,
  actions: any
) => {
  const {
    setClicked,
    setClickView,
    setisLoading,
    setData,
    setClickedCredit,
    setViewCreditCard,
    setCreditCardInvData,
    setClickedSIP,
    setIsViewSIP,
    setSipList,
    setClickedStock,
    setClickedSalary,
    setIsSalaryCredit,
    setIsViewSalary,
    setViewInvSalary,
    setSalaryInvData,
    setSalaryData,
  } = actions;

  try {
    switch (true) {
      case message === "contact" && label === "Add Contact":
        setClicked(true);
        break;

      case message === "contact" && label === "View Contact":
        setClickView(true);
        setisLoading(true);
        const contactData = await fetchFromScript();
        setData(contactData);
        break;

      case message === "creditcard" && label === "Add Credit Card Inv.":
        setClickedCredit(true);
        break;

      case message === "creditcard" && label === "View CreditCard Inv.":
        setViewCreditCard(true);
        setisLoading(true);
        const creditData = await fetchFromCreditCardInv();
        setCreditCardInvData(creditData);
        break;

      case message === "sip" && label === "Add SIP":
        setClickedSIP(true);
        setisLoading(true);
        break;

      case message === "sip" && label === "View SIP Details":
        const sipData = await fetchMutualFundData();
        setSipList(sipData);
        setIsViewSIP(true);
        break;

      case message === "stock":
        setClickedStock(true);
        break;

      case message === "salary" && label === "Add Inv. Salary Details":
        setClickedSalary(true);
        break;

      case message === "salary" && label === "Salary Credit":
        setIsSalaryCredit(true);
        break;

      case message === "salary" && label === "View Salary Details":
        setIsViewSalary(true);
        setisLoading(true);
        const salaryMonthData = await fetchFromSalaryMnth();
        setSalaryData(salaryMonthData);
        break;

      case message === "salary" && label === "View Inv. Details":
        setViewInvSalary(true);
        setisLoading(true);
        const salaryData = await fetchFromSalary();
        setSalaryInvData(salaryData);
        break;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setisLoading(false);
  }
};
