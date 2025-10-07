/* ==========================================================================
   AI集客基礎講座 - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // FAQ functionality
    initializeFAQ();
    
    // Form functionality (disabled - using direct links now)
    // initializeForm();
    
    // Smooth scroll for anchor links
    initializeSmoothScroll();
    
    // Animation on scroll
    initializeScrollAnimations();
    
    // Pricing calculations
    initializePricingCalculator();
    
    // Course application buttons
    initializeCourseButtons();
});

/* Navigation */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

/* FAQ Functionality */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

/* Form Functionality */
function initializeForm() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        // Course selection handler
        const courseSelect = document.getElementById('course');
        const earlyBirdCheckbox = document.getElementById('earlyBird');
        
        if (courseSelect) {
            courseSelect.addEventListener('change', updatePricing);
        }
        
        if (earlyBirdCheckbox) {
            earlyBirdCheckbox.addEventListener('change', updatePricing);
        }
        
        // Form validation
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Form submission
        form.addEventListener('submit', handleFormSubmission);
    }
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (!value) {
        showFieldError(field, 'この項目は必須です');
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '正しいメールアドレスを入力してください');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel') {
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, '正しい電話番号を入力してください');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function updatePricing() {
    const courseSelect = document.getElementById('course');
    const earlyBirdCheckbox = document.getElementById('earlyBird');
    
    if (!courseSelect || !earlyBirdCheckbox) return;
    
    const selectedCourse = courseSelect.value;
    const isEarlyBird = earlyBirdCheckbox.checked;
    
    // Price calculation logic can be added here
    console.log('Course:', selectedCourse, 'Early bird:', isEarlyBird);
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate all required fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('入力内容に誤りがあります。赤い項目をご確認ください。', 'error');
        return;
    }
    
    // Show success message
    showNotification('お申し込みありがとうございます！確認メールをお送りいたします。', 'success');
    
    // Here you would typically send the form data to your server
    console.log('Form data:', Object.fromEntries(formData));
    
    // Reset form
    form.reset();
}

/* Smooth Scroll */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Scroll Animations */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll(
        '.problem-item, .feature-card, .week-card, .price-card, .result-card, .faq-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* Pricing Calculator */
function initializePricingCalculator() {
    // Add hover effects to pricing cards
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('premium')) {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

/* Notification System */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '400px'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#007bff';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-triangle';
        case 'warning':
            return 'fa-exclamation-circle';
        default:
            return 'fa-info-circle';
    }
}

/* Course Application Buttons */
function initializeCourseButtons() {
    const basicBtn = document.getElementById('btn-basic-course');
    const supportBtn = document.getElementById('btn-support-course');
    const premiumBtn = document.getElementById('btn-premium-course');
    
    if (basicBtn) {
        basicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleCourseApplication('basic', '基本コース', '¥66,000', '月額¥22,000');
        });
    }
    
    if (supportBtn) {
        supportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleCourseApplication('support', '伴走コース', '¥99,000', '月額¥33,000');
        });
    }
    
    if (premiumBtn) {
        premiumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleCourseApplication('premium', '売上アップコース', '¥132,000', '月額¥44,000');
        });
    }
}

function handleCourseApplication(courseType, courseName, price, installment) {
    let applicationUrl = '';
    
    switch(courseType) {
        case 'basic':
            applicationUrl = 'https://mosh.jp/services/308181';
            break;
        case 'support':
            applicationUrl = 'https://mosh.jp/services/308186';
            break;
        case 'premium':
            applicationUrl = 'https://mosh.jp/services/308187';
            break;
    }
    
    if (applicationUrl) {
        // 新しいタブで申し込みページを開く
        window.open(applicationUrl, '_blank');
        
        // 成功通知を表示
        showNotification(`${courseName}の申し込みページを開きました`, 'success');
    } else {
        showNotification('申し込みURLが設定されていません', 'error');
    }
}

/* Utility Functions */
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* Performance optimizations */
const debouncedScroll = debounce(function() {
    // Handle scroll events that don't need to run frequently
}, 100);

const throttledResize = throttle(function() {
    // Handle resize events
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

/* Additional CSS for JavaScript interactions */
const additionalCSS = `
    .nav.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 12px 12px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .header.scroll-down {
        transform: translateY(-100%);
    }
    
    .header.scroll-up {
        transform: translateY(0);
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .problem-item,
    .feature-card,
    .week-card,
    .price-card,
    .result-card,
    .faq-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;

// Add CSS to head
const styleElement = document.createElement('style');
styleElement.textContent = additionalCSS;
document.head.appendChild(styleElement);
