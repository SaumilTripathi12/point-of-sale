import React from 'react'
import logo from '../../assets/logo.png'
import { RiMenuSearchFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'


const Sidebar = () => {
    const navigate = useNavigate();
    const Category = () => {
        navigate("/cashier")
    }
    const Dashboard = () => {
        navigate("/dashboard")
    }
    return (
        <div className='sidebar'>
            <div className="sidebar_profile">
                <img src={logo} className='logo' />
            </div>
            <div className='icons_div'>
                <div className="sidebar_category">
                    <RiMenuSearchFill className='cate_icon' onClick={() => Category()} />
                </div>
                <p onClick={() => Category()} >Menu</p>

                <div className="sidebar_category">
                    <MdOutlineDashboard className='dash_icon' onClick={() => Dashboard()} />
                </div>
                <p onClick={() => Dashboard()} >Dashboard</p>
            </div>

            <div className='logout_div'>
                <div className="sidebar_logout">
                    <Link to="/login" className='logout_icon'><FaPowerOff /> </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar