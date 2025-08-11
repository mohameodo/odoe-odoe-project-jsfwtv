const coffeeShops = [
  {
    id: 1,
    name: "The Daily Grind",
    address: "123 Main St, Anytown, USA",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1511920183353-3c79502f5a4c?q=80&w=1887&auto=format&fit=crop",
    hours: "7:00 AM - 6:00 PM",
    featured: true,
    menu: [
      { id: 'm1', name: 'Espresso', price: 2.75, category: 'Coffee' },
      { id: 'm2', name: 'Cappuccino', price: 3.50, category: 'Coffee' },
      { id: 'm3', name: 'Iced Latte', price: 4.25, category: 'Coffee' },
      { id: 'm4', name: 'Croissant', price: 2.50, category: 'Pastry' },
      { id: 'm5', name: 'Blueberry Muffin', price: 3.00, category: 'Pastry' }
    ],
    reviews: [
      { user: 'Jane D.', rating: 5, comment: 'Best coffee in town! The atmosphere is so cozy.' },
      { user: 'John S.', rating: 4, comment: 'Great place to work. Wifi is fast and the staff is friendly.' }
    ]
  },
  {
    id: 2,
    name: "Aroma Mocha",
    address: "456 Oak Ave, Anytown, USA",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    hours: "6:30 AM - 8:00 PM",
    featured: true,
    menu: [
      { id: 'm6', name: 'Drip Coffee', price: 2.50, category: 'Coffee' },
      { id: 'm7', name: 'Caramel Macchiato', price: 4.75, category: 'Coffee' },
      { id: 'm8', name: 'Chai Latte', price: 4.50, category: 'Tea' },
      { id: 'm9', name: 'Scone', price: 3.25, category: 'Pastry' },
    ],
    reviews: [
      { user: 'Emily R.', rating: 5, comment: 'Their caramel macchiato is to die for! I come here every week.' },
      { user: 'Mike B.', rating: 4, comment: 'A bit pricey, but the quality is undeniable. Love the patio.' }
    ]
  },
  {
    id: 3,
    name: "Bean Scene",
    address: "789 Pine Ln, Anytown, USA",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop",
    hours: "8:00 AM - 5:00 PM",
    featured: true,
    menu: [
      { id: 'm10', name: 'Americano', price: 3.00, category: 'Coffee' },
      { id: 'm11', name: 'Flat White', price: 4.00, category: 'Coffee' },
      { id: 'm12', name: 'Green Tea', price: 2.75, category: 'Tea' },
      { id: 'm13', name: 'Bagel with Cream Cheese', price: 3.75, category: 'Food' },
    ],
    reviews: [
      { user: 'Sarah K.', rating: 4, comment: 'Solid coffee and a quiet place to read.' },
      { user: 'David L.', rating: 4, comment: 'Good, reliable spot. Nothing fancy, but gets the job done.' }
    ]
  },
  {
    id: 4,
    name: "Grind House",
    address: "101 Maple Dr, Anytown, USA",
    rating: 3.9,
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1961&auto=format&fit=crop",
    hours: "6:00 AM - 9:00 PM",
    featured: false,
    menu: [
        { id: 'm14', name: 'Cold Brew', price: 4.50, category: 'Coffee' },
        { id: 'm15', name: 'Mocha', price: 4.75, category: 'Coffee' },
        { id: 'm16', name: 'Breakfast Burrito', price: 6.50, category: 'Food' },
    ],
    reviews: [
        { user: 'Chris P.', rating: 4, comment: 'The cold brew is strong! Just how I like it.' },
        { user: 'Jessica H.', rating: 3, comment: 'It was okay. A bit crowded and loud for my taste.' }
    ]
  }
];