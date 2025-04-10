import React from 'react'
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import forgot from "../assets/forgot.jpg";

const initialValues = {
  email: "",
};

const Otp = () => {

  const navigatei = useNavigate()

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      try {
        const response = await fetch("https://possystem.bestdevelopmentteam.com/api/otpsend.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: values.email,
            }),
          });

        let res = await response.json();

        if (res.STATUS === true) {
          console.log(res);
          navigatei("/admin")
          toast.success("otp sent successfully")
        }
        else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
      action.resetForm();
    }
  })

  return (
    <div className="forgottt">
      <div className='forgotpasswordmain'>
        <div className="forgotpasswordmainimg">
          <img src={forgot} alt="" height={600} />
        </div>
        <div className="forgotform">
          <form action="" onSubmit={handleSubmit}>
            <div className="emailtext">
              <label htmlFor="">Email</label>
              <input
                placeholder='Enter Your Email'
                name='email'
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="otpbutton">
              <button type='submit'>Send OTP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Otp