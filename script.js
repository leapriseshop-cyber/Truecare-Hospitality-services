document.addEventListener('DOMContentLoaded', function() {
    // Initialize website functionality
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initForms();
    initGalleryModal();
    initDateValidation();
    initWhatsAppIntegration();
});

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Form handling
function initForms() {
    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('booking-success').style.display = 'block';
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('contact-success').style.display = 'block';
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

// Reset booking form
function resetBookingForm() {
    const form = document.getElementById('booking-form');
    const successMessage = document.getElementById('booking-success');
    
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
}

// Reset contact form
function resetContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
}

// Gallery modal functionality
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    
    if (modal) {
        // Close modal when clicking on close button or outside modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('close')) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
}

// Open gallery modal
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    if (modal && modalImage && modalTitle && modalDescription) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close gallery modal
function closeModal() {
    const modal = document.getElementById('gallery-modal');
    
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Date validation for booking form
function initDateValidation() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        checkoutInput.min = today;
        
        // Update checkout minimum date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.min = checkinDate.toISOString().split('T')[0];
            
            // Clear checkout if it's before new minimum
            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
                checkoutInput.value = '';
            }
        });
    }
}

// WhatsApp integration
function initWhatsAppIntegration() {
    // You can customize the WhatsApp number and message here
    window.whatsappNumber = '918700401489'; // Replace with actual number
    window.whatsappMessage = 'Hello! I\'m interested in TrueCare Hospitality services. Could you please provide more information?';
}

// Open WhatsApp chat
function openWhatsApp() {
    const number = window.whatsappNumber || '918700401489';
    const message = encodeURIComponent(window.whatsappMessage || 'Hello! I need assistance with TrueCare Hospitality services.');
    const whatsappUrl = `https://wa.me/${number}?text=${message}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Add scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.facility-card, .gallery-item, .contact-method, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// Form validation helper functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9]?[\d]{10,13}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        // Remove previous error styling
        input.classList.remove('error');
        
        // Check if field is empty
        if (!value) {
            input.classList.add('error');
            isValid = false;
            return;
        }
        
        // Specific validations
        if (input.type === 'email' && !validateEmail(value)) {
            input.classList.add('error');
            isValid = false;
        }
        
        if (input.type === 'tel' && !validatePhone(value)) {
            input.classList.add('error');
            isValid = false;
        }
        
        // Date validation for booking form
        if (input.type === 'date') {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (inputDate < today) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    // Check checkout date is after checkin date
    const checkin = form.querySelector('#checkin');
    const checkout = form.querySelector('#checkout');
    
    if (checkin && checkout && checkin.value && checkout.value) {
        if (new Date(checkout.value) <= new Date(checkin.value)) {
            checkout.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .facility-card,
    .gallery-item,
    .contact-method,
    .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: var(--transition);
    }
`;

document.head.appendChild(style);