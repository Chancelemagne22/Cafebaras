import React, { useState } from "react"

function ItemManagement({id}){
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
                    <table class="inner-table">
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Unit Cost</th>
                                <th>Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                                <td>Data 4</td>
                                <td>Data 5</td>
                            </tr>
                            <tr>
                                <td>Data 6</td>
                                <td>Data 7</td>
                                <td>Data 8</td>
                                <td>Data 9</td>
                                <td>Data 10</td>
                            </tr>
                            <tr>
                                <td>Data 11</td>
                                <td>Data 12</td>
                                <td>Data 13</td>
                                <td>Data 14</td>
                                <td>Data 15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "button-container">
                <div className = "add-button">Add Item</div>
                <div className = "remove-button">Remove Item</div>
            </div>    
        </div>
    );
}

export default ItemManagement