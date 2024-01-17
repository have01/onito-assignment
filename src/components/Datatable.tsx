import React, { useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";
import { useSelector } from "react-redux";

interface Column {
  title: string;
  data: string;
}
interface FormDataItem {
  id: string;
  name: string;
  age: number;
  sex: "male" | "female";
  mobile: number;
  aadhar?: number; // Optional
  pan?: string; // Optional
  city: string;
  country: string;
  address: string;
  pincode: number;
}
const DataTable: React.FC = () => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { formData } = useSelector((state) => state?.forms); //to hget data from redux store

  // to perform render when new user data inserted into redux store
  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [formData]);

  //table coulmns
  const columns: Column[] = [
    { title: "Name", data: "name" },
    { title: "Age", data: "age" },
    { title: "Sex", data: "sex" },
    { title: "Mobile", data: "mobile" },
    { title: "address", data: "address" },
    { title: "City", data: "city" },
  ];

  return (
    <div className="container mx-auto px-2">
      <table ref={tableRef} className="display">
        <thead className="mt-4">
          <tr className="bg-green-300 mt-4">
            {columns?.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formData?.length >= 1
            ? formData?.map((item: FormDataItem) => (
                <tr key={item?.id}>
                  {columns?.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {item[column.data as keyof FormDataItem]}
                    </td>
                  ))}
                </tr>
              ))
            : "No data available"}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
