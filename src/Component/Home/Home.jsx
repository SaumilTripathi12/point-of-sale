import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Category from '../Category/Category'

const Home = () => {
    return (
        <div className='main_home'>
            <Sidebar />
            <Category />
        </div>
    )
}

export default Home