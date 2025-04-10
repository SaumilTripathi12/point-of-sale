import React, { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update_CashierForm = () => {
  //
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Retrieve cashiers from localStorage
  const [cashiers, setCashiers] = useState(() => {
    const savedCashiers = localStorage.getItem("cashiers");
    return savedCashiers ? JSON.parse(savedCashiers) : [];
  });

  // Find the cashier to be updated
  const [cash, setCash] = useState({
    staff_id: "",
    staffname: "",
    staffnumber: "",
    staffemail: "",
    staffpassword: "",
  });

  useEffect(() => {
    const existingCashier = cashiers.find((cashier) => cashier.staff_id === id);
    if (existingCashier) {
      setCash(existingCashier);
    }
  }, [id, cashiers]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCash((prev) => ({ ...prev, [name]: value }));
  };

  // Update cashier details
  const updateCashier = () => {
    if (
      !cash.staffname ||
      !cash.staffnumber ||
      !cash.staffemail ||
      !cash.staffpassword
    ) {
      toast.error("All fields are required.");
      return;
    }

    const updatedCashiers = cashiers.map((cashier) =>
      cashier.staff_id === id ? { ...cash } : cashier
    );

    localStorage.setItem("cashiers", JSON.stringify(updatedCashiers));
    setCashiers(updatedCashiers);
    toast.success("Cashier details updated successfully.");
    navigate("/addcashier");
  };

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Update Cashier Details</h3>
        <form className="form">
          <div className="inputfields">
            <label>Cashier Name</label>
            <input
              type="text"
              name="staffname"
              value={cash.staffname}
              onChange={handleChange}
              placeholder="Enter Cashier Name"
            />

            <label>Cashier Number</label>
            <input
              type="number"
              min={0}
              name="staffnumber"
              value={cash.staffnumber}
              onChange={handleChange}
              placeholder="Enter Cashier Number"
            />
          </div>

          <div className="inputfields">
            <label>Cashier Email</label>
            <input
              type="email"
              name="staffemail"
              value={cash.staffemail}
              onChange={handleChange}
              placeholder="Enter Cashier Email"
            />

            <label>Cashier Password</label>
            <input
              type="password"
              name="staffpassword"
              value={cash.staffpassword}
              onChange={handleChange}
              placeholder="Enter Cashier Password"
            />
          </div>
          <button className="addcashier" type="button" onClick={updateCashier}>
            Update Cashier
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update_CashierForm;
