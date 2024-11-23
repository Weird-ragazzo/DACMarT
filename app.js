// Add event listener for "Add to Cart" buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Get the current cart from localStorage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item already exists in the cart
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            // If item already exists, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // If item doesn't exist, add it to the cart with quantity 1
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display (on this page)
        updateCart();
    });
});

// Function to update the cart display
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear the existing cart items display
    cartContainer.innerHTML = '';

    // Variables to store the total price
    let totalPrice = 0;

    // Loop through the cart items and display them
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name}</span> - ₹${item.price} x ${item.quantity}
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
        
        // Calculate total price
        totalPrice += item.price * item.quantity;
    });

    // Update the total price display with ₹ sign
    totalPriceElement.textContent = '₹' + totalPrice.toFixed(2);
}

// Add event listener to remove items from the cart
document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-item')) {
        const productName = event.target.getAttribute('data-name');

        // Get the current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove the item from the cart
        cart = cart.filter(item => item.name !== productName);

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        updateCart();
    }
});

// Call updateCart on page load to display existing items
window.onload = function () {
    updateCart();
};

// Add event listener to toggle CVV visibility
document.getElementById('toggle-cvv').addEventListener('click', function () {
    const cvvInput = document.getElementById('cvv');
    const toggleButton = document.getElementById('toggle-cvv');

    if (cvvInput.type === 'password') {
        // Show CVV
        cvvInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        // Hide CVV
        cvvInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
});
