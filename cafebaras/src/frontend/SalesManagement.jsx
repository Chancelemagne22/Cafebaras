import {OrderListdisplay, Productdisplay, Sidebardisplay} from './Sales/sales';
import { useState } from 'react';
import '../designs/SalesManagement.css'
function SalesManagement(){
    const [displayOrderList, setDisplayOrderList] = useState(false);
    const [rowOrder, setRowOrders] = useState([]);
    
    const addRow = (product) => {
        // Extract size based on product name
        const size = product.pName.includes('-s') ? 'Small' :
                     product.pName.includes('-m') ? 'Medium' :
                     product.pName.includes('-l') ? 'Large' :
                     'N/A';  // Default size if no size is specified
        const cleanName = product.pName.replace(/-s$|-m$|-l$/, '');
    
        const newRow = {
          col1: cleanName,
          col2: size,  // Extracted size
          col3: product.price,
        };
    
        // Pass new row to Sidebardisplay via props
        setRowOrders((prevOrders) => [...prevOrders, newRow]);
    }
    
    return(
        <div className="salesContent">
            <div className="salesDisplay">
                <Sidebardisplay rowOrder={rowOrder} setRowOrders={setRowOrders} />
                <Productdisplay addRow={addRow} setDisplayOrderList={setDisplayOrderList} />
                {displayOrderList && <OrderListdisplay rowOrder={rowOrder} setDisplayOrderList={setDisplayOrderList} />}
            </div>
        </div>
        
    )
}
export default SalesManagement;