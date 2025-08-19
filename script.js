// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Form submission handling
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const issue = document.getElementById('issue').value;
            
            // In a real application, you would send this data to your server
            // For this example, we'll just show an alert
            alert(`Thank you ${name}! We'll call you at ${phone} shortly. Our plumber near ${location} will contact you about your ${issue} issue.`);
            
            // Reset form
            callbackForm.reset();
        });
    }
    
    // Add structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Plumber",
        "name": "Berkshire Emergency Plumbers",
        "description": "24/7 Emergency Plumber in Berkshire. Fast response, no call-out fee. Fixed prices, local plumbers available anytime for plumbing emergencies.",
        "url": "https://www.berkshireemergencyplumbers.co.uk",
        "telephone": "+44-118-901-2345",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Berkshire",
            "addressCountry": "UK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "51.4226",
            "longitude": "-0.6429"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "51.4226",
                "longitude": "-0.6429"
            },
            "geoRadius": "30000"
        },
        "sameAs": [
            "https://www.facebook.com/berkshireemergencyplumbers",
            "https://twitter.com/berkshireplumb",
            "https://www.instagram.com/berkshireemergencyplumbers"
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
});