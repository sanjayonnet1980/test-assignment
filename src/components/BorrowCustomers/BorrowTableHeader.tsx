const BorrowTableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className="border p-3">Customer Name</th>
      <th className="border">Quantity (Kg)</th>
      <th className="border">Price/Kg (₹)</th>
      <th className="border">Total Cost (₹)</th>
      <th className="border">Purchase Date</th>
      <th className="border">Mobile Number</th>
      <th className="border">Address</th>
      <th className="border">Actions</th>
    </tr>
  </thead>
);

export default BorrowTableHeader;