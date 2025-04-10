import React, { useState, useEffect } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CashierForm = () => {
  const navigate = useNavigate();

  // State for Cashier Details
  const [cash, setCash] = useState({
    staffname: "",
    staffnumber: "",
    staffemail: "",
    staffpassword: "",
  });

  // Retrieve cashiers from localStorage
  const [cashiers, setCashiers] = useState(() => {
    const savedCashiers = localStorage.getItem("cashiers");
    return savedCashiers ? JSON.parse(savedCashiers) : [];
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCash((prev) => ({ ...prev, [name]: value }));
  };

  // **Validate Inputs**
  const validateForm = () => {
    const { staffname, staffnumber, staffemail, staffpassword } = cash;

    // Check for empty fields
    if (!staffname || !staffnumber || !staffemail || !staffpassword) {
      toast.error("All fields are required.");
      return false;
    }

    // Check if number is valid (10-digit)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(staffnumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    // Check if email is already registered
    if (cashiers.some((c) => c.staffemail === staffemail)) {
      toast.error("Email already registered. Try another.");
      return false;
    }
    // Check if phone number is already registered
    if (cashiers.some((c) => c.staffnumber === staffnumber)) {
      toast.error("Phone number already registered. Try another.");
      return false;
    }

    // Check password length
    if (staffpassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  // **Add Cashier**
  const cashierAddApi = async () => {
    if (!validateForm()) return;

    try {
      // Simulate a successful response
      const res = { STATUS: true };

      if (res.STATUS === true) {
        toast.success("Cashier Added Successfully");

        const newCashier = {
          staff_id: Date.now().toString(), // Generate unique ID
          ...cash,
        };
        // Store new cashier
        const updatedCashiers = [...cashiers, newCashier];
        setCashiers(updatedCashiers);
        localStorage.setItem("cashiers", JSON.stringify(updatedCashiers));

        // Reset form fields
        setCash({
          staffname: "",
          staffnumber: "",
          staffemail: "",
          staffpassword: "",
        });

        console.log(res);
        navigate("/addcashier");
      } else {
        toast.error("Something went wrong!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Please Fill All Fields</h3>
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
              autoComplete="off"
              value={cash.staffpassword}
              onChange={handleChange}
              placeholder="Enter Cashier Password"
            />
          </div>
          <button className="addcashier" type="button" onClick={cashierAddApi}>
            Add Cashier
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashierForm;
