import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Component/Home/Home";
import Login from "./Auth/Login";
import Receipt from "./Receipt/Receipt";
import Dashboard from "./Component/Dashboard/Dashboard";
import Checkout from "./Component/checkout/Checkout";
import Customer_Input from "./Component/UserInput/Customer_Input";
import Signup from "./Auth/Signup";
import Main from "./Component/Main/Main";
import Admin from "./Component/Admin/Admin";
import Add_Cashier from "./Component/AddCashier/Add_Cashier";
import Add_Item from "./Component/Addtocart/Add_Item";
import Add_Category from "./Component/Category/Add_Category";
import Admin_Login from "./Auth/Admin_Login";
import Admin_Dashboard from "./Component/Dashboard/Admin_Dashboard";
import CashierForm from "./Component/AddCashier/CashierForm";
import Category_Form from "./Component/Category/Category_Form";
import Item_Form from "./Component/Addtocart/Item_Form";
import Update_CashierForm from "./Component/AddCashier/Update_CashierForm";
import Update_CategoryForm from "./Component/Category/Update_CategoryForm";
import Update_ItemForm from "./Component/Addtocart/Update_ItemForm";
import Otp from "./Auth/Otp";
import Admin_Receipt from "./Receipt/Admin_Receipt";

// by removing api do this page by staticaaly which work perfect

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        {/* auth */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/adminlogin" element={<Admin_Login />} />
        <Route exact path="/cashierlogin" element={<Login />} />
        {/* dashboard */}
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/cashier" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        {/* receipt */}
        <Route exact path="/receipt" element={<Receipt />} />
        <Route exact path="/adminreceipt" element={<Admin_Receipt />} />
        <Route exact path="/Checkout" element={<Checkout />} />
        {/* <Route exact path='/customer' element={<Customer_Input />} /> */}
        {/* cashier */}
        <Route exact path="/addcashier" element={<Add_Cashier />} />
        <Route exact path="/cashierform" element={<CashierForm />} />
        <Route
          exact
          path="/updatecashierform"
          element={<Update_CashierForm />}
        />
        {/* category */}
        <Route exact path="/addcat" element={<Add_Category />} />
        <Route exact path="/categoryform" element={<Category_Form />} />
        <Route
          exact
          path="/updatecategoryform"
          element={<Update_CategoryForm />}
        />
        {/* item */}
        <Route exact path="/additem" element={<Add_Item />} />
        <Route exact path="/itemform" element={<Item_Form />} />
        <Route exact path="/updateitemform" element={<Update_ItemForm />} />

        <Route exact path="/admindashboard" element={<Admin_Dashboard />} />
        <Route exact path="/otp" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
