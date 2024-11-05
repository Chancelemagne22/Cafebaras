import { useState } from "react";



function SalesManagment(){
    const [orderClassName, setClassName] = useState('Order hide');
    const [change, setChange] = useState(true);
    const togglePopup =() =>{
        if(change){
            setClassName('Order show')
            setChange(false)
        }else{
            setClassName('Order hide')
            setChange(true)
        }
    }

    return(
        <>
            <div className="orderM">
                <div className = "Product_Selection" id = "Options">
                    
                    <div className = "orderContainer">
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                        <button onClick={togglePopup} className = "circle" id = "circle1">Product</button>
                    </div>
                </div>

                <div className = {orderClassName} id = "OrderPop">
                    <div className = "orderContent" id = "rec3">
                        <h1 id = "orderText">Order Modifications</h1>
                        <div className="orderDetails">
                            <div className = "selectedOrder" id = "circle2"><p>Product</p></div>
                            <div className="sectionPay">
                                <div className = "types" id = "rec2">
                                    <div className = "sizes">
                                        <h4 id = "size_text">BOTTLE SIZE</h4>
                                        <label for="30oz" className = "radio_inline"><input type = "radio" name = "size_choices" id = "30oz"/>30oz</label>
                                        <label for="20oz" className = "radio_inline"><input type = "radio" name = "size_choices" id = "20oz"/>20oz</label>
                                        <label for="10oz" className = "radio_inline"><input type = "radio" name = "size_choices" id = "10oz"/>10oz</label>
                                    </div>
                                    <div className = "sugar">
                                        <h4 id = "sugar_text">SUGAR CONTENT</h4>
                                        <label for="50%" className = "radio_inline"><input type = "radio" name = "sugar_choices" id = "50%"/>50%</label>
                                        <label for="75%" className = "radio_inline"><input type = "radio" name = "sugar_choices" id = "75%"/>75%</label>
                                        <label for="100%" className = "radio_inline"><input type = "radio" name = "sugar_choices" id = "100%"/>100%</label>
                                    </div>
                                    <div className = "add_on">
                                        <h4 id = "add_on_text">SINKERS</h4>
                                        <label for="tapioca" className = "radio_inline"><input type = "radio" name = "add_on_choices" id = "tapioca"/>tapioca</label>
                                        <label for="ewan" className = "radio_inline"><input type = "radio" name = "add_on_choices" id = "ewan"/>ewan</label>
                                        <label for="ano" className = "radio_inline"><input type = "radio" name = "add_on_choices" id = "ano"/>ano</label>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className = "purchase_button" id = "p_now">Purchase Now</button>    
                                    <button className = "purchase_button" id = "add">Add to Cart</button>
                                    <button className = "close_btn" onClick={togglePopup}>&times;</button>
                                </div>
                            </div>
                            
                            

                        </div>
                        
                    </div>
                </div>
                <div>
                    <div className = "rec" id = "rec1"></div>
                </div>
            </div>
        </>
    )
}


export default SalesManagment;