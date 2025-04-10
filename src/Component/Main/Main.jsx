import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'


const Main = () => {
    const navigate = useNavigate()
    const adminnavigation = () => {
        navigate("/signup")
    }
    const cashiernavigation = () => {
        navigate("/cashierlogin")
    }

    return (
        <div className='main_page_div'>

            <div className="top_main_page_div">
                <img src={logo} className='logo' />
                <h1>CUISINE CANVAS</h1>
            </div>

            <div className="middle_main_page_div">
                <div className="left_main_div" onClick={() => adminnavigation()}>
                    <h2>Admin</h2>
                </div>
                <div className="right_main_div" onClick={() => cashiernavigation()}>
                    <h2>Cashier</h2>
                </div>
            </div>

        </div>
    )
}

export default Main