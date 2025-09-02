import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { cardData } from "./config/CardConfig";
const Card = React.lazy(() => import("./components/Card"));

const App = () => (
  <div style={styles.container}>
    <ToastContainer />
    <Suspense fallback={<div>Loading...</div>}>
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </Suspense>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    height: "100vh",
    backgroundImage: "url('/assets/assets1.jpg')",
    padding: "0% 1%",
    gap: "20px",
    overflowY: 'auto',
    flexWrap: "nowrap", 
  },
};

export default App;
