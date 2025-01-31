let cart = [];

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';  // Clear previous cart items

    // Iterate through cart and add each item to the display
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: ₹${total}`;
}

// Add event listener to all 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const itemName = e.target.dataset.name;
        const itemPrice = parseFloat(e.target.dataset.price);

        // Add the item to the cart if it's not already in the cart
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            // If item already exists, just increase the quantity
            existingItem.quantity++;
        } else {
            // Add new item to the cart
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Hide "Add to Cart" button and show the quantity control
        const cardBody = e.target.closest('.card-body');
        cardBody.querySelector('.quantity-control').style.display = 'inline-flex';
        e.target.style.display = 'none';

        // Set initial quantity to 1
        const quantityDisplay = cardBody.querySelector('.quantity');
        quantityDisplay.textContent = 1;

        // Update the cart display
        updateCart();
    });
});

// Event listener for decrement button
document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('decrement')) {
        const quantityDisplay = e.target.closest('.quantity-control').querySelector('.quantity');
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }

        // Update the cart item quantity
        const itemName = e.target.closest('.card-body').querySelector('.add-to-cart').dataset.name;
        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity = quantity;
        }

        // Update the cart display
        updateCart();
    }
});

// Event listener for increment button
document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('increment')) {
        const quantityDisplay = e.target.closest('.quantity-control').querySelector('.quantity');
        let quantity = parseInt(quantityDisplay.textContent);
        quantity++;
        quantityDisplay.textContent = quantity;

        // Update the cart item quantity
        const itemName = e.target.closest('.card-body').querySelector('.add-to-cart').dataset.name;
        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity = quantity;
        }

        // Update the cart display
        updateCart();
    }
});

// Clear cart functionality
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = []; // Reset the cart
    updateCart(); // Update cart display
});