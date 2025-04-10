import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { toast } from "react-toastify";

const Add_Cashier = () => {
  const [cashierDetails, setCashierDetails] = useState([]);
  const navigate = useNavigate(); //Navigate

  useEffect(() => {
    // Retrieve cashiers from localStorage
    const savedCashiers = localStorage.getItem("cashiers");
    if (savedCashiers) {
      setCashierDetails(JSON.parse(savedCashiers));
    }
  }, []);

  const handleChange = (e) => {
    const cashierDetails = e.target;
    setCashierDetails((prev) => ({ ...prev, cashierDetails }));
  };

  // Simulate Delete Cashier
  const deleteCashier = (index) => {
    toast.success("Cashier Deleted Successfully");
    const updatedCashiers = cashierDetails.filter((_, i) => i !== index);
    setCashierDetails(updatedCashiers);
    localStorage.setItem("cashiers", JSON.stringify(updatedCashiers));
  };

  return (
    <div className="main_addcashier_div">
      <AdminSidebar />
      <div className="addcashier_main">
        <div className="addcashier_table_div">
          <table>
            <caption>
              <button
                className="addcashier"
                onClick={() => navigate("/cashierform")}
              >
                Add Cashier
              </button>
            </caption>

            <thead>
              <tr>
                <th>Name </th>
                <th>Mobile</th>
                <th>Email</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>

            {cashierDetails &&
              cashierDetails?.map((i, index) => {
                return (
                  <tbody key={index + "cashier"}>
                    <tr>
                      <td>{i.staffname}</td>
                      <td>{i.staffnumber}</td>
                      <td>{i.staffemail}</td>
                      <td>
                        <Link
                          className="delete"
                          onClick={() => deleteCashier(index)}
                        >
                          Delete
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="update"
                          to={`/updatecashierform?id=${i?.staff_id}`}
                          onChange={handleChange}
                        >
                          {" "}
                          Update
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Add_Cashier;
