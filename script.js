// Sample product data
const products = [
    { id: 1, name: "T-Shirt", price: 19.99, description: "Comfortable cotton t-shirt", details: "A classic cotton t-shirt." },
    { id: 2, name: "Sneakers", price: 49.99, description: "Stylish running sneakers", details: "Durable and stylish sneakers." },
    { id: 3, name: "Backpack", price: 29.99, description: "Spacious backpack", details: "Perfect for travel." },
    { id: 4, name: "Headphones", price: 39.99, description: "Noise-cancelling headphones", details: "Great sound quality." }
];

// Cart array
let cart = [];

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display products on the catalog page
function displayProducts() {
    const container = document.getElementById("products-container");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="viewProduct(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
}

// Sort products by price
function sortProductsByPrice() {
    products.sort((a, b) => a.price - b.price);
    document.getElementById("products-container").innerHTML = "";
    displayProducts();
}

// Add item to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
}

// Display cart contents
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    document.getElementById("total-price").innerText = total.toFixed(2);
}

// Remove item from the cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity === 0) cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
    }
}

// Checkout
function checkout() {
    alert(`Thank you! Your total is $${document.getElementById("total-price").innerText}`);
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Call functions on page load
window.onload = function() {
    if (document.getElementById("products-container")) displayProducts();
    loadCart();
};
