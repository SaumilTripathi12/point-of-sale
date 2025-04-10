import React from "react";

const Customer_Input = ({ setCname, setCmobile }) => {
  return (
    <div className="c_div">
      <div className="c_name">
        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setCname(e.target.value)}
        />
      </div>
      <div className="c_number">
        <input
          type="number"
          min={0}
          placeholder="Customer Number"
          onChange={(e) => setCmobile(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Customer_Input;
