let cart = [];

function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ₴${item.price} x ${item.quantity}
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.name}', 'decrease')">-</button>
                <button onclick="updateQuantity('${item.name}', 'increase')">+</button>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    totalPrice.textContent = total;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateQuantity(name, action) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity++;
        } else if (action === 'decrease' && cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        }
    }
    displayCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    displayCart();
}

function clearCart() {
    cart = [];
    displayCart();
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
}

const icon = document.querySelector('.icon');
const search = document.querySelector('.search');

icon.onclick = function() {
    search.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('mySearch');
    const itemsToSearch = document.querySelectorAll('.two .salat, .two2 .nashu, .two .pizza, .two .ruba, .two2 .vupechka, .two2 .maso');
    
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();

        itemsToSearch.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const isVisible = item.style.display !== 'none'; // Check if item is currently visible

            if (itemText.includes(searchText)) {
                if (!isVisible) {
                    item.style.display = 'block';
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
});

