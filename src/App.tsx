import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewContactPage from "./components/ContactSectionPage/ViewContactPage";
import AddContactForm from "./components/AddContactForm";
import AddCreditCardForm from "./components/AddCrditCardForm";
import ViewCreditCardPage from "./components/CreditCardSectionPage/ViewCreditCardPage";
import AddMonthlyInv from "./components/AddMonthlyInvForm";
import ViewMonthlyInv from "./components/MonthlySectionPage/ViewMonthlyInvPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addcontact" element={<AddContactForm />} />
        <Route path="/viewcontact" element={<ViewContactPage />} />
        <Route path="/addcreditcard" element={<AddCreditCardForm />} />
        <Route path="/viewcreditcard" element={<ViewCreditCardPage />} />
        <Route path="/addmnthinv" element={<AddMonthlyInv />} />
        <Route path="/viewmnthinv" element={<ViewMonthlyInv />} />
      </Routes>
    </Router>
  );
};

export default App;
