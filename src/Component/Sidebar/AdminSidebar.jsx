import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { RiMenuSearchFill } from 'react-icons/ri';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaPowerOff } from 'react-icons/fa6';


const AdminSidebar = () => {

    const navigate = useNavigate();

    const Dashboard = () => {
        navigate("/admindashboard")
    }
    const Cashier = () => {
        navigate("/addcashier")
    }
    const Category = () => {
        navigate("/addcat")
    }
    const Item = () => {
        navigate("/additem")
    }


    return (
        <div className='AdminSidebar'>
            <div className="AdminSidebar_profile">
                <img src={logo} className='logo' />
            </div>

            <div className='icons_div'>
                <div className="AdminSidebar_category">
                    <MdOutlineDashboard className='dash_icon' onClick={() => Dashboard()} />
                </div>
                <p onClick={() => Dashboard()} >Dashboard</p>
                <div className="AdminSidebar_category">
                    <RiMenuSearchFill className='cate_icon' onClick={() => Cashier()} />
                </div>
                <p onClick={() => Cashier()} >Cashier</p>
                <div className="AdminSidebar_category">
                    <MdOutlineDashboard className='dash_icon' onClick={() => Category()} />
                </div>
                <p onClick={() => Category()} >Category</p>
                <div className="AdminSidebar_category">
                    <MdOutlineDashboard className='dash_icon' onClick={() => Item()} />
                </div>
                <p onClick={() => Item()} >Item</p>
            </div>

            <div className='logout_div'>
                <div className="AdminSidebar_logout">
                    <Link to="/adminlogin" className='logout_icon'><FaPowerOff /> </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar