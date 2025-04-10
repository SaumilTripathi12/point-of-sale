import React from "react";

const CheckoutCard = ({ data, increment, decrement, removeItem }) => {
  //
  const handleClick = () => {
    prompt("Add Note (currently saved locally)");
  };

  return (
    <div className="main_checkout">
      <div className="checkout_top">
        <div className="image">
          <img src={data.img} alt="Image Not Loaded" />
        </div>
        <div className="checkout_heading">
          <h3>{data.name}</h3>
          <p>₹ {data.price}</p>

          <div className="inc_dec_btn">
            <button className="checkout_btn" onClick={() => decrement(data.id)}>
              -
            </button>
            <h4>{data.count}</h4>
            <button className="checkout_btn" onClick={() => increment(data.id)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="checkout_bottom">
        <button className="checkout_bottom_btn" onClick={handleClick}>
          Add Note
        </button>
        <button
          className="checkout_bottom_btn"
          onClick={() => removeItem(data.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
