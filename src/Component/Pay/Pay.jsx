import React, { useEffect, useState } from 'react';

const Pay = ({ productData }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (!productData) return;

    const total = productData.reduce((sum, item) => sum + Number(item.price), 0);
    const subtotal = productData.reduce((sum, item) => sum + Number(item.singlePrice), 0);

    setTotalPrice(total);
    setSubTotal(subtotal);
  }, [productData]);

  return (
    <div>
      <div className="main_pay_div">
        <div className="top_pay_div">
          <h4>Payment Information</h4>
          <br />
          <p>Sub Total : ₹{subTotal}</p>
          <p>Total : ₹{totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
