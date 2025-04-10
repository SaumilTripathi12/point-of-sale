import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ComnBtn = ({sendApi}) => {
    
    return (
        <div className="payment_bottom_btn" onClick={() => sendApi()}>
            Proceed To Payment
        </div>
    )
}

export default ComnBtn