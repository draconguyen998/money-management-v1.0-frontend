import { useEffect, useState } from "react";

import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0">
            Track your earning over time and analyze your income trends.
          </p>
        </div>
        <button
          onClick={onAddIncome}
          className="add-btn flex items-center gap-1 bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-white">
          <Plus className="text-white" size={15} />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
