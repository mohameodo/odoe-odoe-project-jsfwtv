document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shop-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const shopId = parseInt(urlParams.get('id'));
    const shop = coffeeShops.find(s => s.id === shopId);

    if (!shop) {
        container.innerHTML = `<p class="text-center text-xl">Shop not found.</p>`;
        return;
    }

    const renderStarRating = (rating) => {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star text-yellow-400"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        for (let i = 0; i < 5 - Math.ceil(rating); i++) stars += '<i class="far fa-star text-yellow-400"></i>';
        return stars;
    };

    const renderShopDetails = () => {
        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div class="md:flex">
                    <div class="md:w-1/2">
                        <img src="${shop.imageUrl}" alt="${shop.name}" class="h-64 w-full object-cover md:h-full">
                    </div>
                    <div class="p-8 md:w-1/2">
                        <h1 class="text-4xl font-bold font-serif mb-2">${shop.name}</h1>
                        <p class="text-brown-700 mb-4"><i class="fas fa-map-marker-alt mr-2"></i>${shop.address}</p>
                        <div class="flex items-center mb-4">
                            <div class="flex mr-2">${renderStarRating(shop.rating)}</div>
                            <span class="text-sm text-brown-500">(${shop.rating} from ${shop.reviews.length} reviews)</span>
                        </div>
                        <p class="text-brown-700"><i class="fas fa-clock mr-2"></i>Open: ${shop.hours}</p>
                    </div>
                </div>
            </div>

            <div class="mt-12">
                <div class="border-b border-cream-300">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <button id="tab-menu" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 active">Menu</button>
                        <button id="tab-reviews" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Reviews</button>
                    </nav>
                </div>
                <div id="tab-content" class="mt-8"></div>
            </div>
        `;
        renderMenu();
        setupTabs();
    };

    const renderMenu = () => {
        const content = document.getElementById('tab-content');
        let menuHtml = '<div class="grid md:grid-cols-2 gap-6">';
        shop.menu.forEach(item => {
            menuHtml += `
                <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-brown-500">$${item.price.toFixed(2)}</p>
                    </div>
                    <button data-item-id="${item.id}" data-shop-id="${shop.id}" class="add-to-cart-btn bg-brown-700 text-white px-4 py-2 rounded-full hover:bg-brown-900 text-sm">Add</button>
                </div>
            `;
        });
        menuHtml += '</div>';
        content.innerHTML = menuHtml;
        addCartButtonListeners();
    };

    const renderReviews = () => {
        const content = document.getElementById('tab-content');
        let reviewsHtml = '<div class="space-y-6">';
        shop.reviews.forEach(review => {
            reviewsHtml += `
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex items-center mb-2">
                        <p class="font-semibold mr-4">${review.user}</p>
                        <div class="flex">${renderStarRating(review.rating)}</div>
                    </div>
                    <p class="text-brown-700 italic">"${review.comment}"</p>
                </div>
            `;
        });
        reviewsHtml += '</div>';
        content.innerHTML = reviewsHtml;
    };

    const setupTabs = () => {
        const menuTab = document.getElementById('tab-menu');
        const reviewsTab = document.getElementById('tab-reviews');
        menuTab.addEventListener('click', () => {
            menuTab.classList.add('active');
            reviewsTab.classList.remove('active');
            renderMenu();
        });
        reviewsTab.addEventListener('click', () => {
            reviewsTab.classList.add('active');
            menuTab.classList.remove('active');
            renderReviews();
        });
    };

    const addCartButtonListeners = () => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                const shopId = parseInt(e.target.dataset.shopId);
                addToCart(shopId, itemId);
                e.target.textContent = 'Added!';
                e.target.classList.add('bg-green-500');
                setTimeout(() => {
                   e.target.textContent = 'Add';
                   e.target.classList.remove('bg-green-500');
                }, 1000);
            });
        });
    };

    const addToCart = (shopId, itemId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || { shopId: null, items: {} };

        if (cart.shopId && cart.shopId !== shopId) {
            if (!confirm('You have items from another shop. Clear cart and add this item?')) {
                return;
            }
            cart = { shopId: shopId, items: {} };
        }

        cart.shopId = shopId;
        const itemKey = itemId;
        if (cart.items[itemKey]) {
            cart.items[itemKey].quantity++;
        } else {
            const shop = coffeeShops.find(s => s.id === shopId);
            const menuItem = shop.menu.find(m => m.id === itemId);
            cart.items[itemKey] = { ...menuItem, quantity: 1 };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    renderShopDetails();
});
