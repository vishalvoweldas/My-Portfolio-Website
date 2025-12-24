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

// Privacy Modal Selection
const privacyLink = document.querySelector('#privacyLink');
const privacyModal = document.querySelector('#privacyModal');
const privacyModalClose = document.querySelector('#privacyModalClose');
const privacyModalOverlay = document.querySelector('#privacyModalOverlay');

// Project Modal Selection
const projectModal = document.querySelector('#projectModal');
const projectModalClose = document.querySelector('#projectModalClose');
const projectModalOverlay = document.querySelector('#projectModalOverlay');

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
    if (e.key === 'Escape') {
        if (resumeModal && resumeModal.classList.contains('active')) closeResumeModal();
        if (privacyModal && privacyModal.classList.contains('active')) closePrivacyModal();
        if (projectModal && projectModal.classList.contains('active')) closeProjectModal();
    }
});

// Privacy modal handlers
if (privacyLink) {
    privacyLink.addEventListener('click', () => {
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (privacyModalClose) {
    privacyModalClose.addEventListener('click', closePrivacyModal);
}

if (privacyModalOverlay) {
    privacyModalOverlay.addEventListener('click', closePrivacyModal);
}

function closePrivacyModal() {
    if (privacyModal) {
        privacyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

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
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // If we're at the very bottom of the page, highlight the last link (Contact)
    if (scrollY + clientHeight >= scrollHeight - 20) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[href="#contact"]')?.classList.add('active');
        return;
    }

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120; // Increased offset for better detection
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
        
        // 1. Honeypot check
        const honeypot = contactForm.querySelector('#honeypot').value;
        if (honeypot) {
            console.warn('Bot detected via honeypot');
            return;
        }

        // 2. Rate limiting (1 minute cooldown)
        const lastSubmission = localStorage.getItem('lastFormSubmission');
        const now = Date.now();
        const cooldown = 60 * 1000; // 1 minute

        if (lastSubmission && (now - lastSubmission < cooldown)) {
            const remaining = Math.ceil((cooldown - (now - lastSubmission)) / 1000);
            showFormStatus('error', `Please wait ${remaining} seconds before sending another message.`);
            return;
        }
        
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
                // Update submission time
                localStorage.setItem('lastFormSubmission', Date.now());
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
// 15. INTERACTIVE TERMINAL LOGIC
// ============================================
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            handleCommand(command);
            terminalInput.value = '';
        }
    });

    // Keep focus on input when clicking terminal body
    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
}

function handleCommand(cmd) {
    // Add command to output
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="prompt">guest@vishal:~$</span> <span>${cmd}</span>`;
    terminalOutput.appendChild(line);

    let response = '';
    
    switch(cmd) {
        case 'help':
            response = `Available commands:
  <span class="highlight">ls</span>          - List portfolio sections
  <span class="highlight">goto [sec]</span>  - Scroll to a section (e.g., goto projects)
  <span class="highlight">whoami</span>      - About Vishal
  <span class="highlight">clear</span>       - Clear the terminal
  <span class="highlight">contact</span>     - Show contact info
  <span class="highlight">skills</span>      - List key technical skills`;
            break;
        case 'ls':
            response = 'Sections: <span class="highlight">home, services, skills, projects, journey, achievements, quiz, terminal, contact</span>';
            break;
        case 'whoami':
            response = 'Vishal Voweldas | AI & Data Science Student | Specialized in Machine Learning, NLP, and Java Backend.';
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            return;
        case 'contact':
            response = 'Email: <span class="highlight">vishalvoweldas67@gmail.com</span><br>LinkedIn: <span class="highlight">linkedin.com/in/vishalvoweldas</span>';
            break;
        case 'skills':
            response = 'Top Skills: <span class="highlight">Python, ML, NLP, Java, Spring Boot, SQL</span>';
            break;
        default:
            if (cmd.startsWith('goto ')) {
                const sectionId = cmd.split(' ')[1];
                const section = document.getElementById(sectionId);
                if (section) {
                    response = `<span class="command-success">Scrolling to ${sectionId}...</span>`;
                    setTimeout(() => {
                        window.scrollTo({
                            top: section.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 500);
                } else {
                    response = `<span class="command-error">Section '${sectionId}' not found. Type 'ls' to see sections.</span>`;
                }
            } else if (cmd !== '') {
                response = `<span class="command-error">Command not found: ${cmd}. Type 'help' for assistance.</span>`;
            }
    }

    if (response) {
        const respLine = document.createElement('div');
        respLine.className = 'command-response';
        respLine.innerHTML = response;
        terminalOutput.appendChild(respLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// ============================================
// 16. SKILL ASSESSMENT QUIZ LOGIC
// ============================================
const quizOptions = document.querySelectorAll('.quiz-option');
let quizSelections = {};

const quizProgressBar = document.getElementById('quizProgressBar');

if (quizOptions.length > 0) {
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const step = option.closest('.quiz-step');
            const stepNum = parseInt(step.dataset.step);
            const value = option.dataset.value;

            quizSelections[stepNum] = value;

            if (stepNum < 2) {
                // Move to next step
                step.classList.remove('active');
                document.querySelector(`.quiz-step[data-step="${stepNum + 1}"]`).classList.add('active');
                
                // Update progress bar
                if (quizProgressBar) {
                    quizProgressBar.style.width = '66%';
                }
            } else {
                // Show result
                showQuizResult();
                
                // Update progress bar to 100%
                if (quizProgressBar) {
                    quizProgressBar.style.width = '100%';
                }
            }
        });
    });
}

function showQuizResult() {
    const steps = document.querySelectorAll('.quiz-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const resultStep = document.getElementById('quizResult');
    const resultContent = document.getElementById('resultContent');
    resultStep.classList.add('active');

    let recommendedProject = "";
    let projectDescription = "";
    let projectLink = "";

    // Recommendation Logic
    if (quizSelections[1] === 'ai') {
        recommendedProject = "AI Personal Email Assistant";
        projectDescription = "Perfect for seeing how I apply LLMs and transformer models to real-world productivity.";
        projectLink = "#projects";
    } else if (quizSelections[1] === 'backend') {
        recommendedProject = "Shopping Mall Management System";
        projectDescription = "A great example of my skills in Java, Spring Boot, and database architecture.";
        projectLink = "#projects";
    } else {
        recommendedProject = "AI-Powered Crop Forecasting System";
        projectDescription = "Shows my ability to combine deep learning with practical web deployment for impact.";
        projectLink = "#projects";
    }

    resultContent.innerHTML = `
        <div class="result-card">
            <div class="result-title">${recommendedProject}</div>
            <p style="color: var(--color-text-grey); font-size: 0.9rem;">${projectDescription}</p>
            <a href="${projectLink}" class="btn btn-secondary" style="margin-top: 1rem; width: 100%;">View Project</a>
        </div>
    `;
}

function resetQuiz() {
    quizSelections = {};
    const steps = document.querySelectorAll('.quiz-step');
    steps.forEach(s => s.classList.remove('active'));
    document.querySelector('.quiz-step[data-step="1"]').classList.add('active');
    if (quizProgressBar) {
        quizProgressBar.style.width = '33%';
    }
}

// ============================================
// 17. AI ASSISTANT CHATBOT LOGIC
// ============================================
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const chatMessages = document.getElementById('chatMessages');

if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'user-msg' : 'bot-msg';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botResponse(input) {
    const lowerInput = input.toLowerCase();
    let response = "I'm not sure about that, but you can email Vishal at vishalvoweldas67@gmail.com!";

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! I can tell you about Vishal's projects, skills, or experience. What are you looking for?";
    } else if (lowerInput.includes('project')) {
        response = "Vishal has worked on AI Email Assistants, Crop Forecasting, and more! Check the Projects section for details.";
    } else if (lowerInput.includes('skill')) {
        response = "His top skills include Python, ML, Java, and Spring Boot. He loves building AI-driven solutions!";
    } else if (lowerInput.includes('hire') || lowerInput.includes('contact')) {
        response = "You can reach Vishal via the contact form on this page or through LinkedIn.";
    }

    setTimeout(() => addMessage(response), 500);
}

if (sendChat) {
    sendChat.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';
            botResponse(text);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChat.click();
        }
    });
}

// ============================================
// 18. INITIALIZE ON DOM LOAD
// ============================================
// ============================================
// 19. PROJECT MODAL LOGIC (DYNAMIC)
// ============================================
function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalTitle = document.getElementById('modalTitle');
    const modalProblem = document.getElementById('modalProblem');
    const modalSolution = document.getElementById('modalSolution');
    const modalImpact = document.getElementById('modalImpact');
    const modalLessons = document.getElementById('modalLessons');
    const modalLink = document.getElementById('modalLink');
    const modalTagsContainer = document.getElementById('modalTags');

    if (!projectModal || !projectCards.length) return;

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open if they clicked a direct link inside (if any)
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            const data = card.dataset;
            
            // Populate Modal Text
            if (modalTitle) modalTitle.textContent = data.title || '';
            if (modalProblem) modalProblem.textContent = data.problem || '';
            if (modalSolution) modalSolution.textContent = data.solution || '';
            if (modalImpact) modalImpact.textContent = data.impact || '';
            if (modalLessons) modalLessons.textContent = data.lessons || '';
            
            // Update Link - Ensure it's a valid string
            if (modalLink) {
                const linkUrl = data.link || '#';
                modalLink.setAttribute('href', linkUrl);
                
                // Ensure it's visible if we have a link
                if (linkUrl && linkUrl !== '#') {
                    modalLink.style.display = 'inline-flex';
                } else {
                    modalLink.style.display = 'none';
                }
                
                console.log('Project Modal Link updated to:', linkUrl);
            }

            // Clone Tags from Card
            if (modalTagsContainer) {
                const cardTags = card.querySelector('.project-tags');
                if (cardTags) {
                    modalTagsContainer.innerHTML = '';
                    modalTagsContainer.appendChild(cardTags.cloneNode(true));
                }
            }

            // Open Modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModalOverlay) {
        projectModalOverlay.addEventListener('click', closeProjectModal);
    }
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully! 🚀');
    
    // Initialize project modal
    initProjectModal();
    
    // Initial animations
    revealOnScroll();
    updateActiveNavLink();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});
