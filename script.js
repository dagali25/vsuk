// Vape product data
const vapeData = [
    {
        id: 1,
        name: "Dinner Lady Lemon Tart",
        reference: "DL-LT-60ML",
        price: 12.99,
        category: "E-Liquid",
        type: "Dessert",
        flavor: "Lemon Tart",
        strength: "3mg",
        size: "60ml",
        description: "Award-winning lemon tart flavor with a perfect balance of zesty lemon and sweet pastry. 70/30 VG/PG ratio.",
        images: [
            "assets/lemon-tart-1.jpg",
            "assets/lemon-tart-2.jpg",
            "assets/lemon-tart-3.jpg"
        ],
        limited: false,
        stock: 50
    },
    {
        id: 2,
        name: "Vaporesso XROS 3 Pod Kit",
        reference: "VAP-XROS3-KIT",
        price: 24.99,
        category: "Pod System",
        type: "Starter Kit",
        battery: "1000mAh",
        pods: "0.6Ω & 1.0Ω",
        features: "Adjustable airflow, USB-C charging",
        description: "Compact and powerful pod system with improved flavor and adjustable airflow. Perfect for beginners and experienced vapers alike.",
        images: [
            "assets/xros3-1.jpg",
            "assets/xros3-2.jpg",
            "assets/xros3-3.jpg"
        ],
        limited: false,
        stock: 25
    },
    {
        id: 3,
        name: "Nasty Juice Cush Man",
        reference: "NJ-CM-50ML",
        price: 14.99,
        category: "E-Liquid",
        type: "Fruit",
        flavor: "Mango",
        strength: "6mg",
        size: "50ml",
        description: "Bold mango flavor with a hint of mint. One of the most popular fruit flavors in the UK. 70/30 VG/PG ratio.",
        images: [
            "assets/cushman-1.jpg",
            "assets/cushman-2.jpg",
            "assets/cushman-3.jpg"
        ],
        limited: false,
        stock: 35
    },
    {
        id: 4,
        name: "Geekvape Aegis Legend 2",
        reference: "GK-L2-KIT",
        price: 59.99,
        category: "Mod Kit",
        type: "Advanced",
        battery: "Dual 18650",
        power: "200W",
        features: "Waterproof, shockproof, dustproof",
        description: "The most durable mod kit on the market. IP68 rated waterproof and shockproof design with advanced chipset.",
        images: [
            "assets/aegis-1.jpg",
            "assets/aegis-2.jpg",
            "assets/aegis-3.jpg"
        ],
        limited: true,
        stock: 8
    },
    {
        id: 5,
        name: "Elux Legend 3500 Puffs",
        reference: "ELX-LGND-3500",
        price: 5.99,
        category: "Disposable",
        type: "Fruit",
        flavor: "Mixed Berries",
        strength: "20mg",
        puffs: "3500",
        description: "Convenient disposable vape with 3500 puffs and 20mg nicotine salt. No charging or refilling needed.",
        images: [
            "assets/elux-1.jpg",
            "assets/elux-2.jpg",
            "assets/elux-3.jpg"
        ],
        limited: false,
        stock: 100
    },
    {
        id: 6,
        name: "Cotton Bacon Prime",
        reference: "CB-PRIME-10G",
        price: 4.99,
        category: "Accessory",
        type: "Wicking",
        material: "Organic cotton",
        quantity: "10g",
        description: "Premium organic cotton for rebuildable atomizers. Ultra-clean flavor and excellent wicking properties.",
        images: [
            "assets/cotton-1.jpg",
            "assets/cotton-2.jpg",
            "assets/cotton-3.jpg"
        ],
        limited: false,
        stock: 75
    }
];

// Update all watch-related functions to use vapeData instead
// ... rest of the JavaScript remains structurally the same but references vape products ...