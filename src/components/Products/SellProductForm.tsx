import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { paymentType, ProductType, SellEntry } from "../../types/product";
import { PlusCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addSellProduct } from "../../features/WheatItems/sellDailyProductLSlice";
import AtomButton from "../../atoms/AtomButton";

interface Props {
  onAdd: (entry: SellEntry) => void;
}

const SellProductForm: React.FC<Props> = ({ onAdd }) => {
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [errors, setErrors] = useState<{
    quantityKg?: string;
    pricePerKg?: string;
  }>({});

  const [formData, setFormData] = useState({
    product: "Rice" as ProductType,
    quantityKg: 0,
    pricePerKg: 0,
    date: new Date().toISOString().slice(0, 10),
    modeofpayment: "Cash" as paymentType
  });

  const dispatch = useDispatch<AppDispatch>();
  const validateFields = () => {
    const newErrors: typeof errors = {};
    if (formData.quantityKg <= 0)
      newErrors.quantityKg = "Quantity must be greater than 0";
    if (formData.pricePerKg <= 0)
      newErrors.pricePerKg = "Price must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    const { product, quantityKg, pricePerKg, modeofpayment } = formData;
    const entry: SellEntry = {
      id: uuidv4(),
      product,
      quantityKg,
      pricePerKg,
      date,      
      modeofpayment,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    };
    onAdd(entry);

    try {
      await dispatch(addSellProduct(entry)).unwrap(); // ✅ API call
      setFormData({
        product: "Rice",
        pricePerKg: 0,
        quantityKg: 0,
        date: new Date().toISOString().slice(0, 10),
        modeofpayment: "Cash"
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to add sell product:", error);
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
          value={formData.product}
          onChange={(e) =>
            handleChange("product", e.target.value as ProductType)
          }
          className="form-input"
        >
          <option value="Rice">Rice</option>
          <option value="Atta">Atta</option>
        </select>
        <label htmlFor="product" className="text-muted fw-bold">
          Product
        </label>
      </div>

      <div className="form-group">
        {errors.quantityKg && (
          <div className="text-danger small">{errors.quantityKg}</div>
        )}
        <input
          id="quantity"
          type="number"
          value={formData.quantityKg}
          onChange={(e) => handleChange("quantityKg", +e.target.value)}
          className="form-input"
        />
        <label htmlFor="quantity" className="text-muted fw-bold">
          Quantity (Kg)
        </label>
      </div>

      <div className="form-group">
        {errors.pricePerKg && (
          <div className="text-danger small">{errors.pricePerKg}</div>
        )}
        <input
          id="price"
          type="number"
          value={formData.pricePerKg}
          onChange={(e) => handleChange("pricePerKg", +e.target.value)}
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
      <div className="form-group">
        <select
          id="mop"
          value={formData.modeofpayment}
          onChange={(e) =>
            handleChange("modeofpayment", e.target.value as ProductType)
          }
          className="form-input"
        >
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>
        <label htmlFor="product" className="text-muted fw-bold">
          Mode of Payment
        </label>
      </div>

      <div className="text-end mt-4">
        <AtomButton
          type="submit"
          label="Add Customer Data"
          icon={<PlusCircle className="me-1" />}
          onClick={() => console.log("Clicked!")}
          style={{height: '42px'}}
          className="btn btn-outline-success"
          disabled={false}
        />
      </div>
    </form>
  );
};

export default SellProductForm;
