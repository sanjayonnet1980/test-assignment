import React, { useState } from "react";
import Button from "../atoms/Button";
import ContactForm from "./ContactFormData";

interface CardProps {
  title: string;
  content: string;
  buttonLabel?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  buttonLabel = "Click Me",
}) => {
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered
          ? "0 6px 20px rgba(0,0,0,0.3)"
          : styles.card.boxShadow,
        opacity: isHovered ? 0.9 : 1,
        transition: "box-shadow 0.3s ease, opacity 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.header}>{title}</div>
      <div style={styles.body}>{content}</div>
      <Button
        label={buttonLabel}
        onClick={handleClick}
        classname="gradient-button"
      />
      <ContactForm
        isOpen={clicked}
        onClose={() => setClicked(false)}
        onSubmit={handleClick}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: "2px solid #b90303ff",
    borderRadius: "8px",
    padding: "20px",
    minHeight: "240px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    backgroundColor: "#89f79aff",
    maxWidth: "18%",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "green",
  },
  body: {
    fontSize: "1rem",
    marginBottom: "90px",
    marginTop: "50px",
  },
  message: {
    marginTop: "12px",
    color: "green",
    fontWeight: "bold",
  },
};

export default Card;
