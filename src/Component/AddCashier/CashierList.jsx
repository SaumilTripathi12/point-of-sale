import React, { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";

const CashierList = () => {
  const [cashiers, setCashiers] = useState([]);

  useEffect(() => {
    // Retrieve cashiers from localStorage
    const savedCashiers = localStorage.getItem("cashiers");
    if (savedCashiers) {
      setCashiers(JSON.parse(savedCashiers));
    }
  }, []);

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Added Cashiers</h3>
        <ul>
          {cashiers.map((cashier, index) => (
            <li key={index}>
              {cashier.staffname} - {cashier.staffnumber} - {cashier.staffemail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CashierList;
