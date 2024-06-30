document.addEventListener("DOMContentLoaded", function() {
    // Initialize cart
    let cart = [];

    // Add event listeners to Add to Cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Add item to cart
    function addToCart(event) {
        const button = event.target;
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const imgSrc = button.closest(".product-item").querySelector("img").src;

        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1, imgSrc });
        }

        updateCart();
    }

    // Update cart display
    function updateCart() {
        const cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.innerHTML = "";

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button class="remove-from-cart" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
        removeFromCartButtons.forEach(button => {
            button.addEventListener("click", removeFromCart);
        });

        updateCartTotal();
    }

    // Remove item from cart
    function removeFromCart(event) {
        const button = event.target;
        const name = button.getAttribute("data-name");
        cart = cart.filter(item => item.name !== name);

        updateCart();
    }

    // Update cart total
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById("cart-total").textContent = total.toFixed(2);
    }
});