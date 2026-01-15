import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  return <Dashboard activeMenu="Income">This is Incomepage</Dashboard>;
};

export default Income;
