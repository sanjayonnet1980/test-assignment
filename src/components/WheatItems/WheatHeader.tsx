const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className="border p-3">Buyer</th>
      <th className="border">Quantity (Kg)</th>
      <th className="border">Price/Kg (₹)</th>
      <th className="border">Total Cost (₹)</th>
      <th className="border">Purchase Date</th>
      <th className="border">Actions</th>
    </tr>
  </thead>
);

export default TableHeader;