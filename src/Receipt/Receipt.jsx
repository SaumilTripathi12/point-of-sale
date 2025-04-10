import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Receipt = () => {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  const navigate = useNavigate();

  const [receiptData, setReceiptData] = useState({
    token_no: "",
    date: "",
    customer_name: "",
    mobile: "",
    total_amount: 0,
    products: [],
  });

  const backtoDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const customer_name = localStorage.getItem("customer_name");
    const mobile = localStorage.getItem("customer_mobile");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const total_amount = cartItems.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );
    const today = new Date().toLocaleDateString("en-IN");

    setReceiptData({
      date: today,
      customer_name,
      mobile,
      total_amount,
      products: cartItems,
    });
  }, []);

  useEffect(() => {
    const currentOrder = JSON.parse(localStorage.getItem("current_order"));
    if (currentOrder) {
      setReceiptData(currentOrder);
    }
  }, []);

  return (
    <div className="receipt">
      <div className="main_receipt_div">
        <div className="heading_div">
          <div>
            <p>
              <strong>{order_id}</strong>
              <br /> <strong>{receiptData.date}</strong>
            </p>
            <IoArrowForwardCircleOutline
              className="backicon"
              onClick={backtoDashboard}
            />
          </div>
        </div>

        <div className="middle_div">
          <div className="customer_details">
            <h3>Customer Personal Details</h3>
            <div className="customer_para_name_number">
              <div className="c_name_num">
                <p>Name :</p>
                <p>Phone Number :</p>
              </div>
              <div className="c_name_num">
                <p>{receiptData.customer_name}</p>
                <p>{receiptData.mobile}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="receipt_bottom_div">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Item</th>
                <th>Qty</th>
                <th>UnitPrice</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>₹ {item.singlePrice}</td>
                  <td>₹ {item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="totalrow">
                <td colSpan={4}>Total</td>
                <td>₹ {receiptData.total_amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="receipt_print_btn">
          <button onClick={() => window.print()}>
            Click Here to Download Order Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
