import React from "react";
import { ToastContainer } from "react-toastify";
import Card from "./components/molecules/ContactDetailsCard";




const App = () => {
  return (
    <div style={styles.container}>
      <ToastContainer />
      <Card
        title="Person Contact Details"
        content="All the family members contact details to be add in google form..."
        buttonLabel="ACTION TRIGGER"
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
    backgroundColor: '#f0f4f8', // optional backdrop    
    backgroundImage:"url('/assets/assets1.jpg')"
  },
};


export default App;

