import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./atoms/Navbar";
import "./App.scss";
import ViewContactPage from "./components/ContactSectionPage/ViewContactPage";
import AddContactForm from "./components/ContactSectionPage/AddContactForm";
import AddCreditCardForm from "./components/CreditCardSectionPage/AddCrditCardForm";
import ViewCreditCardPage from "./components/CreditCardSectionPage/ViewCreditCardPage";
import AddMonthlyInv from "./components/MonthlySectionPage/AddMonthlyInvForm";
import ViewMonthlyInv from "./components/MonthlySectionPage/ViewMonthlyInvPage";
import ExcelUploader from "./components/UploadExcelSheet";
import LoginPage from "./components/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BusinessDashboard from "./pages/Dashboard/BusinessDashboard";
import PersonalDashboard from "./pages/Dashboard/PersonalDashboard";
import Main from "./pages/Dashboard/Main";
import BuyWheatForm from "./components/WheatItems/BuyWheatForm";
import BuyRiceForm from "./components/WheatItems/BuyRiceForm";
import SellProductTable from "./components/Products/SellProductTable";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // Add other public routes if needed

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <ProtectedRoute><Navbar /></ProtectedRoute>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/business" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/personal" element={<ProtectedRoute><PersonalDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/addcontact" element={<ProtectedRoute><AddContactForm /></ProtectedRoute>} />
        <Route path="/viewcontact" element={<ProtectedRoute><ViewContactPage /></ProtectedRoute>} />
        <Route path="/viewcsvcontact" element={<ProtectedRoute><ExcelUploader /></ProtectedRoute>} />
        <Route path="/addcreditcard" element={<ProtectedRoute><AddCreditCardForm /></ProtectedRoute>} />
        <Route path="/viewcreditcard" element={<ProtectedRoute><ViewCreditCardPage /></ProtectedRoute>} />
        <Route path="/addmnthinv" element={<ProtectedRoute><AddMonthlyInv /></ProtectedRoute>} />
        <Route path="/viewmnthinv" element={<ProtectedRoute><ViewMonthlyInv /></ProtectedRoute>} />
        <Route path="/wheat" element={<ProtectedRoute><BuyWheatForm /></ProtectedRoute>} />
        <Route path="/rice" element={<ProtectedRoute><BuyRiceForm /></ProtectedRoute>} />
        <Route path="/dailysellitems" element={<ProtectedRoute><SellProductTable /></ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
};


export default App;
