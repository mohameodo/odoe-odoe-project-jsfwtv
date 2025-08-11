document.addEventListener('DOMContentLoaded', () => {
    const featuredShopsContainer = document.getElementById('featured-shops');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

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
                <a href="/shop-detail.html?id=${shop.id}" class="inline-block bg-brown-700 text-white px-6 py-2 rounded-full hover:bg-brown-900 transition">View Details</a>
            </div>
        `;
        return card;
    };

    if (featuredShopsContainer) {
        const featuredShops = coffeeShops.filter(shop => shop.featured);
        featuredShops.forEach(shop => {
            const card = createShopCard(shop);
            featuredShopsContainer.appendChild(card);
        });
        // Animate cards on load
        setTimeout(() => {
            document.querySelectorAll('.card-enter').forEach(el => el.classList.add('card-enter-active'));
        }, 100);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value;
            window.location.href = `/shops.html?search=${encodeURIComponent(query)}`;
        });
    }
});
