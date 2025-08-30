import React from "react";
import { ToastContainer } from "react-toastify";
import Card from "./components/molecules/CommonCard";

const App = () => {
  return (
    <div style={styles.container}>
      <ToastContainer />
      <Card
        title="Contact Details"
        content="All the family members contact details to be add in google form..."
        buttonLabel={["Add Contact", "View Contact"]}
        message="contact"
      />
      <Card
        title="Credit Card Details"
        content="Need to be add credit card investment amount into the form...."
        buttonLabel={["Add Credit Card Inv.", "View CreditCard Inv."]}
        message="creditcard"
      />
      <Card
        title="Mutual Fund"
        content="SIP (Systematic Investment Plan) comments in the context of a financial dashboard or investment summary."
        buttonLabel={["SIP Details"]}
        message="sip"
      />
      <Card
        title="Stock Details"
        content="Month wise need to be track for amount investment for Stock"
        buttonLabel={["Investment Stock Details"]}
        message="stock"
      />
      <Card
        title="Salary Domain"
        content="Month wise need to be track for amount investment & salary"
        buttonLabel={["Salary Credit","Add Inv. Salary Details", "View Salary Details", "View Inv. Details"]}
        message="salary"
      />
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  
    backgroundImage:"url('/assets/assets1.jpg')",
    padding: '0 3% 0 3%',
    gap: '20px'
  },
};


export default App;

