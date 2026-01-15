import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="card p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button className="text-base text-black bg-white hover:bg-slate-50 hover:text-blue-500 transition-colors flex items-center justify-center px-4 py-2 gap-2 border border-slate-200 rounded-lg">
            <Mail size={15} className="text-base" />
            Email
          </button>
          <button className="text-base text-black bg-white hover:bg-slate-50 hover:text-blue-500 transition-colors flex items-center justify-center px-4 py-2 gap-2 border border-slate-200 rounded-lg">
            <Download size={15} className="text-base" />
            Download
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("DD MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
