// Smooth scrolling for navigation
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add interactivity for tiles (Gallery and Features)
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        alert('Tile clicked!');
    });
});
