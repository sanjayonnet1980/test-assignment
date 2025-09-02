import React from "react";
import Button from "../atoms/Button";
import { styles } from "./styles";

type Props = {
  title: string;
  content: string;
  buttonLabel?: string[];
  onClick: (label: string) => void;
};

const CardBody: React.FC<Props> = ({ title, content, buttonLabel, onClick }) => (
  <>
    <div style={styles.header}>{title}</div>
    <div style={styles.body}>{content}</div>
    <div style={styles.cardFooter}>
      {buttonLabel?.map((label, index) => (
        <Button
          key={index}
          label={label}
          onClick={() => onClick(label)}
          classname="gradient-button"
          disabled={false}
        />
      ))}
    </div>
  </>
);

export default CardBody;