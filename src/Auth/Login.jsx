import React from 'react'
import { useFormik } from 'formik';
import left from '../assets/left.png'
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'
import { loginSchema } from '../Schemas/index';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: "",
    password: "",
}

const Login = () => {

    const navigater = useNavigate();

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            const users = JSON.parse(localStorage.getItem("cashiers")) || [];
            const user = users.find(
                (user) =>
                    user.staffemail === values.email && user.staffpassword === values.password
            );

            if (!user) {
                toast.error("Invalid email or password!");
                return;
            }

            toast.success("LoggedIn Successfully")
            navigater("/cashier")
        }
    })

    return (
        <div className='main_container'>
            <div className="container">

                <div className="left">
                    <img src={logo} className='logo' />
                    <img src={left} className='login_img' />
                </div>

                <div className="right">
                    <div className="right_heading">
                        <h1>Welcome to Cuisine Canvas</h1>
                        <p>Continue to Login</p>
                    </div>
                    <form onSubmit={handleSubmit} className='right_form'>
                        <div className="right-input">
                            <div>
                                <label htmlFor="Email">Enter Your Email</label>
                                <input type="text" name="email" autoComplete="off" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Email' />
                            </div>
                            {errors.email && touched.email ? (<p style={{ color: 'red' }} className='form-error'> {errors.email} </p>) : null}

                            <div>
                                <label htmlFor="Password">Password</label>
                                <input type="password" name="password" autoComplete="off" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Password' />
                            </div>
                            {errors.password && touched.password ? (<p style={{ color: 'red' }} className='form-error'> {errors.password} </p>) : null}
                        </div>

                        <div className="login_btn">
                            <button className='login' type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login