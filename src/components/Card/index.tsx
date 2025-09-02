import React from "react";
import { styles } from "./styles";
import { CardProps } from "./types";
import { handleClick } from "./handleClick";
import CardBody from "./CardBody";
import CardModals from "./CardModals";
import { useCardState } from "../molecules/useCardState";

const Card: React.FC<CardProps> = ({ title, content, buttonLabel, message }) => {
  const state = useCardState();

  const onClick = (label: string) => {
    handleClick(label, message, state);
  };

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: state.isHovered ? "0 6px 20px rgba(0,0,0,0.3)" : styles.card.boxShadow,
        opacity: state.isHovered ? 0.9 : 1,
        transition: "all 0.3s ease",
        marginTop: '11%',
        paddingTop: '1%'
      }}
      onMouseEnter={() => state.setIsHovered(false)}
      onMouseLeave={() => state.setIsHovered(false)}
    >
      <CardBody title={title} content={content} buttonLabel={buttonLabel} onClick={onClick} />
      <CardModals {...state} />
    </div>
  );
};

export default Card;