// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Enlarge Images in the Gallery
const galleryItems = document.querySelectorAll('.gallery-item img');
const body = document.body;

galleryItems.forEach(item => {
    item.addEventListener('click', e => {
        const imageSrc = e.target.src;
        const overlay = document.createElement('div');
        overlay.className = 'enlarged-image';
        overlay.innerHTML = `
            <button class="close-btn">&times;</button>
            <img src="${imageSrc}" alt="Enlarged Image">
        `;
        body.appendChild(overlay);

        const closeButton = overlay.querySelector('.close-btn');
        closeButton.addEventListener('click', () => {
            body.removeChild(overlay);
        });
    });
});
