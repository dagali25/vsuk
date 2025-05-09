// Account State
let isLoggedIn = false;
const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+44 777 777 7777"
};

// Sample Order Data
const orders = [
    {
        id: "BBH-1001",
        date: "2023-10-15",
        items: "Classic Fudge Brownie (2), Salted Caramel Brownie (1)",
        total: "£77.97",
        status: "delivered"
    },
    // Add more sample orders here...
];

// Sample Address Data
const addresses = [
    {
        type: "Home",
        street: "123 Sweet Street",
        city: "Dessert City",
        postcode: "DC1 2AB",
        country: "United Kingdom",
        isDefault: true
    },
    // Add more sample addresses here...
];

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Account Dropdown
const accountBtn = document.getElementById('accountBtn');
const accountDropdown = document.getElementById('accountDropdown');
accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    accountDropdown.classList.toggle('active');
});

// Close dropdown on outside click
document.addEventListener('click', () => {
    accountDropdown.classList.remove('active');
});

// Render Products with Animation
function renderProducts(category = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">${product.price}</span>
                <div class="product-actions">
                    <button class="btn add-to-cart">Add to Cart</button>
                    <button class="btn-outline view-details">View Details</button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// Category Filter Functionality
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// Initial Product Render
renderProducts();

// Account UI Updates
function updateAccountUI() {
    const accountText = document.getElementById('accountText');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const logoutLink = document.getElementById('logoutLink');

    if (isLoggedIn) {
        accountText.textContent = user.name.split(' ')[0];
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        dashboardLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        accountText.textContent = 'Account';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        dashboardLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

// Login and Logout
function login() {
    isLoggedIn = true;
    updateAccountUI();
    alert(`Welcome back, ${user.name}!`);
}

function logout() {
    isLoggedIn = false;
    updateAccountUI();
    alert('You have been logged out.');
}

// Event Listeners for Login/Logout
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});

document.getElementById('logoutLink').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

// Responsive Animations
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
});
