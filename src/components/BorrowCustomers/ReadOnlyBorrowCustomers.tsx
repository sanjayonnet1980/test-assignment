import React from 'react';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { formatToINRCurrency } from '../../utils/amountFormat';
import { formatDateWithUnicodeOrdinal } from '../../utils/formatDateToIndianStyle';
import { BorrowCustomers } from '../../features/BorrowCustomers/borrowCustomers';

interface Props {
  entry: BorrowCustomers;
  onEdit: () => void;
  onDelete: () => void;
}

const ReadOnlyBorrowCustomers: React.FC<Props> = ({ entry, onEdit, onDelete }) => {
  const totalCost = entry.quantityKg * entry.pricePerKg;

  return (
    <tr >
      <td className='border'>{entry.customeName}</td>
      <td className='border'>{entry.quantityKg}</td>
      <td className='border'>{entry.pricePerKg}</td>
      <td className='border'>{formatToINRCurrency(totalCost)}</td>
      <td className='border'>{formatDateWithUnicodeOrdinal(entry.purchaseDate)}</td>
      <td className='border'>{entry.mobileNumber}</td>
      <td className='border'>{entry.customerAddress}</td>
      <td className='border d-flex gap-3 justify-content-center p-2'>
        <button className="btn btn-outline-success" onClick={onEdit}><PencilSquare size={20}/></button>
        <button className="btn btn-outline-danger" onClick={onDelete}><Trash size={20}/></button>
      </td>
    </tr>
  );
};

export default ReadOnlyBorrowCustomers;