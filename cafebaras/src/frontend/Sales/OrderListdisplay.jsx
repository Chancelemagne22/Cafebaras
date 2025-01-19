import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderListdisplay({rowOrder ,setDisplayOrderList ,setConfirmOrder}) {
  const [payment, setPayment] = useState(0); 
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dataOfRecipe, setDataOfRecipe] = useState([]);
  

  const navigate = useNavigate();
  

  const displayList = () => {
    setDisplayOrderList((prevDisplayOrderList) => !prevDisplayOrderList);
  };


  const typeOfPayment = [
    {name: "Cash", code: "Cash"},
    {name: "Gcash", code: "Online"},
    {name: "PayMaya", code: "Online"}
  ]

  const paymentOption = (e) => {
    setSelectedPayment(e.value.name);
    setPaymentMethod(e.value.name); 
  };

  const groupedProducts = rowOrder.reduce((acc, row) => {
    const key = `${row.col1}-${row.col2}`; // Use product name and size as the key
    if (!acc[key]) {
      acc[key] = {
        name: row.col1,
        size: row.col2,
        quantity: 0,
        totalPrice: 0,
      };
    }
    acc[key].quantity += 1;
    acc[key].totalPrice += parseFloat(row.col3 || 0);
    return acc;
  }, {});

  // Convert grouped products to an array for rendering
  const groupedArray = Object.values(groupedProducts);
  // console.log(groupedArray)

  // Calculate the total price for all products
  const totalPrice = rowOrder.reduce((sum, row) => sum + parseFloat(row.col3 || 0), 0);
  const paymentHandler = (e) =>{
    const input = parseFloat(e.target.value) || 0; 
    setPayment(input);
  }

  const calculateChange = (payment, totalPrice) => {
    const change = payment - totalPrice;
    return change > 0 ? change.toFixed(2) : "0";
  };
  

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weeks = ["W1", "W2", "W3", "W4"];

  const dateObj = new Date();
  const day = dateObj.getUTCDate();
  const monthIndex = dateObj.getUTCMonth();
  const year = dateObj.getUTCFullYear();
  const month = months[monthIndex];
  
  const date = `${monthIndex + 1}/${day}/${year}`;
  
  const getWeek = (day) => {
    if (day < 1 || day > 31) return undefined; 
    const weekIndex = Math.floor((day - 1) / 7);
    return weeks[weekIndex];
  };
  
  function uniqueTransactionID(min, max, count) {
    if (count > max - min + 1) {
        throw new Error("Count exceeds the range of unique numbers possible.");
    }

    const usedNumbers = new Set();
    while (usedNumbers.size < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        usedNumbers.add(num);
    }

    const result = parseInt([...usedNumbers].join(''), 10);
    return result % 10000000; 
  }
  
  const transactionID = uniqueTransactionID(day, year, monthIndex + 1  * 8);
  // console.log(transactionID)
  
  const weekIndex = getWeek(day);
  // console.log(weekIndex)

  const dataTransactions = groupedArray.map((group) => ({
    date,
    productName: group.name, 
    month,
    week: weekIndex,
    day,
    size: group.size,
    transactionID: transactionID
  }));
  
  
  // price: group.totalPrice,
  //   paymentMethod, // Fixed issue with setting paymentMethod
  //   payment,
  //   change: calculateChange(payment, group.totalPrice),
  const dataReceipt = {
    transactionID,
    paymentMethod,
    payment,
    change: calculateChange(payment, totalPrice)
  }  
  const confirmData = async() =>{
    setConfirmOrder((prevConfirmOrder) => !prevConfirmOrder);
    console.log(JSON.stringify(dataTransactions))
    console.log(JSON.stringify(dataReceipt))
    console.log(JSON.stringify(dataOfRecipe))

    try{
      const response = await fetch('http://localhost:3001/api/products/receipt-record',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataReceipt)
      })
      console.log(response)
      if(!response.ok){
        const errorData = await response.json();
        console.error('Recording receipt failed:', errorData);
        return;
      }
      const result = await response.json();
      console.log('Recording receipt successful:', result);
    
    } catch (err) {
        console.error("Unexpected error during recording:", err); 
    }
    
      setDisplayOrderList((prevDisplayOrderList) => !prevDisplayOrderList);
    navigate('/dashboard'); 
  }

  return (
    <div className="finalOrders">
      <div className="orderlistSales">
        <table >
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {groupedArray.map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td>{group.size}</td>
                <td>{group.quantity}</td>
                <td>{group.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="checkout-section">
        <div style={{ padding: '1em'}} className="cart-total-section">
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                Total Price: {totalPrice.toFixed(2)}
          </div>
          <div style={{ fontWeight: 'bold'}}>
            <label htmlFor="payment">Payment:</label>
            <input placeholder="--.--" onChange={paymentHandler} className="payment" style={{fontSize:'1.5em', width:'80%' }} type="text" />
          </div>
          <div>
            Change:
            <div style={{ fontWeight: "bold" }}>
              {calculateChange(payment, totalPrice)}
            </div>
          </div>
        </div>
        <div className="payment-option-section">
          <Dropdown value={selectedPayment} onChange={paymentOption} options={typeOfPayment} optionLabel='name' editable placeholder="Type of Payment" />
        </div>
        <div className="decision-section">
          <button className='confirm-button' onClick={confirmData}>Confirm</button>
          <button className='cancel-button' onClick={displayList}>Cancel</button>
        </div>
      </div>

    </div>
    
  )
}
