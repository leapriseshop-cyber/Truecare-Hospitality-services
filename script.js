// TRUECARE HOSPITALITY & FACILITIES - FINAL OPTIMIZED JAVASCRIPT
// Fixed ALL Navigation, Dark Mode, Form, and UX Issues

'use strict';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('TrueCare website initialized');

    // Initialize all components
    initNavigation();
    initServiceTabs();
    initContactForm();
    initSmoothScrolling();
    initAnimations();
    initAccessibility();
    initDarkMode();
    initPerformanceTracking();
});

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = navMenu.classList.contains('active');

        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    if (header) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = scrollY;
        });
    }

    // ESC key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        }
    });
}

// ===== SERVICE TABS SYSTEM =====
function initServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');
    const contents = document.querySelectorAll('.service-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Track tab interaction
            trackEvent('service_tab_click', {
                tab: target,
                timestamp: new Date().toISOString()
            });
        });

        // Keyboard navigation for tabs
        tab.addEventListener('keydown', function(e) {
            const tabList = Array.from(tabs);
            const currentIndex = tabList.indexOf(this);
            let targetTab = null;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetTab = tabList[currentIndex + 1] || tabList[0];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetTab = tabList[currentIndex - 1] || tabList[tabList.length - 1];
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetTab = tabList[0];
            } else if (e.key === 'End') {
                e.preventDefault();
                targetTab = tabList[tabList.length - 1];
            }

            if (targetTab) {
                targetTab.focus();
                targetTab.click();
            }
        });
    });
}

// ===== CONTACT FORM SYSTEM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (!form) return;

    // Form auto-save functionality
    initFormAutoSave();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.form-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Send email
        sendContactEmail(data).then(() => {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Clear saved form data
            clearFormAutoSave();

            // Track conversion
            trackEvent('form_submission', {
                service: data.service,
                source: 'contact_form',
                timestamp: new Date().toISOString()
            });

            // Announce to screen readers
            announceToScreenReader('Form submitted successfully. We will contact you within 24 hours.');

        }).catch(error => {
            console.error('Error sending email:', error);
            showNotification('❌ Failed to send message. Please try again or contact us directly.', 'error');
        }).finally(() => {
            // Reset loading state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        });
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Clear any existing error state
            this.classList.remove('error');
            const errorElement = document.getElementById(this.name + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

// Form validation functions
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (minimum 2 characters)');
        highlightError('name');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
        highlightError('email');
    }

    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number (minimum 10 digits)');
        highlightError('phone');
    }

    if (!data.service) {
        errors.push('Please select a service');
        highlightError('service');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a detailed message (minimum 10 characters)');
        highlightError('message');
    }

    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        // Focus on first error field
        const firstErrorField = document.querySelector('.form-control.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return false;
    }

    return true;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.name) {
        case 'name':
            if (!value || value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (!value || value.length < 10) {
                isValid = false;
                errorMessage = 'Phone number must be at least 10 digits';
            }
            break;
        case 'service':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a service';
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }

    if (isValid) {
        field.classList.remove('error');
    } else {
        field.classList.add('error');
    }

    return isValid;
}

function highlightError(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== EMAIL INTEGRATION =====
function sendContactEmail(data) {
    return new Promise((resolve, reject) => {
        const subject = encodeURIComponent(`New ${data.service} Inquiry - TrueCare Website`);
        const body = encodeURIComponent(`New inquiry from TrueCare Hospitality website:

Contact Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Required: ${data.service}

Message:
${data.message}

---
This inquiry was submitted through the TrueCare website contact form.
Please respond within 24 hours to maintain our service standards.

Best regards,
TrueCare Website System`);

        const primaryEmail = 'truecareservicesnbusinesses@gmail.com';
        const ccEmail = 'wetruecare@gmail.com';
        const mailtoLink = `mailto:${primaryEmail}?cc=${ccEmail}&subject=${subject}&body=${body}`;

        try {
            window.open(mailtoLink, '_blank');
            showNotification('✅ Email client opened! Please send the pre-filled message to complete your inquiry.', 'success');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// ===== FORM AUTO-SAVE =====
function initFormAutoSave() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`truecare_form_${input.name}`);
        if (savedValue && !input.value) {
            input.value = savedValue;
        }

        // Save on input
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                localStorage.setItem(`truecare_form_${this.name}`, this.value);
            } else {
                localStorage.removeItem(`truecare_form_${this.name}`);
            }
        });
    });
}

function clearFormAutoSave() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        localStorage.removeItem(`truecare_form_${input.name}`);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without causing scroll
                if (history.pushState) {
                    history.pushState(null, null, '#' + targetId);
                }

                // Focus management for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .hotel-card, .cert-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Add skip link if not exists
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Create screen reader announcer
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Global announce function
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };

    // Enhanced focus management
    document.addEventListener('keydown', function(e) {
        // Tab key management for modal-like elements
        if (e.key === 'Tab') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                const focusableElements = navMenu.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }
    });
}

// ===== DARK MODE SYSTEM =====
function initDarkMode() {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('truecare-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply theme
    document.documentElement.setAttribute('data-color-scheme', theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('truecare-theme')) {
            document.documentElement.setAttribute('data-color-scheme', e.matches ? 'dark' : 'light');
        }
    });

    // Create dark mode toggle (optional)
    createDarkModeToggle();
}

function createDarkModeToggle() {
    // This is optional - you can add a toggle button if needed
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        background: var(--bg-secondary);
        cursor: pointer;
        display: none; /* Hidden by default */
    `;

    toggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(toggle);
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('truecare-theme', newTheme);

    trackEvent('dark_mode_toggle', {
        theme: newTheme,
        timestamp: new Date().toISOString()
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 16px 20px;
        border-radius: 8px;
        font-weight: 600;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.background = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#3b82f6';
        notification.style.color = 'white';
    }

    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== PERFORMANCE TRACKING =====
function initPerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                trackEvent('page_performance', {
                    load_time: Math.round(loadTime),
                    connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
                    timestamp: new Date().toISOString()
                });
            }
        }
    });

    // Track user engagement
    let startTime = Date.now();
    let isActive = true;

    // Track time spent on page
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('page_engagement', {
            time_spent: timeSpent,
            was_active: isActive,
            timestamp: new Date().toISOString()
        });
    });

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, function() {
            isActive = true;
        }, { passive: true });
    });

    // Page visibility tracking
    if ('visibilityState' in document) {
        let visibilityStart = Date.now();
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                const visibleTime = Date.now() - visibilityStart;
                trackEvent('page_visibility', {
                    visible_time: Math.round(visibleTime / 1000),
                    action: 'hidden',
                    timestamp: new Date().toISOString()
                });
            } else {
                visibilityStart = Date.now();
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }

    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Event tracked:', eventName, eventData);
    }
}

// ===== WHATSAPP INTEGRATION =====
function openWhatsApp(message = "Hi! I'm interested in TrueCare services. Please provide more information.") {
    const phoneNumber = "918700401489";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    trackEvent('whatsapp_contact', {
        source: 'whatsapp_helper',
        timestamp: new Date().toISOString()
    });
}

// ===== PHONE CALL HANDLER =====
function makePhoneCall(phoneNumber = "+91-8700401489") {
    window.location.href = `tel:${phoneNumber}`;
    trackEvent('phone_contact', {
        number: phoneNumber,
        timestamp: new Date().toISOString()
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        timestamp: new Date().toISOString()
    });
});

// ===== CONNECTION STATUS =====
if ('navigator' in window && 'onLine' in navigator) {
    function updateConnectionStatus() {
        if (navigator.onLine) {
            showNotification('✅ Connection restored', 'success');
        } else {
            showNotification('⚠️ No internet connection. Some features may be limited.', 'error');
        }
    }

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
}

// ===== SERVICE WORKER (PWA Support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== GLOBAL EXPORTS =====
window.TrueCare = {
    showNotification,
    trackEvent,
    openWhatsApp,
    makePhoneCall,
    toggleDarkMode
};

// ===== HOTEL BOOKING GLOBAL FUNCTION =====
window.bookHotelRoom = function(hotelName, location) {
    const subject = encodeURIComponent(`Room Booking Request - ${hotelName}`);
    const body = encodeURIComponent(`Dear TrueCare Team,

I would like to book a room at ${hotelName}, ${location}.

Booking Details:
Hotel: ${hotelName}
Location: ${location}
Check-in Date: [Please fill]
Check-out Date: [Please fill]
Number of Guests: [Please fill]
Room Type: [Please fill]

Guest Information:
Name: [Please fill]
Phone: [Please fill]
Email: [Please fill]
Special Requirements: [Please fill]

Please confirm availability and provide booking details including:
- Room rates and packages
- Amenities included
- Cancellation policy
- Payment methods accepted

I look forward to your prompt response.

Best regards,
[Your Name]

---
Booked through TrueCare Hospitality website`);

    const primaryEmail = 'truecareservicesnbusinesses@gmail.com';
    const ccEmail = 'wetruecare@gmail.com';
    const mailtoLink = `mailto:${primaryEmail}?cc=${ccEmail}&subject=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');

    if (window.TrueCare && window.TrueCare.showNotification) {
        window.TrueCare.showNotification(`✅ Booking request for ${hotelName} opened in your email client!`, 'success');
    }

    trackEvent('hotel_booking_request', {
        hotel: hotelName,
        location: location,
        timestamp: new Date().toISOString()
    });
};