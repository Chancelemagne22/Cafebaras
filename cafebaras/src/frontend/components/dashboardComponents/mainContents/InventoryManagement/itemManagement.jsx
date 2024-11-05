import React, { useState } from "react"
import { Button } from 'primereact/button';

function ItemManagement(){
    const [selectedOption, setSelectedOption] = useState("Inventory");

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return(
        <div className="itemmanagement">
            <div className="dropdown-container">
                <select value={selectedOption} onChange={handleDropdownChange} className="dropdown">
                    <option value="Inventory">Inventory</option>
                    <option value="Products">Products</option>
                </select>
            </div>
            
            <div className="table-container">
                <div className="tablebg">           
                </div>
            </div>
            <div className = "button-container">
                <Button className = "add-button" label="Add Item" />
                <Button className = "remove-button" label="Remove Item"/>
            </div>    
        </div>
    );
}

export default ItemManagement