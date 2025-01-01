import React, {useEffect,useState} from 'react'
import '../designs/OrderManagement.css';
import { useNavigate } from 'react-router-dom';
import supabase from './order';
import CafeLogo from './assets/CafeLogo.png'


function OrderManagement () {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [orderDisplay, setOrderDisplay] = useState([]);
    const [showOrderDisplay, setShowOrderDisplay] = useState(false); 
    const orderDisplayClass = showOrderDisplay ? 'orderDisplay shows' : 'orderDisplay';
    const [time, setTime] = useState(0);

    console.log('Check')

    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ["W1", "W2", "W3", "W4"];
    
    var orderarray = [];
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);
    
    useEffect(() => {
        if (showOrderDisplay) {
            
            const timer = setTimeout(() => {
                setShowOrderDisplay(false);
                console.log("Order display hidden after 20 seconds");
                navigate('/dashboard')
                console.clear()
            }, 5000);
    
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [showOrderDisplay]);
    
    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true); // Set loading to true at the start of fetch
            try{
                const response = await fetch('http://localhost:3001/api/orders');
                const data = await response.json()

                setMenu(data)
            }catch(error){
                console.error('Error fecthing order: ', error)
                setLoading(false)
            }
        
        };
    
    fetchMenu();
    }, []);

    // getIndex fetching will stay in FrontEnd
    const getindex = async(e)=>{
        var index = await e.target.value;
        e.preventDefault();
        console.log(index);
        try {
            const response = await fetch('http://localhost:3001/api/orders/products',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({index})
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            const data = result.product
          

            
            if (error){
                console.error("Error fetching Products:", error);
            }else{
                orderarray.push(data)
            
                const tableBody = document.getElementById("outputTable").querySelector("tbody");

                // Function to render the table
                function renderTable() {
                // Clear the existing table content
                    tableBody.innerHTML = "";

                    // Populate the table with rows
                    orderarray.forEach((item, index) => {
                    // Create a new row
                        const newRow = tableBody.insertRow();

                    // Insert cells and set their content
                        const cell1 = newRow.insertCell(0);
                        cell1.textContent = item.pID;

                        const cell2 = newRow.insertCell(1);
                        cell2.textContent = item.pName;

                        const cell3 = newRow.insertCell(2);
                        cell3.textContent = "₱ " + item.price;

                        // Create a delete button
                        const cell4 = newRow.insertCell(3);
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";

                        // Add a click event to the delete button
                        deleteButton.onclick = () => {
                            // Remove the item from the array
                            orderarray.splice(index, 1);
                            console.log("An order was deleted from the table");
                            // Re-render the table
                            renderTable();
                        };

                    // Add the button to the cell
                        cell4.appendChild(deleteButton);
                    });
                }

                // Initial rendering of the table
                renderTable();
            }
        }catch{

        }

        console.log(orderarray);
    
    
    }


    // Function to display orders and handle the timer
    const displayOrdersWithTimer = (orderArray) => { 
        setTime(orderArray.length + 1);
        console.log(orderArray.length + " lezgo")

        const displayOrder = orderArray.map((orders) => ({
            productName: orders.pName,
            price: orders.price,
        }));

        console.log("Order array before setting state:", orderArray);
        console.log("Order display array:", displayOrder);

        setOrderDisplay(displayOrder);
        setShowOrderDisplay(true);
        console.log("Show Order Display state set to true");


       
    };

    const handleOrders = async () => {
        const table = document.getElementById('outputTable').querySelector('tbody');
        table.innerHTML = ''; // Clear all table content
        console.log("Table reset");
        setError('');
        if (orderarray.length == 0){
            setError("No order inputed in the system.")
            return;
        }
        
        // Reverse the array to process orders in reverse order
        displayOrdersWithTimer(orderarray)
        orderarray.reverse();
  
        while (orderarray.length > 0) {
            // Get the last order and process it
            const order = orderarray.pop();
            console.log(order);
    
            // Extract order details
            const orderinfo = Object.values(order);
            console.log(orderinfo);
            const productID = orderinfo[0];
            const productName = orderinfo[1];
            const price = orderinfo[3];
            console.log(productID, productName);
            
    
            try {
                const dateObj = new Date();
                const numOfMonth   = dateObj.getUTCMonth() + 1; // months from 1-12
                const day     = dateObj.getUTCDate();
                const year    = dateObj.getUTCFullYear();
                const month = months[numOfMonth-1]

                const date = numOfMonth + "/" + day + "/" + year;

                const getWeek = (day) =>{
                    if(day <= 7){
                        return weeks[0];
                    }else if(day > 7 && day <=14){
                        return weeks[1];
                    }else if(day > 14 && day <=21){
                        return weeks[2];
                    }else if(day > 21){
                        return weeks[3];
                    }
                }
                const week = getWeek(day)

                const dataTransaction = {date, productID, productName, price, month, week, day}
                
    
                // Insert transaction into Supabase
                const response = await fetch('http://localhost:3001/api/transactions/details',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataTransaction)
                })
                
                if(!response.ok){
                    const errorData = await response.json();
                    console.error('Transaction failed:', errorData);
                    return;
                }
                const result = await response.json();
                console.log('Transaction successful:', result);
                
            } catch (err) {
                console.error("Unexpected error during transaction:", err);
            }
    
            // Process recipes
            const recipes = orderinfo[4];
            console.log(recipes);
            
            let recipeinfo;
            if (recipes) {
                try {
                    recipeinfo = recipes;
                } catch (err) {
                    console.error("Error parsing recipes:", err);
                    continue; // Skip the rest of the loop for this order
                }
            } else {
                console.error("Recipes data is empty or invalid.");
                continue;
            }
            console.log(recipeinfo);
    
            // Convert recipe info into an array of objects
            const recipelist = [];
            Object.keys(recipeinfo).forEach(key => {
                recipelist.push({ key, value: recipeinfo[key] });
            });
            console.log(recipelist);
    
            // Merge ingredients using a loop
            const ingredientslist = [];
            while (recipelist.length > 0) {
                const recipeobject = recipelist.pop();
                ingredientslist.push(recipeobject);
            }
            console.log("Ingredients List:", ingredientslist);
    
            // Use an accumulator to merge ingredient quantities
            const accumulator = {};
            for (const current of ingredientslist) {
                if (accumulator[current.key]) {
                    accumulator[current.key] += current.value;
                } else {
                    accumulator[current.key] = current.value;
                }
            }
    
            // Convert the accumulator object back to an array format
            const resultArray = Object.keys(accumulator).map(key => ({
                key,
                value: accumulator[key],
            }));
    
            console.log("Merged Ingredients:", resultArray);
    
            // Process merged resultArray sequentially
            //const updated = 0;
            while (resultArray.length > 0) {
                const recipe = resultArray.pop();
                console.log("Final Recipe:", recipe);
                const recipeIng = Object.values(recipe);
                const Item = recipeIng[0];
                const quantity = recipeIng[1];


                console.log(Item,quantity);


                try {
                    // fetch data from Supabase
                    
                    const { data, error } = await supabase
                    .from('inventoryV2')
                    .select('Stocked_Units, Used_Units')
                    .eq('ItemName', Item);
                
                    if (error) {
                        console.error("Error On Fetching Stocks:", error);
                        continue; // Skip to the next iteration
                    }
                
                    const stockunit = data[0]?.Stocked_Units;
                    const usedunits = data[0]?.Used_Units; // Access the specific number
                    console.log("Number of used:", usedunits);
                    console.log("Number:", stockunit);
                    const updated = stockunit - quantity;
                    const updatedused = usedunits + quantity;
                    console.log("updated stocks",updated)

                    try {
                        const { data, error } = await supabase
                            .from('inventoryV2')
                            .update({Stocked_Units: updated, Used_Units:updatedused})
                            .eq('ItemName', Item);
            
                        if (error) {
                            console.error("Error updating record:", error);
                        } else {
                            console.log("Updated record:", data);
                        }

                    }catch{

                    }

                } catch (err) {
                    console.error("Unexpected error during transaction:", err);
                }
                
            }
                
        }
  };
  
 
  return (
    <div className="dashboardOD">
            <div className="sidebarSales">
            <div className="logoC">
                    <img src={CafeLogo} alt="cafebara logo" />
            </div>
            <div className = "tableContainer">
                <table id="outputTable">
                    <thead>
                        <tr>
                        <th>PID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div className="backOrder" onClick={() => {navigate('/dashboard')}}>
            Back
            </div>
            </div>
            <div className="mainContentSales">
              
                <div className = "Product_Selection" id = "Options">
                <div className = "menuContainer">
                       {menu && (
                        <div className = "productContainer">
                            {menu.map(product => (
                                <button className='products' value={product.pID}onClick={getindex}>{product.pName} </button>
                            ))}
                        </div>
                       )} 
                    </div>
                    <div  className = "menuContainer purchaseH" >
                        <button className = "purchase_button" id = "p_now" onClick={handleOrders}>Purchase Now</button>
                        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                    </div>
                
                </div>
                <div className={orderDisplayClass}>
                    <h2>Order List</h2>
                    <ul>
                        {orderDisplay.map((order, index) => (
                            <li key={index}>
                                {order.productName} - ₱{order.price}
                            </li>
                        ))}
                    </ul>
                </div>
                    
            </div>
    </div>
  )
}

export default OrderManagement;