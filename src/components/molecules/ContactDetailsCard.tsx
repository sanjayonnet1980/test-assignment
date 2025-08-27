import React, { useState } from "react";
import Button from "../atoms/Button";
import ContactForm from "./ContactFormData";
import TabbedFormPopup from "./TabbedFormPopup";
import SIPCardForm from "./SIPCardForm";

interface CardProps {
  title: string;
  content: string;
  buttonLabel?: string;
  message?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  buttonLabel = "Click Me",
  message,
}) => {
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedCredit, setClickedCredit] = useState(false);
  const [clickedSIP, setClickedSIP] = useState(false);
  const [clickedStock, setClickedStock] = useState(false);
  const [clickedSalary, setClickedSalary] = useState(false);

  const handleClick = () => {
    if (message === "contact") setClicked(true);
    else if (message === "creditcard") setClickedCredit(true);
    else if (message === "sip") setClickedSIP(true);
    else if (message === "stock") setClickedStock(true);
    else if (message === "salary") setClickedSalary(true);
  };

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered
          ? "0 6px 20px rgba(0,0,0,0.3)"
          : styles.card.boxShadow,
        opacity: isHovered ? 0.9 : 1,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.header}>{title}</div>
      <div style={styles.body}>{content}</div>
      <div style={styles.cardFooter}>
        <Button
          label={buttonLabel}
          onClick={handleClick}
          classname="gradient-button"
          disabled={false}
        />
      </div>

      <ContactForm
        isOpen={clicked}
        onClose={() => setClicked(false)}
        onSubmit={handleClick}
      />
      <TabbedFormPopup
        isOpen={clickedCredit}
        onClose={() => setClickedCredit(false)}
      />
      <SIPCardForm
        isOpen={clickedSIP}
        onClose={() => setClickedSIP(false)}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: "2px solid #b90303ff",
    borderRadius: "8px",
    padding: "20px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    backgroundColor: "#89f79aff",
    width: "18%",
  },
  cardFooter: {
    left: "0",
    width: "100%",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "green",
  },
  body: {
    fontSize: "1rem",
    marginBottom: "20px",
    marginTop: "20px",
  },
  message: {
    marginTop: "12px",
    color: "green",
    fontWeight: "bold",
  },
};

export default Card;
