import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewContactPage from "./components/ViewContactPage";
import AddContactForm from "./components/AddContactForm";
import AddCreditCardForm from "./components/AddCrditCardForm";
import ViewCreditCardPage from "./components/ViewCreditCardPage";

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
      </Routes>
    </Router>
  );
};

export default App;
