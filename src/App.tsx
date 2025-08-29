import React from "react";
import { ToastContainer } from "react-toastify";
import Card from "./components/molecules/ContactDetailsCard";

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
        buttonLabel={["Investment Details"]}
        message="creditcard"
      />
      <Card
        title="SIP Investment"
        content="SIP (Systematic Investment Plan) comments in the context of a financial dashboard or investment summary."
        buttonLabel={["SIP Details"]}
        message="sip"
      />
      <Card
        title="Stock Investment"
        content="Month wise need to be track for amount investment for Stock"
        buttonLabel={["Investment Stock Details"]}
        message="stock"
      />
      <Card
        title="Salary Investment"
        content="Month wise need to be track for amount investment which we got from salary"
        buttonLabel={["Investment Salary Details"]}
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

