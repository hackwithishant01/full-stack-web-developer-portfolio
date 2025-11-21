// Main JavaScript file for portfolio website

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const nameText = document.getElementById('name-text');
const nameCursor = document.getElementById('name-cursor');
const jobTitleText = document.getElementById('job-title-text');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');

// Typing animation configuration for name
const nameToType = "Ishant Kumar";
let nameIndex = 0;
let isNameDeleting = false;

// Typing animation for job title
const jobTitles = [
    "Full Stack Developer",
    "Ethical Hacker", 
    "Problem Solver",
    "Tech Enthusiast"
];
let jobTitleIndex = 0;
let jobTitleCurrent = "";
let isJobTitleDeleting = false;

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNameAnimation();
    initializeJobTitleAnimation();
    initializeScrollAnimations();
    initializeNavbar();
    initializeContactForm();
    initializeSmoothScroll();
});

// Name Typing Animation
function initializeNameAnimation() {
    function typeName() {
        const currentText = nameToType.substring(0, nameIndex);
        nameText.textContent = currentText;

        if (!isNameDeleting && nameIndex < nameToType.length) {
            nameIndex++;
            setTimeout(typeName, 100);
        } else if (isNameDeleting && nameIndex > 0) {
            nameIndex--;
            setTimeout(typeName, 50);
        } else if (!isNameDeleting && nameIndex === nameToType.length) {
            setTimeout(() => {
                isNameDeleting = true;
                typeName();
            }, 2000);
        } else if (isNameDeleting && nameIndex === 0) {
            isNameDeleting = false;
            setTimeout(typeName, 500);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeName, 1000);
}

// Job Title Typing Animation
function initializeJobTitleAnimation() {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function typeJobTitle() {
        const currentPhrase = jobTitles[jobTitleIndex];
        
        if (isJobTitleDeleting) {
            jobTitleCurrent = currentPhrase.substring(0, jobTitleCurrent.length - 1);
        } else {
            jobTitleCurrent = currentPhrase.substring(0, jobTitleCurrent.length + 1);
        }
        
        jobTitleText.textContent = jobTitleCurrent;
        
        let nextDelay = isJobTitleDeleting ? deleteSpeed : typeSpeed;
        
        if (!isJobTitleDeleting && jobTitleCurrent === currentPhrase) {
            nextDelay = pauseTime;
            isJobTitleDeleting = true;
        } else if (isJobTitleDeleting && jobTitleCurrent === '') {
            isJobTitleDeleting = false;
            jobTitleIndex = (jobTitleIndex + 1) % jobTitles.length;
        }
        
        setTimeout(typeJobTitle, nextDelay);
    }
    
    // Start job title animation after name animation completes
    setTimeout(typeJobTitle, 1500);
}

// Navbar functionality
function initializeNavbar() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for navigation links
function initializeSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                if (entry.target.classList.contains('project-card')) {
                    const index = entry.target.getAttribute('data-index');
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                } else {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('[data-aos], .skill-category, .project-card, .contact-form');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form functionality
function initializeContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrorMessages();
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (messageInput.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        formStatus.style.display = 'none';
    }

    function submitForm() {
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        
        // Actual form submission
        const formData = new FormData(contactForm);
        
        // Replace with your actual form submission endpoint
        fetch('https://your-form-endpoint.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => {
            if (data.success) {
                showFormStatus('success', 'Thank you! Your message has been sent successfully.');
                contactForm.reset();
            } else {
                showFormStatus('error', 'Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showFormStatus('error', 'An error occurred. Please try again.');
        })
        .finally(() => {
            // Hide loading state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        });
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth hover effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Preloader functionality (if needed)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
if (navMenu) {
    trapFocus(navMenu);
}