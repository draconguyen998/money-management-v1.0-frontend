import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
  useUser();
  return <Dashboard activeMenu="Filters">This is Filterpage</Dashboard>;
};

export default Filter;
