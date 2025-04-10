import React, { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Pay from "../Pay/Pay";
import ComnBtn from "../Comn_btn/ComnBtn";
import { useNavigate } from "react-router-dom";
import Customer_Input from "../UserInput/Customer_Input";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [cname, setCname] = useState(""); // customer name
  const [cmobile, setCmobile] = useState(""); // customer mobile number

  useEffect(() => {
    const preData = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProductData(preData);
  }, []);

  const handleClick = () => {
    navigate("/cashier");
  };

  //increment
  const increment = (id) => {
    const updated = productData.map((item) => {
      if (item.id === id) {
        const newCount = item.count + 1;
        return { ...item, count: newCount, price: item.singlePrice * newCount };
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setProductData(updated);
  };

  //decrement
  const decrement = (id) => {
    const updated = productData.map((item) => {
      if (item.id === id && item.count > 1) {
        const newCount = item.count - 1;
        return { ...item, count: newCount, price: item.singlePrice * newCount };
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setProductData(updated);
  };

  //removeItem
  const removeItem = (id) => {
    const filtered = productData.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
    setProductData(filtered);
  };

  // Simulate order creation locally
  const sendApi = () => {
    if (!cname || !cmobile) {
      toast.error("Please enter customer name and mobile number.");
      return;
    }

    const orderId = "ORD" + Date.now();
    const date = new Date().toLocaleDateString("en-IN");

    const total_amount = productData.reduce((sum, item) => sum + item.price, 0);

    const order = {
      id: orderId,
      date,
      customer_name: cname,
      mobile: cmobile,
      total_amount,
      products: productData,
    };

    // Store current receipt data separately
    localStorage.setItem("current_order", JSON.stringify(order));

    // Optional: maintain full order history
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    localStorage.removeItem("cartItems"); // clear cart

    navigate(`/receipt?order_id=${orderId}`);
  };

  return (
    <div className="main_checkout_div">
      <div className="category_checkout">
        <div className="para_and_icon">
          <h1>Check Out</h1>
          <IoArrowForwardCircleOutline
            className="backicon"
            onClick={handleClick}
          />
        </div>

        <div className="content">
          <div className="checkout_card">
            {productData.map((item, i) => (
              <CheckoutCard
                key={`${item.id}_${i}`}
                data={item}
                increment={increment}
                decrement={decrement}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div className="pay_userdata">
            <Pay productData={productData} />
            <Customer_Input setCname={setCname} setCmobile={setCmobile} />
            <ComnBtn sendApi={sendApi} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
