// Function to handle the "Order Stocks" button click
document.addEventListener("DOMContentLoaded", function() {
    const orderButton = document.querySelector(".order-button");

    if (orderButton) {
        orderButton.addEventListener("click", function() {
            alert("Order Stocks button clicked!");
            // Additional logic for ordering stocks can go here
        });
    }
});