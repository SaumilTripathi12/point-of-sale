import React, { useState } from 'react'
import pizza from '../../assets/pizza.jpg'

const I_Receipt_Bottom = () => {

const [prodData, setProdData] = useState([])

  return (
    <div>
      <div className="record">
        <table>

          <thead>
            <tr>
              <th>No.</th>
              <th>Items </th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>

          {prodData && prodData.map((m, n) => {
            return (
              <tbody key={n}>
                <tr>
                  {/* <td>1</td> */}
                  <td>{m.pname}</td>
                  <td>{m.qty}</td>
                  <td>{m.pprice}</td>
                  <td>{m.subtotal}</td>
                </tr>
              </tbody>
            )
          })}

          <tfoot>
            <tr className='totalrow'>
              <td colSpan={4}>Total</td>
              <td>total_amnt</td>
            </tr>
          </tfoot>
          
        </table>
      </div>
    </div>
  )
}

export default I_Receipt_Bottom