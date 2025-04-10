import React, { useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Ingredients from '../../Ingredients/Ingredients';
import { useNavigate } from 'react-router-dom';

const Add_ingredients = () => {

    // show items
    const preData = JSON.parse(localStorage.getItem("cartItems")) ?? []

    // useEffect(() => {
    //     setIngredients(ingredients)
    // }, [])

    return (
        <div className='main_ingredients'>
            <div className="top_ingredients">
                <h2>Add Ingredients</h2>
            </div>

            <div className="middle_ingredients">
                {/* <Ingredients />
                <Ingredients />
                <Ingredients /> */}
                {/* <Ingredients prodingredients={"Cheese"} /> */}
            </div>

         <div className="middle_ingredients">
                <Ingredients />
                <Ingredients />
                <Ingredients />

            </div> 
            <div className="middle_ingredients">
                <Ingredients />
                <Ingredients />
                <Ingredients />
            </div> 


        </div>
    )
}

export default Add_ingredients