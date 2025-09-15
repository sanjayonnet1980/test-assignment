import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductType, SellEntry } from "../../types/product";
import { PlusCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addSellProduct } from "../../features/WheatItems/sellDailyProductLSlice";

interface Props {
  onAdd: (entry: SellEntry) => void;
}

const SellProductForm: React.FC<Props> = ({ onAdd }) => {
  const [product, setProduct] = useState<ProductType>("rice");
  const [quantityKg, setQuantityKg] = useState<number>(0);
  const [pricePerKg, setPricePerKg] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), product, quantityKg, pricePerKg, date, time: new Date().getHours() + ":" + new Date().getMinutes()});
    setQuantityKg(0);
    setPricePerKg(0);
    const newEntry: SellEntry = {
      id: uuidv4(),
      product,
      quantityKg,
      pricePerKg,
      date,
      time: new Date().getHours() + ":" + new Date().getMinutes()
    };

    try {
      await dispatch(addSellProduct(newEntry)).unwrap(); // ✅ API call
      setQuantityKg(0);
      setPricePerKg(0);
      // Optionally show success toast or reset form
    } catch (error) {
      console.error("Failed to add sell product:", error);
      // Optionally show error toast
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}
    >
      <div className="form-group">
        <select
          id="product"
          value={product}
          onChange={(e) => setProduct(e.target.value as ProductType)}
          className="form-input"
        >
          <option value="rice">Rice</option>
          <option value="flour">Flour</option>
        </select>
        <label htmlFor="product" className="text-muted fw-bold">
          Product
        </label>
      </div>

      <div className="form-group">
        <input
          id="quantity"
          type="number"
          value={quantityKg}
          onChange={(e) => setQuantityKg(+e.target.value)}
          className="form-input"
        />
        <label htmlFor="quantity" className="text-muted fw-bold">
          Quantity (Kg)
        </label>
      </div>

      <div className="form-group">
        <input
          id="price"
          type="number"
          value={pricePerKg}
          onChange={(e) => setPricePerKg(+e.target.value)}
          className="form-input"
        />
        <label htmlFor="price" className="text-muted fw-bold">
          Price/Kg (₹)
        </label>
      </div>

      <div className="form-group">
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
        />
        <label htmlFor="date" className="text-muted fw-bold">
          Date
        </label>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-outline-primary">
          <PlusCircle className="me-1" /> Add More
        </button>
      </div>
    </form>
  );
};

export default SellProductForm;
