import React, { useState } from 'react';
import CafeLogo from '../assets/CafeLogo.png';
import { useNavigate } from 'react-router-dom';

export default function Sidebardisplay({ rowOrder, setRowOrders}) {
  const navigate = useNavigate();
  
  
  const deleteRow = (index) => {
    const updatedRows = rowOrder.filter((_, i) => i !== index);
    setRowOrders(updatedRows);
  };
 

  return (
    <div className='sidebarSales'>
      <div className="cafeLogo">
        <img className='logoImg' src={CafeLogo} alt="cafebara with coffee" />
      </div>
      <div className="ordersSide">
        <table >
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Price</th>
              <th>Remove</th> {/* Added Action column for delete button */}
            </tr>
          </thead>
          <tbody>
            {rowOrder.map((row, index) => (
              <tr  key={index}>
                <td>{row.col1}</td>
                <td>{row.col2}</td>
                <td>{row.col3}</td>
                <td>
                  <button onClick={() => deleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="back-button" onClick={() => {navigate('/dashboard')}}>
            Back
      </div>
    </div>
  );
}
