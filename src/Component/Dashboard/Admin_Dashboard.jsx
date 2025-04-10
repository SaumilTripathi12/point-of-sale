import React, { useEffect, useState } from "react";
import Com_Dashboard from "../Com_Dashboard/Com_Dashboard";
import { Link } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import user from "../../assets/user.jpg";
import hot from "../../assets/hot.jpg";

const Admin_Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // "2025-04-05"
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    setAllOrders(orders);
    setFilteredOrders(orders);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-");
      const formattedDate = `${parseInt(day)}/${parseInt(month)}/${year}`; // "5/4/2025"

      const filtered = allOrders.filter(
        (order) => order.date === formattedDate
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(allOrders);
    }
  }, [selectedDate, allOrders]);

  const totalCustomers = new Set(allOrders.map((o) => o.customer_name)).size;
  const totalSale = allOrders.reduce(
    (sum, order) => sum + Number(order.total_amount),
    0
  );

  return (
    <div className="main_admindashboard_div">
      <AdminSidebar />

      <div className="admindashboard_main">
        <div className="admindashboard_heading_div">
          <h4>Total Sale</h4>

          {selectedDate && (
            <button onClick={() => setSelectedDate("")} className="adminclear">
              Clear
            </button>
          )}
        </div>

        <div className="admindashboard_middle_div">
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

        <div className="admindashboard_table_div">
          <table>
            <caption>
              Order Record
              <input
                type="date"
                name="date"
                className="admindate"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              />
            </caption>
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
                      to={`/adminreceipt?order_id=${order.id}`}
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

export default Admin_Dashboard;
