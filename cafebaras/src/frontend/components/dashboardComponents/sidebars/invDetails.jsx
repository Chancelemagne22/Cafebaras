import React from "react";
import { useNavigate } from 'react-router-dom'; 

function InvDetails ({setId}){

    return (
        <>
            <div className = "homebtn">
                <p>Home (Logo)</p>
            </div>

            <div className="submods">
                <div className="itemmng">
                    <p>Item Management</p>
                </div>
                <div className="stockmng">
                    <p>Stock Management</p>
                </div>
                <div className="suppliermng">
                    <p>Supplier Management</p>
                </div>
            </div>
        </>
    )
}

export default InvDetails;