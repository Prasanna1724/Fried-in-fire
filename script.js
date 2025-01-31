// Initialize cart as an empty array
let cart = [];

// Add event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const itemName = e.target.dataset.name;
        const itemPrice = parseFloat(e.target.dataset.price);

        // Add the item to the cart
        cart.push({ name: itemName, price: itemPrice });

        // Update the cart display
        updateCart();
    });
});

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    
    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Calculate total price
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItemDiv);

        totalPrice += item.price;
    });

    totalPriceContainer.innerText = totalPrice.toFixed(2);
}

// Clear cart functionality
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = []; // Reset the cart
    updateCart(); // Update cart display
});


// Handle order form submission
document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (cart.length === 0) {
        alert('Your cart is empty! Add items to the cart before placing an order.');
        return;
    }

    const orderDetails = {
        name,
        email,
        address,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
    };

    // Simulate order submission (e.g., sending data to a server)
    console.log('Order placed:', orderDetails);

    // Clear the cart and reset the form
    cart = [];
    updateCart();
    document.getElementById('order-form').reset();
    alert('Your order has been placed successfully!');
});
