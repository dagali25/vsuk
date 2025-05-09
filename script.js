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
    {
        id: "BBH-987",
        date: "2023-09-28",
        items: "Ultimate Dessert Tower (1)",
        total: "£79.99",
        status: "shipped"
    },
    {
        id: "BBH-956",
        date: "2023-09-10",
        items: "Brownie Sampler Box (1), Chocolate Lava Cake (2)",
        total: "£109.97",
        status: "processing"
    }
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
    {
        type: "Work",
        street: "456 Chocolate Avenue",
        city: "Cake Town",
        postcode: "CT3 4DE",
        country: "United Kingdom",
        isDefault: false
    }
];

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>'; });

// Close mobile menu when clicking on a link document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
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
const accountText = document.getElementById('accountText');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const dashboardLink = document.getElementById('dashboardLink');
const logoutLink = document.getElementById('logoutLink');

accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    accountDropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
    accountDropdown.classList.remove('active');
});

// Auth Modal
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthModal('login');
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthModal('register');
});

dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#account';
    document.getElementById('accountDashboard').classList.add('active');
});

logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

closeAuth.addEventListener('click', () => {
    authModal.classList.remove('active');
});

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${tabName}Form`).classList.add('active');
    });
});

function showAuthModal(form) {
    authModal.classList.add('active');
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${form}"]`).classList.add('active');
    document.getElementById(`${form}Form`).classList.add('active');
}

// Login Form
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        login();
    } else {
        alert('Please fill in all fields');
    }
});

// Register Form
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    // Simple validation
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    // Update user data
    user.name = name;
    user.email = email;
    
    login();
});

// Login function
function login() {
    isLoggedIn = true;
    authModal.classList.remove('active');
    updateAccountUI();
    
    // Clear forms
    loginForm.reset();
    registerForm.reset();
    
    // Show welcome message
    alert(`Welcome back, ${user.name}!`); }

// Logout function
function logout() {
    isLoggedIn = false;
    updateAccountUI();
    window.location.hash = '';
    document.getElementById('accountDashboard').classList.remove('active');
}

// Update account UI based on login state function updateAccountUI() {
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

// Dashboard Navigation
const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a'); const dashboardSections = document.querySelectorAll('.dashboard-section');

dashboardNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        
        dashboardNavLinks.forEach(l => l.classList.remove('active'));
        dashboardSections.forEach(s => s.classList.remove('active'));
        
        link.classList.add('active');
        document.getElementById(`${section}Section`).classList.add('active');
    });
});

// Populate Order History
function populateOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    orderHistory.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.items}</td>
            <td>${order.total}</td>
            <td><span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        `;
        orderHistory.appendChild(row);
    });
}

// Populate Address Book
function populateAddressBook() {
    const addressCards = document.getElementById('addressCards');
    addressCards.innerHTML = '';
    
    addresses.forEach(address => {
        const card = document.createElement('div');
        card.className = 'address-card';
        card.innerHTML = `
            <h4>${address.type} ${address.isDefault ? '(Default)' : ''}</h4>
            <p>${address.street}</p>
            <p>${address.city}</p>
            <p>${address.postcode}</p>
            <p>${address.country}</p>
            <div class="address-actions">
                <button class="btn-outline">Edit</button>
                ${!address.isDefault ? '<button class="btn-outline">Set as Default</button>' : ''}
                ${!address.isDefault ? '<button class="btn-outline">Remove</button>' : ''}
            </div>
        `;
        addressCards.appendChild(card);
    });
}

// Hash Change Handler
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#account' && isLoggedIn) {
        document.getElementById('accountDashboard').classList.add('active');
        populateOrderHistory();
        populateAddressBook();
    } else {
        document.getElementById('accountDashboard').classList.remove('active');
    }
});

// Product data
const products = [
    {
        id: 1,
        name: "Classic Fudge Brownie",
        description: "Our signature rich, fudgy brownie with a crackly top and deep chocolate flavor.",
        price: "£24.99",
        category: "brownies",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSqbMqnsK$ "
    },
    {
        id: 2,
        name: "Salted Caramel Brownie",
        description: "Decadent chocolate brownie swirled with homemade salted caramel sauce.",
        price: "£27.99",
        category: "brownies",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWShuic61E$ "
    },
    {
        id: 3,
        name: "Walnut Crunch Brownie",
        description: "Classic fudge brownie loaded with crunchy walnuts for the perfect texture contrast.",
        price: "£26.99",
        category: "brownies",
        image: "chocolate-walnut-brownie.avif"
    },
    {
        id: 4,
        name: "Red Velvet Cheesecake",
        description: "Layers of red velvet cake and creamy cheesecake topped with cream cheese frosting.",
        price: "£34.99",
        category: "desserts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSiSwP702$ "
    },
    {
        id: 5,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
        price: "£29.99",
        category: "desserts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSqbMqnsK$ "
    },
    {
        id: 6,
        name: "Brownie Sampler Box",
        description: "A selection of our most popular brownies including classic, caramel, and walnut.",
        price: "£49.99",
        category: "gifts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWShuic61E$ "
    },
    {
        id: 7,
        name: "Ultimate Dessert Tower",
        description: "Three-tier dessert tower featuring our best-selling cakes, brownies, and cookies.",
        price: "£79.99",
        category: "gifts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSoYW-i7W$ "
    },
    {
        id: 8,
        name: "Blondie Bar",
        description: "Buttery vanilla blondie with white chocolate chunks and macadamia nuts.",
        price: "£25.99",
        category: "brownies",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWShuic61E$ "
    },
    {
        id: 9,
        name: "Chocolate Raspberry Tart",
        description: "Silky chocolate ganache in a buttery crust topped with fresh raspberries.",
        price: "£32.99",
        category: "desserts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSrt6odva$ "
    },
    {
        id: 10,
        name: "Cookie Dough Brownie",
        description: "Fudgy brownie layered with edible cookie dough and chocolate chips.",
        price: "£28.99",
        category: "brownies",
        image: "Cookie-Dough-Brownies.jpg"
    },
    {
        id: 11,
        name: "Luxury Gift Hamper",
        description: "Curated selection of our finest desserts, perfect for gifting.",
        price: "£89.99",
        category: "gifts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSthpWj56$ "
    },
    {
        id: 12,
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: "£31.99",
        category: "desserts",
        image: "https://urldefense.com/v3/__https://images.unsplash.com/photo-1626803775151-61d756612f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA*3D*3D&auto=format&fit=crop&w=500&q=80__;JSU!!F1ew_n7Lmw!gSxqjV2OZ2Rrau9HqUQWKYH8FnWwQzPPaWSe4qScJ_8VO7XKrdNAfaDs5nh-OAkHHOJ5rU5sbhBVSc7gjlJWSupdxJsj$ "
    }
];

// Function to render products
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
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="view-details">View Details</button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Category filter functionality
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// Initial render
renderProducts();

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Account Details Form
document.getElementById('accountDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    user.name = document.getElementById('accountName').value;
    user.email = document.getElementById('accountEmail').value;
    user.phone = document.getElementById('accountPhone').value;
    accountText.textContent = user.name.split(' ')[0];
    alert('Account details updated successfully!'); });

// Initialize
updateAccountUI();