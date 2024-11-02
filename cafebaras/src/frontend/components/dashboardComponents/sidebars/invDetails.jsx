import React from "react";
import { useNavigate } from 'react-router-dom'; 

function InvDetails ({setId, setToHome}){



    return (
        <>
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
            <div className="back" onClick={() => setToHome("module")}>
                <p>Back</p>
            </div>
        </>
    )
}

export default InvDetails;