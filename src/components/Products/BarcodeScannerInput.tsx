import React, { useState } from 'react';

interface Props {
  onScan: (barcode: string) => void;
}

const BarcodeScannerInput: React.FC<Props> = ({ onScan }) => {
  const [barcode, setBarcode] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && barcode.trim()) {
      onScan(barcode.trim());
      setBarcode('');
    }
  };

  return (
    <input
      type="text"
      placeholder="Scan barcode"
      value={barcode}
      onChange={e => setBarcode(e.target.value)}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  );
};

export default BarcodeScannerInput;