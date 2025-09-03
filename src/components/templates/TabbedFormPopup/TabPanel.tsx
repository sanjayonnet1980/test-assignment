import React from "react";
import EntryForm from "../../molecules/EntryForm/EntryForm";

interface TabPanelProps {
  activeTab: string;
  onClose: () => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ activeTab, onClose }) => {
  return (
    <>
      {["Card 4188", "Card 5549", "Card 7577"].map((card) =>
        activeTab === card ? (
          <EntryForm key={card} buttonLabel={`Submit ${card}`} onClose={onClose} />
        ) : null
      )}
    </>
  );
};

export default TabPanel;