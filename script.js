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
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
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
    alert(`Welcome back, ${user.name}!`);
}

// Logout function
function logout() {
    isLoggedIn = false;
    updateAccountUI();
    window.location.hash = '';
    document.getElementById('accountDashboard').classList.remove('active');
}

// Update account UI based on login state
function updateAccountUI() {
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
const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a'); 
const dashboardSections = document.querySelectorAll('.dashboard-section');

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
