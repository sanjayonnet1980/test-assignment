import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactsPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
