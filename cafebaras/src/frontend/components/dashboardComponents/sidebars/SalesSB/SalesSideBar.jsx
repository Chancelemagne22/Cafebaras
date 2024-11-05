import React, { useState } from 'react';

function SalesSideBar({ setToHome}) {


    return (
        <>
            <div className="back"  onClick={() => { setToHome("module");}}>
                Back
            </div>
        </>
    );
}

export default SalesSideBar;
