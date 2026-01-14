import { useState } from "react";
import Input from "../components/Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];
  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />
      <Input
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        label="Category Type"
        isSelect={true}
        options={categoryTypeOptions}
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="add-btn add-btn-fill bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-3 flex items-center justify-center rounded-lg">
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>Add Category</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
