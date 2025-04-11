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
            // try {
            //     const response = await fetch("https://possystem.bestdevelopmentteam.com/api/cashier_loginapi.php",  //cashier login api
            //         {
            //             method: "POST",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify({
            //                 email: values.email, 
            //                 password: values.password, 
            //             }),
            //         });

            //     let res = await response.json();
            //     if (res.STATUS === true) {
            //         toast.success("LoggedIn Successfully")
            //         navigater("/cashier")
            //     }
            //     else {
            //         toast.error("Invalid credentials")
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
            toast.success("LoggedIn Successfully")
            navigater("/cashier")
        }
    })

    return (
        <div className='main_container'>
            <div className="container">

                <div className="left">
                    <img src={logo} className='logo' />
                    <img src={left}  className='login_img'/>
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
                            {errors.email && touched.email ? (<p style={{color: 'red'}} className='form-error'> {errors.email} </p>) : null}

                            <div>
                                <label htmlFor="Password">Password</label>
                                <input type="password" name="password" autoComplete="off" value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Password' />
                            </div>
                            {errors.password && touched.password ? (<p style={{color: 'red'}} className='form-error'> {errors.password} </p>) : null}
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