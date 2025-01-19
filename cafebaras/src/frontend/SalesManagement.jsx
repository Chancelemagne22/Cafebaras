import {OrderListdisplay, Productdisplay, Sidebardisplay} from './Sales/sales';
import { useState, useEffect } from 'react';
import '../designs/SalesManagement.css'
function SalesManagement(){
    const [displayOrderList, setDisplayOrderList] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [rowOrder, setRowOrders] = useState([]);
    const [recipeList, setProductRecipeList] = useState([]);
    const [combinedRecipes, setCombinedRecipes] = useState({});

    
  

    useEffect(() => {
        if (displayOrderList) {
          const combined = recipeHandler(recipeList);
          console.log("Updated combined recipes:", combined);
          setCombinedRecipes(combined);
        }
      }, [recipeList, displayOrderList]);
    
      const recipeHandler = (updatedRecipeList) => {
        const combined = {};
        updatedRecipeList.forEach((recipe) => {
          Object.entries(recipe).forEach(([ingredient, quantity]) => {
            combined[ingredient] = (combined[ingredient] || 0) + quantity;
          });
        });
        return combined;
      };
    
      const addRow = (product) => {
        const size = product.pName.includes("-s")
          ? "Small"
          : product.pName.includes("-m")
          ? "Medium"
          : product.pName.includes("-l")
          ? "Large"
          : "N/A";
        const cleanName = product.pName.replace(/-s$|-m$|-l$/, "");
    
        const newRow = {
          col1: cleanName,
          col2: size,
          col3: product.price,
        };
        const recipe = product.recipes;
    
        // Update recipe list
        setProductRecipeList((prevRecipeList) => [...prevRecipeList, recipe]);
    
        // Update row order
        setRowOrders((prevOrders) => [...prevOrders, newRow]);
        
    };

    useEffect(() => {
        console.log("Combined Recipes:", combinedRecipes);
        console.log("Confirm Order:", confirmOrder);
        if(confirmOrder){
            console.log(combinedRecipes)

            const productConfirm = async () => {
              const response = await fetch("http://localhost:3001/api/products/update-quantities", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(combinedRecipes), // Send the object directly
              });
            
              if (response.ok) {
                console.log("Inventory Update Confirmed");
              } else {
                const errorData = await response.json();
                console.error("Error during inventory update:", errorData);
              }
            };
            
            productConfirm();
            setConfirmOrder(false);
        }
    })
    return(
        <div className="salesContent">
            <div className="salesDisplay">
                <Sidebardisplay rowOrder={rowOrder} setRowOrders={setRowOrders}  setProductRecipeList={setProductRecipeList} />

                <Productdisplay addRow={addRow} setDisplayOrderList={setDisplayOrderList} />

                {displayOrderList && <OrderListdisplay rowOrder={rowOrder} setDisplayOrderList={setDisplayOrderList} 
                setConfirmOrder={setConfirmOrder} />}
            </div>
        </div>
    )
}
export default SalesManagement;