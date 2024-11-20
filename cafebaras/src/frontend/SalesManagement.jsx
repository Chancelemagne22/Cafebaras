import React, {useEffect} from 'react'
import '../designs/SalesManagement.css';


function SalesManagement () {


  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        navigate('/');
    } 
  }, []);
  return (
    <div className="dashboard">
            <div className="sidebarSales">

            </div>
            <div className="mainContentSales">

            </div>
    </div>
  )
}

export default SalesManagement