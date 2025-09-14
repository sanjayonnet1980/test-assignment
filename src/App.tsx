import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./atoms/Navbar";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewContactPage from "./components/ContactSectionPage/ViewContactPage";
import AddContactForm from "./components/ContactSectionPage/AddContactForm";
import AddCreditCardForm from "./components/CreditCardSectionPage/AddCrditCardForm";
import ViewCreditCardPage from "./components/CreditCardSectionPage/ViewCreditCardPage";
import AddMonthlyInv from "./components/MonthlySectionPage/AddMonthlyInvForm";
import ViewMonthlyInv from "./components/MonthlySectionPage/ViewMonthlyInvPage";
import ExcelUploader from "./components/UploadExcelSheet";
import LoginPage from "./components/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/addcontact" element={<ProtectedRoute><AddContactForm /></ProtectedRoute>} />
        <Route path="/viewcontact" element={<ProtectedRoute><ViewContactPage /></ProtectedRoute>} />
        <Route path="/viewcsvcontact" element={<ProtectedRoute><ExcelUploader /></ProtectedRoute>} />
        <Route path="/addcreditcard" element={<ProtectedRoute><AddCreditCardForm /></ProtectedRoute>} />
        <Route path="/viewcreditcard" element={<ProtectedRoute><ViewCreditCardPage /></ProtectedRoute>} />
        <Route path="/addmnthinv" element={<ProtectedRoute><AddMonthlyInv /></ProtectedRoute>} />
        <Route path="/viewmnthinv" element={<ProtectedRoute><ViewMonthlyInv /></ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
