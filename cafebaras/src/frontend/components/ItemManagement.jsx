import React, { useState } from "react"
import '../designs/ItemManagement.css';


function ItemManagement({id}){
    // return(
    //     <div className="itemmanagement">
    //         <div className="sidebar">
    //             <InvDetails/>
    //             <div className="logo">
    //                 <img src={Logo} alt="cafebara logo" />
    //             </div>
    //         </div>

    //         <div className="content">
    //             <div className="main-content">
    //                 <div className="dropdown-container">
    //                     <button className="dropdown-button">Inventory ▽</button>
    //                         <div className="dropdown-content">
    //                         <a href="#inventory">Inventory</a>
    //                         <a href="#product">Product</a>
    //                         </div>
    //                 </div>

    //                 <div className="tablebg">
    //                     <div className="table">
    //                         Tite
    //                     </div>
    //                 </div>

    //                 <div className = "button-container">
    //                     <div className = "add-button">Add Item</div>
    //                     <div className = "remove-button">Remove Item</div>
    //                 </div>    
    //             </div>
    //         </div>
    //     </div>
    // );
    return(
        <div className="itemmanagement">
    

            <div className="dropdown-container">
                <button className="dropdown-button">Inventory ▽</button>
                    <div className="dropdown-content">
                    <a href="#inventory">Inventory</a>
                    <a href="#product">Product</a>
                    </div>
            </div>

            <div className="tablebg">
                <div className="table">
                    Tite
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