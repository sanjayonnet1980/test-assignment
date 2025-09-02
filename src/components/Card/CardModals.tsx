import React from "react";
import ContactFormPopup from "../molecules/ContactFormData";
import TabbedFormPopup from "../molecules/TabbedFormPopup";
import ViewContact from "../ViewContact";
import ViewSIPManager from "../ViewSIPManager";
import ViewCreditInv from "../ViewCreditInv";
import { PopupCardForm } from "../molecules/PopupSalaryCardForm";
import SalaryCreditPopupCard from "../molecules/SalaryCreditPopupCard";
import SIPCardForm from "../molecules/SIPCardForm";
import ViewInvSalary from "../ViewInvestmentSalaryDetails";
import ViewMonthlySalary from "../ViewMonthlySalary";

const CardModals = (props: any) => (
  <>
    <ContactFormPopup
      isOpen={props.clicked}
      onClose={() => props.setClicked(false)}
      onSubmit={() => {}}
    />
    <TabbedFormPopup
      isOpen={props.clickedCredit}
      onClose={() => props.setClickedCredit(false)}
    />
    <ViewContact
      isOpen={props.clickView}
      onClose={() => props.setClickView(false)}
      
      {...props}
    />
    <ViewSIPManager
      isOpen={props.isViewSIP}
      onClose={() => props.setIsViewSIP(false)}
      {...props}
    />
    <ViewInvSalary
      {...props}
      data={props.salaryInvdata}
      isOpen={props.viewInvSalary}
      onClose={() => props.setViewInvSalary(false)}
      isLoading={props.isLoading}
    />
    <ViewMonthlySalary
      {...props}
      data={props.salarydata}
      isOpen={props.isViewSalary}
      onClose={()=>props.setIsViewSalary(false)}
    />
    <ViewCreditInv
      {...props}
      data={props.CreditCardInvData}
      isOpen={props.viewCreditCard}
      onClose={() => props.setViewCreditCard(false)}
      isLoading={props.isLoading}
    />
    <PopupCardForm
      isOpen={props.clickedSalary}
      onClose={() => props.setClickedSalary(false)}
    />
    <SalaryCreditPopupCard
      isOpen={props.isSalaryCredit}
      onClose={() => props.setIsSalaryCredit(false)}
    />
    <SIPCardForm
      isOpen={props.clickedSIP}
      onClose={() => props.setClickedSIP(false)}
    />
  </>
);

export default CardModals;
