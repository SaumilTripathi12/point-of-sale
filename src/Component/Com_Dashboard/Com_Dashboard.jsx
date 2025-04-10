import React, { useState } from 'react'
import user from '../../assets/user.jpg'
import hot from '../../assets/hot.jpg'

const Com_Dashboard = ({ totalCustomers, totalSale, src, para }) => {

    return (
        <div className='com_main_div'>

            <div className="com_para_div">
                <p> {para} <br />
                    {totalCustomers}
                    {totalSale}
                </p>
            </div>

            <div className="com_icon_dashboard_div">
                <img src={src} alt="" />
            </div>

        </div>
    )
}

export default Com_Dashboard