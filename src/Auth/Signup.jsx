import React, { useState } from "react";
import logo from "../assets/logo.png";
import signup from "../assets/signup.avif";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email is already registered
        const userExists = existingUsers.some(
          (user) => user.email === values.email
        );

        if (userExists) {
          toast.warn("Email already registered. Please log in.");
          return;
        }

        // Save new user
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: "admin",
        };
        localStorage.setItem(
          "users",
          JSON.stringify([...existingUsers, newUser])
        );

        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/adminlogin"), 1000);
      },
    });

  return (
    <div className="main_signup_container">
      <div className="signup_container">
        <div className="signup_left">
          <img src={logo} className="signup_logo" alt="Logo" />
          <img src={signup} alt="Signup Illustration" className="signup-img"/>
        </div>
        <div className="signup_right">
          <div className="signup_right_heading">
            <h1>Welcome to Cuisine Canvas</h1>
            <p>Continue to Signup</p>
          </div>

          <form onSubmit={handleSubmit} className="signup_right_form">
            <div className="signup_right_input">
              <div>
                <label htmlFor="name">Enter Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
              </div>
              {errors.name && touched.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
              )}

              <div>
                <label htmlFor="email">Enter Your Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </div>
              {errors.email && touched.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
              {errors.password && touched.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Confirm Password"
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              )}
            </div>

            <div className="signup__btn">
              <button className="signup_login" type="submit">
                {submitted ? "Loading..." : "Sign Up"}
              </button>
               <Link to={"/adminlogin"}>
              <button className="signup_login" type="button">
                {submitted ? "Loading..." : "Login"}
              </button>
              </Link>
            </div>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
