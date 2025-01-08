import React, { useState, useEffect } from "react";
import CafeLoading from '../assets/Cafebara_buttroll.gif'


export default function Productdisplay({ addRow, setDisplayOrderList}) {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  
  const displayList = () => {
    setDisplayOrderList((prevDisplayOrderList) => !prevDisplayOrderList);
  };
  

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const groupedProducts = menu.reduce((acc, item) => {
    const isSizedProduct = item.pName.includes("-");
    const baseName = isSizedProduct ? item.pName.split("-")[0] : "Z-AddOns";


    if (!acc[baseName]) {
      acc[baseName] = [];
    }
    acc[baseName].push(item);
    return acc;
  }, {});

  // const groupNames = Object.keys(groupedProducts);
  // console.log(groupNames)
  // const maxRows = Math.max(...Object.values(groupedProducts).map((group) => group.length));

  return (
    <div className="productDisplay">
      {loading ? (
        <img style={{height: '50%', width: '50%'}} src={CafeLoading} alt="" />
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="product-types" >
          {Object.entries(groupedProducts).map(([key, values]) => (
            <div className="product-name"
              key={key}
            >
              {/* Heading */}
              <h3 style={{ margin: '0 0 10px', textTransform: 'capitalize' }}>{key}</h3>
              
              {/* Rows */}
              {values.map((item) => (
                <div className="product-details"
                  key={item.pID}

                  onClick={() => {
                    
                    if (item) {
                      addRow(item); // Add the product to the order list
                    }
                  }}
                  style={{ cursor: "pointer" }} // Optional: makes it look clickable
                >
                  <span>{item.pName}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        
      )}
      <div className="purchaseDisplay">
        <button onClick={displayList}>CHECKOUT</button>
      </div>
    </div>
  );
}
