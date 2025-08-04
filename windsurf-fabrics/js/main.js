// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Sticky Header on Scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
        // Scroll Down
        header.classList.add('scrolled-down');
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
        // Scroll Up
        header.classList.remove('scrolled-down');
        header.style.transform = 'translateY(0)';
    }
    
    header.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.category-card, .partner-card, .about-content, .contact-container');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.category-card, .partner-card, .about-content, .contact-container');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            this.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '&uarr;';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

// Style the back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 999;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader-spinner">
        <div class="spinner"></div>
    </div>
`;

document.body.prepend(preloader);

// Add preloader styles
const preloaderStyle = document.createElement('style');
preloaderStyle.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s, visibility 0.5s;
    }
    
    .preloader-spinner {
        width: 50px;
        height: 50px;
    }
    
    .spinner {
        width: 100%;
        height: 100%;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .preloader.hidden {
        opacity: 0;
        visibility: hidden;
    }
`;
document.head.appendChild(preloaderStyle);

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Initialize AOS (Animate On Scroll)
// Note: For a production site, you might want to use the actual AOS library
// This is a simplified version for demonstration
const initAOS = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const checkIfInView = () => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
};

document.addEventListener('DOMContentLoaded', initAOS);

// View More Categories Toggle
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const moreCategories = document.getElementById('more-categories');
    const viewMoreText = document.querySelector('.view-more-text');
    const viewLessText = document.querySelector('.view-less-text');
    
    if (!viewMoreBtn || !moreCategories) return;
    
    // Set initial state
    let isExpanded = false;
    moreCategories.style.display = 'none';
    viewMoreText.style.display = 'inline';
    viewLessText.style.display = 'none';
    
    // Add click event
    viewMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle state
        isExpanded = !isExpanded;
        
        // Toggle display with animation
        if (isExpanded) {
            // Show more categories
            moreCategories.style.display = 'grid';
            moreCategories.style.animation = 'fadeIn 0.3s ease-in-out';
            viewMoreText.style.display = 'none';
            viewLessText.style.display = 'inline';
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            
            // Smooth scroll to show content
            setTimeout(() => {
                moreCategories.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
            
        } else {
            // Hide more categories with animation
            moreCategories.style.animation = 'fadeOut 0.3s ease-in-out';
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            
            // Hide after animation
            setTimeout(() => {
                moreCategories.style.display = 'none';
                viewMoreText.style.display = 'inline';
                viewLessText.style.display = 'none';
                
                // Scroll back to button
                viewMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        #more-categories {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        #more-categories.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

});

// Add keyframe animations for smooth transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);
