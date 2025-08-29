import React, { useState } from "react";
import Button from "../atoms/Button";
import ContactForm from "./ContactFormData";
import TabbedFormPopup from "./TabbedFormPopup";
import SIPCardForm from "./SIPCardForm";
import ViewContact from "./ViewContact";
import { fetchFromScript } from "../../utils/fetchFromScript";
import { PopupCardForm } from "./PopupSalaryCardForm";
import { fetchFromSalary } from "../../utils/fetchFromSalary";
import ViewSalary from "./ViewSalary";
import ViewCreditInv from "./ViewCreditInv";
import { fetchFromCreditCardInv } from "../../utils/fetchFromCreditCardInv";

interface CardProps {
  title: string;
  content: string;
  buttonLabel?: string[];
  message?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  buttonLabel,
  message,
}) => {
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedCredit, setClickedCredit] = useState(false);
  const [clickedSIP, setClickedSIP] = useState(false);
  const [clickedStock, setClickedStock] = useState(false);
  const [clickedSalary, setClickedSalary] = useState(false);
  const [viewSalary, setViewSalary] = useState(false);
  const [viewCreditCard, setViewCreditCard] = useState(false);
  const [clickView, setClickView] = useState(false);
  const [data, setData] = useState([]);
  const [salarydata, setSalaryData] = useState([]);
  const [CreditCardInvData, setCreditCardInvData] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  const handleClick = (text: string) => {
    if (message === "contact" && text === "Add Contact") setClicked(true);
    if (message === "contact" && text === "View Contact") {
      setClickView(true);
      setisLoading(true);
      fetchFromScript()
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setisLoading(false); // Stop loading
        });
    } else if (message === "creditcard" && text === "Add Credit Card Inv.")
      setClickedCredit(true);
    else if (message === "creditcard" && text === "View CreditCard Inv.") {
      setViewCreditCard(true);
      setisLoading(true);
      fetchFromCreditCardInv()
        .then((result) => {
          setCreditCardInvData(result);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setisLoading(false); // Stop loading
        });
    } else if (message === "sip") setClickedSIP(true);
    else if (message === "stock") setClickedStock(true);
    else if (message === "salary" && text === "Add Inv. Salary Details")
      setClickedSalary(true);
    else if (message === "salary" && text === "View Inv. Details") {
      setViewSalary(true);
      setisLoading(true);
      fetchFromSalary()
        .then((result) => {
          setSalaryData(result);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setisLoading(false); // Stop loading
        });
    }
  };

  const refreshData = async () => {
    setisLoading(true);
    fetchFromScript()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setisLoading(false); // Stop loading
      });
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
        {buttonLabel?.map((label: string, index: number) => (
          <Button
            label={label}
            key={index}
            onClick={() => handleClick(label)}
            classname="gradient-button"
            disabled={false}
          />
        ))}
      </div>

      <ContactForm
        isOpen={clicked}
        onClose={() => setClicked(false)}
        onSubmit={() => handleClick}
      />
      <TabbedFormPopup
        isOpen={clickedCredit}
        onClose={() => setClickedCredit(false)}
      />
      <ViewContact
        data={data}
        isOpen={clickView}
        onClose={() => setClickView(false)}
        isLoading={isLoading}
        refreshData={refreshData}
      />
      <ViewSalary
        data={salarydata}
        isOpen={viewSalary}
        onClose={() => setViewSalary(false)}
        isLoading={isLoading}
      />
      <ViewCreditInv
        data={CreditCardInvData}
        isOpen={viewCreditCard}
        onClose={() => setViewCreditCard(false)}
        isLoading={isLoading}
      />
      <PopupCardForm
        isOpen={clickedSalary}
        onClose={() => setClickedSalary(false)}
      />
      <SIPCardForm isOpen={clickedSIP} onClose={() => setClickedSIP(false)} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: "2px solid #b90303ff",
    borderRadius: "8px",
    padding: "20px",
    height: "320px",
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
