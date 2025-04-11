import React, { useEffect, useState } from "react";
import Com_Dashboard from "../Com_Dashboard/Com_Dashboard";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import user from "../../assets/user.jpg";
import hot from "../../assets/hot.jpg";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Load orders from localStorage
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    setAllOrders(orders);
    setFilteredOrders(orders);
  }, []);

  // Filter by selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = allOrders.filter((order) => order.date === selectedDate);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(allOrders);
    }
  }, [selectedDate, allOrders]);

  const totalCustomers = allOrders.length;
  const totalSale = allOrders.reduce(
    (sum, order) => sum + Number(order.total_amount),
    0
  );


  return (
    <div className="main_dashboard_div">
      <Sidebar />

      <div className="dashboard_main">
        <div className="dashboard_heading_div">
          <h4>Total Sale</h4>
        </div>

        <div className="dashboard_middle_div">
          <Com_Dashboard
            para={"Total Customers"}
            totalCustomers={totalCustomers}
            src={user}
          />
          <Com_Dashboard
            para={"Total Sale"}
            totalSale={`₹ ${totalSale}`}
            src={hot}
          />
        </div>

        <div className="dashboard_table_div">
          <table>
            <caption>Order Record</caption>

            <thead>
              <tr>
                <th>OID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Detail</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.mobile}</td>
                  <td>{order.date}</td>
                  <td>₹ {order.total_amount}</td>
                  <td>
                    <Link
                      className="click"
                      to={`/receipt?order_id=${order.id}`}
                    >
                      Click Here
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
