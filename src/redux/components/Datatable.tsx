import "datatables.net-dt/css/jquery.dataTables.css";
import ReactDataTables from "./ReactDataTables";
import { useSelector } from "react-redux";

const Datatable = () => {
  const { formData } = useSelector(state => state.forms)
  const columns = [
    { data: "name", title: "name" },
    { data: "age", title: "age" },
    { data: "sex", title: "sex" },
    { data: "mobile", title: "mobile" },

  ];

  const data = formData;
  return <div className="mt-20"><ReactDataTables data={data} columns={columns} /></div>;
};

export default Datatable;