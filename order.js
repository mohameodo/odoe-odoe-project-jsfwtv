document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('order-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: {} };

    const renderCart = () => {
        if (!cart.shopId || Object.keys(cart.items).length === 0) {
            orderContainer.innerHTML = `
                <div class="text-center bg-white p-8 rounded-lg shadow-md">
                    <i class="fas fa-shopping-cart text-4xl text-brown-500 mb-4"></i>
                    <h2 class="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
                    <p class="text-brown-700 mb-6">Looks like you haven't added anything to your order yet.</p>
                    <a href="/shops.html" class="bg-brown-700 text-white px-6 py-3 rounded-full hover:bg-brown-900 transition">Start Shopping</a>
                </div>
            `;
            return;
        }

        const shop = coffeeShops.find(s => s.id === cart.shopId);
        let itemsHtml = '';
        let subtotal = 0;

        Object.values(cart.items).forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            itemsHtml += `
                <div class="flex justify-between items-center py-4 border-b border-cream-300">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-sm text-brown-500">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center border border-cream-300 rounded-full">
                            <button data-item-id="${item.id}" class="quantity-change-btn w-8 h-8 text-lg">-</button>
                            <span class="w-8 text-center">${item.quantity}</span>
                            <button data-item-id="${item.id}" class="quantity-change-btn w-8 h-8 text-lg">+</button>
                        </div>
                        <p class="font-semibold w-16 text-right">$${itemTotal.toFixed(2)}</p>
                        <button data-item-id="${item.id}" class="remove-item-btn text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });

        orderContainer.innerHTML = `
            <div class="bg-white p-8 rounded-xl shadow-xl">
                <h2 class="text-2xl font-bold mb-4 font-serif">Order from ${shop.name}</h2>
                <div id="cart-items">${itemsHtml}</div>
                <div class="mt-6 text-right">
                    <p class="text-xl font-semibold">Subtotal: <span id="subtotal">$${subtotal.toFixed(2)}</span></p>
                    <p class="text-sm text-brown-500">Taxes and fees calculated at checkout.</p>
                </div>
                <div class="mt-8 border-t pt-8">
                    <h3 class="text-xl font-bold mb-4 font-serif">Checkout</h3>
                    <form id="checkout-form">
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-brown-700 mb-1">Full Name</label>
                            <input type="text" id="name" name="name" required class="w-full p-3 border border-cream-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500">
                        </div>
                        <div class="mb-4">
                            <label for="pickup-time" class="block text-sm font-medium text-brown-700 mb-1">Pickup Time</label>
                            <select id="pickup-time" name="pickup-time" required class="w-full p-3 border border-cream-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brown-500">
                                <option>ASAP (15-20 min)</option>
                                <option>In 30 minutes</option>
                                <option>In 1 hour</option>
                            </select>
                        </div>
                        <button type="submit" class="w-full bg-brown-700 text-white py-3 rounded-full text-lg font-semibold hover:bg-brown-900 transition-transform hover:scale-105 mt-4">Place Order</button>
                    </form>
                </div>
            </div>
        `;

        addEventListeners();
    };

    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    const addEventListeners = () => {
        document.querySelectorAll('.quantity-change-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const itemId = e.target.dataset.itemId;
                const change = e.target.textContent === '+' ? 1 : -1;
                cart.items[itemId].quantity += change;
                if (cart.items[itemId].quantity <= 0) {
                    delete cart.items[itemId];
                }
                if (Object.keys(cart.items).length === 0) cart.shopId = null;
                updateCart();
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const itemId = e.currentTarget.dataset.itemId;
                delete cart.items[itemId];
                if (Object.keys(cart.items).length === 0) cart.shopId = null;
                updateCart();
            });
        });

        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', e => {
                e.preventDefault();
                const formData = new FormData(checkoutForm);
                const subtotal = Object.values(cart.items).reduce((sum, item) => sum + item.price * item.quantity, 0);
                const orderDetails = {
                    name: formData.get('name'),
                    pickupTime: formData.get('pickup-time'),
                    total: subtotal,
                    orderNumber: Math.floor(100000 + Math.random() * 900000)
                };
                localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
                localStorage.removeItem('cart');
                window.location.href = '/confirmation.html';
            });
        }
    };

    renderCart();
});
