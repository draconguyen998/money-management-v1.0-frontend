import { useEffect, useState } from "react";
import Input from "../components/Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };
  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, income.categoryId]);
  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Name"
        placeholder="e.g., Freelance, Salary, Bonus"
        type="text"
      />
      <Input
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        label="Category"
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="DD/MM/YYYY"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddIncome}
          disabled={loading}
          className="add-btn add-btn-fill bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-3 flex items-center justify-center rounded-lg">
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
              {/* {isEditing ? "Updating..." : "Adding..."} */}
            </>
          ) : (
            // <>{isEditing ? "Update Income" : "Add Income"}</>
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
