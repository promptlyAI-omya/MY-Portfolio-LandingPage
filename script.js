/* ========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   All interactive functionality for the site
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initAnimations();
    setCurrentYear();
});

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll listener with throttle for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   MOBILE MENU TOGGLE
======================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu on button click
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   BACK TO TOP BUTTON
======================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Add scroll listener
    window.addEventListener('scroll', toggleBackToTop);
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   CONTACT FORM HANDLING
======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual backend integration)
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(function() {
            // Success! In production, replace with actual form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (for demo purposes)
            console.log('Form submitted:', formData);
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification helper
function showNotification(message, type) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<span>' + message + '</span><button class="notification-close">&times;</button>';
    
    // Add styles dynamically
    notification.style.cssText = '\
        position: fixed;\
        bottom: 30px;\
        left: 50%;\
        transform: translateX(-50%);\
        padding: 1rem 2rem;\
        border-radius: 0.75rem;\
        font-size: 0.875rem;\
        font-weight: 500;\
        display: flex;\
        align-items: center;\
        gap: 1rem;\
        z-index: 10000;\
        animation: slideUp 0.3s ease;\
        background: ' + (type === 'success' ? '#10b981' : '#ef4444') + ';\
        color: white;\
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);\
    ';
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '@keyframes slideUp { from { transform: translateX(-50%) translateY(100px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/* ========================================
   SCROLL ANIMATIONS (Intersection Observer)
======================================== */
function initAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.project-card, .pricing-card, .why-card, .highlight-item, .contact-card, .about-image, .about-text'
    );
    
    if (!animatedElements.length) return;
    
    // Add initial styles for animation
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
                }
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
}

/* ========================================
   SET CURRENT YEAR IN FOOTER
======================================== */
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ========================================
   ACTIVE NAV LINK HIGHLIGHTING
======================================== */
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
})();

/* ========================================
   TYPING EFFECT FOR HERO (Optional)
======================================== */
(function() {
    // Add typing animation for code window if desired
    const codeBody = document.querySelector('.code-body code');
    if (!codeBody) return;
    
    // Store original content
    const originalContent = codeBody.innerHTML;
    
    // Optional: Add a subtle cursor blink effect
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    cursor.style.cssText = 'animation: blink 1s infinite; color: #6366f1;';
    
    // Add blink animation
    if (!document.getElementById('cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.textContent = '@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }';
        document.head.appendChild(style);
    }
    
    // Append cursor to code body
    codeBody.appendChild(cursor);
})();
