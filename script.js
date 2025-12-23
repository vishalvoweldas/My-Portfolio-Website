/**
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * Interactive functionality and animations
 */

// ============================================
// 1. RESUME VIEWER FUNCTIONALITY
// ============================================
const viewResumeBtn = document.querySelector('#viewResumeBtn');
const resumeModal = document.querySelector('#resumeModal');
const resumeModalClose = document.querySelector('#resumeModalClose');
const resumeModalOverlay = document.querySelector('#resumeModalOverlay');

// Device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Resume viewer handler
if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
        // Show modal for all devices (desktop and mobile)
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal handlers
if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', closeResumeModal);
}

function closeResumeModal() {
    if (resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

// ============================================
// 2. THEME TOGGLE (DARK/LIGHT MODE)
// ============================================
const themeToggle = document.querySelector('#themeToggle');
const body = document.body;

// Always start with light mode (no localStorage persistence)
// Theme will reset to light on every page refresh

// Theme toggle handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Add rotation animation
        themeToggle.classList.add('rotating');
        
        // Toggle dark mode
        body.classList.toggle('dark-mode');
        
        // Remove rotation class after animation
        setTimeout(() => {
            themeToggle.classList.remove('rotating');
        }, 300);
    });
}

// ============================================
// 3. MOBILE NAVIGATION TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ============================================
// 2. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 3. ACTIVE NAVIGATION LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// 4. HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ============================================
// 5. SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Initial check on page load
window.addEventListener('load', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ============================================
// 6. TYPING EFFECT FOR HERO TITLE (Optional)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }

// ============================================
// 7. PARALLAX EFFECT FOR HERO IMAGE
// ============================================
const heroImageWrapper = document.querySelector('.hero-image-wrapper');

if (heroImageWrapper) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroImageWrapper.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ============================================
// 8. DYNAMIC YEAR IN FOOTER
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ============================================
// 9. LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 10. CURSOR TRAIL EFFECT (Optional Premium Feature)
// ============================================
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);

        trail.push(dot);

        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }

        setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 300);
        }, 100);
    });
}

// Uncomment to enable cursor trail
// createCursorTrail();

// ============================================
// 11. CONTACT FORM VALIDATION & EMAILJS
// ============================================
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        // Basic validation
        if (!name || !email || !message) {
            showFormStatus('error', 'Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('error', 'Please enter a valid email address');
            return;
        }
        
        // Disable submit button and show loading
        submitBtn.disabled = true;
        showFormStatus('loading', 'Sending message...');
        
        // EmailJS Configuration
        // Replace these with your actual EmailJS credentials:
        // 1. Go to https://www.emailjs.com/
        // 2. Sign up and create an email service
        // 3. Create an email template
        // 4. Get your Service ID, Template ID, and Public Key
        // 5. Replace the values below
        
        const serviceID = 'service_vtsxnfb';  // Replace with your EmailJS Service ID
        const templateID = 'template_fvi4n2d'; // Replace with your EmailJS Template ID
        
        // Template parameters (these should match your EmailJS template variables)
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Vishal Voweldas'
        };
        
        // Send email using EmailJS
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                showFormStatus('success', '✅ Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showFormStatus('error', '❌ Failed to send message. Please try again or email me directly at vishalvoweldas67@gmail.com');
                submitBtn.disabled = false;
            });
    });
}

function showFormStatus(type, message) {
    if (!formStatus) return;
    
    formStatus.className = 'form-status ' + type;
    formStatus.textContent = message;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 5000);
    }
}


// ============================================
// 12. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(updateActiveNavLink, 20));
window.addEventListener('scroll', debounce(revealOnScroll, 20));

// ============================================
// 13. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link sr-only';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for cards
const cards = document.querySelectorAll('.card, .project-card');
cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.querySelector('a');
            if (link) link.click();
        }
    });
});

// ============================================
// 14. CONSOLE MESSAGE (Easter Egg)
// ============================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #EDB01A;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/vishalvoweldas', 'font-size: 14px; color: #1D291F;');
console.log('%c"Building tomorrow\'s solutions with today\'s technology — one commit at a time."', 'font-size: 12px; font-style: italic; color: #666;');

// ============================================
// 15. INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully! 🚀');
    
    // Initial animations
    revealOnScroll();
    updateActiveNavLink();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});
