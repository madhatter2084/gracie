/**
 * Utility Helper Functions
 * Common functions used throughout the application
 */

/**
 * Debounce function to limit function calls
 */
export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit function calls
 */
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Smooth scroll to element with offset
 */
export function scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Get current viewport width
 */
export function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Get current viewport height
 */
export function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= (0 - offset) &&
        rect.left >= 0 &&
        rect.bottom <= ((getViewportHeight()) + offset) &&
        rect.right <= getViewportWidth()
    );
}

/**
 * Format time from seconds to MM:SS
 */
export function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Create element with classes and attributes
 */
export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.classes) {
        if (Array.isArray(options.classes)) {
            element.classList.add(...options.classes);
        } else {
            element.className = options.classes;
        }
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    
    return element;
}

/**
 * Add event listener with cleanup tracking
 */
export function addEventListenerWithCleanup(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    
    return () => {
        element.removeEventListener(event, handler, options);
    };
}

/**
 * Load image with promise
 */
export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            return true;
        } catch (err) {
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Validate email address
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (basic)
 */
export function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Get form data as object
 */
export function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    return data;
}

/**
 * Animate element with CSS classes
 */
export function animateElement(element, animationClass, duration = 1000) {
    return new Promise((resolve) => {
        element.classList.add(animationClass);
        
        const handleAnimation = () => {
            element.classList.remove(animationClass);
            element.removeEventListener('animationend', handleAnimation);
            resolve();
        };
        
        element.addEventListener('animationend', handleAnimation);
        
        // Fallback timeout
        setTimeout(() => {
            element.classList.remove(animationClass);
            element.removeEventListener('animationend', handleAnimation);
            resolve();
        }, duration);
    });
}

/**
 * Intersection Observer helper
 */
export function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

/**
 * Detect mobile device
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detect touch device
 */
export function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

/**
 * Get CSS custom property value
 */
export function getCSSProperty(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property value
 */
export function setCSSProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
}

/**
 * Wait for specified time
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 */
export async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            await wait(delay * Math.pow(2, attempt - 1));
        }
    }
}

/**
 * Parse URL parameters
 */
export function parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (let [key, value] of params.entries()) {
        result[key] = value;
    }
    
    return result;
}

/**
 * Smooth scroll to top
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Format date for display
 */
export function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
}