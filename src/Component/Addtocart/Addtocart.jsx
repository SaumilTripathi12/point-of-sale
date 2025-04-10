import React from "react";
import { useNavigate } from "react-router-dom";

const Addtocart = ({ img, title, prodprice, prodid, productqty }) => {
  const navigate = useNavigate();

  const preCartData = JSON.parse(localStorage.getItem("cartItems")) || [];

  const isItemInCart = preCartData.some((item) => item.id === prodid);

  const handleAddToCart = () => {
    const newCartItem = {
      img,
      singlePrice: prodprice,
      price: prodprice,
      name: title,
      id: prodid,
      count: 1,
      productqty,
    };

    const updatedCart = [...preCartData, newCartItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    navigate("/Checkout");
  };

  const handleRemove = () => {
    const updatedCart = preCartData.filter((item) => item.id !== prodid);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    // No navigation on remove
    window.location.reload(); // Refresh to update UI (optional, or use state in parent)
  };

  return (
    <div className="main_addtocart">
      <div className="addtocart_top">
        <div className="addtocart_img">
          <img src={img} alt={title} />
        </div>
        <div className="addtocart_heading">
          <h3>{title}</h3>
          <p>₹ {prodprice}</p>
        </div>
      </div>

      <div className="addtocart_bottom">
        {!isItemInCart ? (
          <button
            type="button"
            className="addtocart_bottom_add_btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : (
          <button
            type="button"
            className="checkout_bottom_remove_btn"
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Addtocart;
