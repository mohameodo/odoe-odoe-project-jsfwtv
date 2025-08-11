document.addEventListener('DOMContentLoaded', () => {
    const shopsListContainer = document.getElementById('shops-list');
    const noResultsDiv = document.getElementById('no-results');
    const searchInput = document.getElementById('search-shops-input');
    const ratingFilter = document.getElementById('filter-rating');
    const clearButton = document.getElementById('clear-filters');

    const renderStarRating = (rating) => {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star text-yellow-400"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars += '<i class="far fa-star text-yellow-400"></i>';
        }
        return stars;
    };

    const createShopCard = (shop) => {
        const card = document.createElement('div');
        card.className = 'bg-cream-100 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 card-enter';
        card.innerHTML = `
            <img src="${shop.imageUrl}" alt="${shop.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 font-serif">${shop.name}</h3>
                <p class="text-brown-700 mb-2"><i class="fas fa-map-marker-alt mr-2"></i>${shop.address}</p>
                <div class="flex items-center mb-4">
                    <div class="flex mr-2">${renderStarRating(shop.rating)}</div>
                    <span class="text-sm text-brown-500">(${shop.rating})</span>
                </div>
                <a href="/shop-detail.html?id=${shop.id}" class="inline-block bg-brown-700 text-white px-6 py-2 rounded-full hover:bg-brown-900 transition">View Menu & Reviews</a>
            </div>
        `;
        return card;
    };

    const displayShops = (shops) => {
        shopsListContainer.innerHTML = '';
        if (shops.length === 0) {
            noResultsDiv.classList.remove('hidden');
        } else {
            noResultsDiv.classList.add('hidden');
            shops.forEach(shop => {
                const card = createShopCard(shop);
                shopsListContainer.appendChild(card);
            });
            // Animate cards on display
            setTimeout(() => {
                document.querySelectorAll('.card-enter').forEach(el => el.classList.add('card-enter-active'));
            }, 100);
        }
    };

    const filterShops = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const minRating = parseFloat(ratingFilter.value);

        const filteredShops = coffeeShops.filter(shop => {
            const nameMatch = shop.name.toLowerCase().includes(searchTerm);
            const ratingMatch = shop.rating >= minRating;
            return nameMatch && ratingMatch;
        });

        displayShops(filteredShops);
    };

    // Initial display and handling of search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchInput.value = searchQuery;
    }

    filterShops();

    searchInput.addEventListener('input', filterShops);
    ratingFilter.addEventListener('change', filterShops);
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        ratingFilter.value = '0';
        filterShops();
    });
});
