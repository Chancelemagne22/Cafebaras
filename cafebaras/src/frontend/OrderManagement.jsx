import React, {useEffect,useState} from 'react'
import '../designs/OrderManagement.css';
import { useNavigate } from 'react-router-dom';
import supabase from './order';
import CafeLogo from './assets/CafeLogo.png'


function OrderManagement () {
    const navigate = useNavigate();
    //const [orderClassName, setClassName] = useState('Order hide');
    //const [change, setChange] = useState(true);
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    var orderarray = [];
      useEffect(() => {
        const fetchMenu = async () => {
          setLoading(true); // Set loading to true at the start of fetch
          const { data, error } = await supabase
            .from('productsV4')
            .select('*');
            
          if (error) {
            console.error("Error fetching Products:", error);
          } 
          else {
            setMenu(data);
          }
          setLoading(false); // Set loading to false after fetch
        };
        
        fetchMenu();
      }, []);

      const getindex = async(e)=>{
        var index = await e.target.value;
        e.preventDefault();
        console.log(index);
        try {
            const { data,error } = await supabase
            .from('productsV4')
            .select('*')
            .eq('pID', index )
            .single();

            if (error){
                console.error("Error fetching Products:", error);
            }
            else{
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
                cell3.textContent = item.price;

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
    const handleOrders = async () => {
      const table = document.getElementById('outputTable').querySelector('tbody');
      table.innerHTML = ''; // Clear all table content
      console.log("Table reset");
      setError('');
      if (orderarray.length == 0){
        setError("No order inputed in the system.")
      }

      // Reverse the array to process orders in reverse order
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
              const date = new Date();
  
              // Insert transaction into Supabase
              const { error } = await supabase
                  .from('transactions')
                  .insert([{ date, productID, productName, price }]);
  
              if (error) {
                  console.error("Error Transaction:", error);
                  return res.status(400).json({
                      error: 'Transaction failed.',
                      details: error.message,
                  });
              }
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
              //const updatedquantity = 0;
              console.log(Item,quantity);


              try {
                  // fetch data from Supabase
                  const { data, error } = await supabase
                  .from('stocksV3')
                  .select('Stocked_Units, Used_Units')
                  .eq('Item_Name', Item);
              
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
              //updatedquantity = updated;
              console.log("updated stocks",updated)

              try {
                  const { data, error } = await supabase
                  .from('stocksV3')
                  .update({Stocked_Units: updated, Used_Units:updatedused})
                  .eq('Item_Name', Item);
  
                  if (error) {
                      console.error("Error updating record:", error);
                  } else {
                      console.log("Updated record:", data);
                  }
                 }
                 catch{
  
                 }

              } catch (err) {
                  console.error("Unexpected error during transaction:", err);
              }
              
          }
          
      }
  };
  /*useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        navigate('/');
    } 
  }, []);*/
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
                                <th> Product Name </th>
                                <th>Price</th>
                                <th></th>
                                </tr>
                            </thead>   
                            <tbody>
                            </tbody> 
                        </table>
                    </div>
              <div className="back" onClick={() => {navigate('/dashboard')}}>
                Back
              </div>
            </div>
            <div className="mainContentSales">
              
                <div className = "Product_Selection" id = "Options">
                <div className = "menuContainer">
                       {menu && (
                        <div className = "productContainer">
                            {menu.map(product => (
                                <button value={product.pID}onClick={getindex}>{product.pName} </button>
                            ))}
                        </div>
                       )} 
                    </div>
                    <div  className = "menuContainer" >
                        <button className = "purchase_button" id = "p_now" onClick={handleOrders}>Purchase Now</button>
                </div>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                </div>
              
            </div>
    </div>
  )
}

export default OrderManagement;