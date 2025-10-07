/**
 * Toast Notification Component
 * Handles showing success, error, and info notifications
 */

import { generateId, sanitizeHTML } from '../utils/helpers.js';

export class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = new Map();
        this.defaultDuration = 5000;
        this.maxToasts = 5;
        
        this.init();
    }

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            console.warn('Toast container not found');
            return;
        }

        // Set up container attributes
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'false');
    }

    show(message, type = 'info', title = null, details = null, duration = null) {
        if (!this.container) {
            console.error('Toast container not available');
            return null;
        }

        const toastId = generateId('toast');
        const toastDuration = duration || this.defaultDuration;

        // Clean up old toasts if we have too many
        this.cleanupOldToasts();

        // Create toast element
        const toast = this.createToastElement(toastId, message, type, title, details);
        
        // Add to container
        this.container.appendChild(toast);
        
        // Store toast reference
        this.toasts.set(toastId, {
            element: toast,
            type,
            timestamp: Date.now(),
            duration: toastDuration
        });

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after duration
        if (toastDuration > 0) {
            setTimeout(() => {
                this.hide(toastId);
            }, toastDuration);
        }

        return toastId;
    }

    createToastElement(id, message, type, title, details) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = id;
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toast.setAttribute('aria-atomic', 'true');

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'toast-close';
        closeButton.innerHTML = '<i class="bi bi-x"></i>';
        closeButton.setAttribute('aria-label', 'Close notification');
        closeButton.addEventListener('click', () => this.hide(id));

        // Create icon
        const icon = this.createToastIcon(type);

        // Create content
        const content = document.createElement('div');
        content.className = 'toast-content';

        if (title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'toast-title';
            titleElement.textContent = title;
            content.appendChild(titleElement);
        }

        const messageElement = document.createElement('div');
        messageElement.className = 'toast-message';
        messageElement.textContent = message;
        content.appendChild(messageElement);

        // Add details if provided (for booking confirmations)
        if (details && type === 'success') {
            const detailsElement = this.createDetailsElement(details);
            content.appendChild(detailsElement);
        }

        // Assemble toast
        toast.appendChild(icon);
        toast.appendChild(content);
        toast.appendChild(closeButton);

        return toast;
    }

    createToastIcon(type) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'toast-icon';

        const icon = document.createElement('i');
        
        switch (type) {
            case 'success':
                icon.className = 'bi bi-check-circle-fill';
                break;
            case 'error':
                icon.className = 'bi bi-exclamation-triangle-fill';
                break;
            case 'warning':
                icon.className = 'bi bi-exclamation-circle-fill';
                break;
            default:
                icon.className = 'bi bi-info-circle-fill';
        }

        iconWrapper.appendChild(icon);
        return iconWrapper;
    }

    createDetailsElement(details) {
        const detailsWrapper = document.createElement('div');
        detailsWrapper.className = 'toast-details';

        if (details.firstName && details.eventType) {
            const summary = document.createElement('div');
            summary.className = 'toast-summary';
            summary.innerHTML = `
                <strong>Event:</strong> ${sanitizeHTML(details.eventType)}<br>
                <strong>Date:</strong> ${details.eventDate ? sanitizeHTML(details.eventDate) : 'TBD'}<br>
                <strong>Contact:</strong> ${sanitizeHTML(details.firstName)} ${details.lastName ? sanitizeHTML(details.lastName) : ''}
            `;
            detailsWrapper.appendChild(summary);
        }

        return detailsWrapper;
    }

    hide(toastId) {
        const toastData = this.toasts.get(toastId);
        if (!toastData) return;

        const toast = toastData.element;
        
        // Animate out
        toast.classList.remove('show');
        toast.classList.add('hide');

        // Remove after animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts.delete(toastId);
        }, 300);
    }

    hideAll() {
        this.toasts.forEach((_, toastId) => {
            this.hide(toastId);
        });
    }

    cleanupOldToasts() {
        if (this.toasts.size <= this.maxToasts) return;

        // Convert to array and sort by timestamp
        const toastArray = Array.from(this.toasts.entries());
        toastArray.sort((a, b) => a[1].timestamp - b[1].timestamp);

        // Remove oldest toasts
        const toastsToRemove = toastArray.slice(0, toastArray.length - this.maxToasts);
        toastsToRemove.forEach(([toastId]) => {
            this.hide(toastId);
        });
    }

    // Convenience methods
    success(message, title = null, details = null, duration = null) {
        return this.show(message, 'success', title, details, duration);
    }

    error(message, title = null, duration = null) {
        return this.show(message, 'error', title, null, duration);
    }

    warning(message, title = null, duration = null) {
        return this.show(message, 'warning', title, null, duration);
    }

    info(message, title = null, duration = null) {
        return this.show(message, 'info', title, null, duration);
    }

    // Show booking confirmation toast
    showBookingConfirmation(formData) {
        const message = `Thanks ${formData.firstName}! Your booking request has been submitted. We'll get back to you soon.`;
        return this.success(message, 'Booking Submitted', formData, 8000);
    }

    // Show form validation error
    showValidationError(fieldName) {
        const message = `Please check the ${fieldName} field and try again.`;
        return this.error(message, 'Validation Error', 4000);
    }

    // Get current toast count
    getToastCount() {
        return this.toasts.size;
    }

    // Get all active toasts
    getActiveToasts() {
        return Array.from(this.toasts.keys());
    }

    // Set default duration
    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }

    // Check if container is available
    isAvailable() {
        return !!this.container;
    }
}

// Add CSS for toast animations and styling
const style = document.createElement('style');
style.textContent = `
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        pointer-events: none;
    }

    .toast {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 16px 20px;
        margin-bottom: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: var(--card-foreground);
        pointer-events: auto;
        max-width: 100%;
        word-wrap: break-word;
    }

    .toast.show {
        transform: translateX(0);
    }

    .toast.hide {
        transform: translateX(400px);
        opacity: 0;
    }

    .toast.success {
        border-left: 4px solid #10b981;
    }

    .toast.error {
        border-left: 4px solid #ef4444;
    }

    .toast.warning {
        border-left: 4px solid #f59e0b;
    }

    .toast.info {
        border-left: 4px solid var(--accent);
    }

    .toast-icon {
        flex-shrink: 0;
        margin-top: 2px;
    }

    .toast-icon i {
        font-size: 1.2rem;
    }

    .toast.success .toast-icon i {
        color: #10b981;
    }

    .toast.error .toast-icon i {
        color: #ef4444;
    }

    .toast.warning .toast-icon i {
        color: #f59e0b;
    }

    .toast.info .toast-icon i {
        color: var(--accent);
    }

    .toast-content {
        flex: 1;
        min-width: 0;
    }

    .toast-title {
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 4px;
        color: var(--card-foreground);
    }

    .toast-message {
        font-size: 0.9rem;
        line-height: 1.4;
        color: var(--card-foreground);
    }

    .toast-details {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--border);
    }

    .toast-summary {
        font-size: 0.8rem;
        line-height: 1.4;
        color: var(--muted-foreground);
    }

    .toast-close {
        flex-shrink: 0;
        background: none;
        border: none;
        color: var(--muted-foreground);
        cursor: pointer;
        padding: 2px;
        border-radius: 4px;
        transition: all 0.2s ease;
        margin: -2px -4px 0 0;
    }

    .toast-close:hover {
        background-color: var(--muted);
        color: var(--card-foreground);
    }

    .toast-close i {
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        .toast-container {
            right: 15px;
            left: 15px;
            max-width: none;
        }

        .toast {
            margin-bottom: 8px;
            padding: 12px 16px;
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        .toast {
            border-width: 2px;
        }
        
        .toast.success {
            border-left-width: 6px;
        }
        
        .toast.error {
            border-left-width: 6px;
        }
        
        .toast.warning {
            border-left-width: 6px;
        }
        
        .toast.info {
            border-left-width: 6px;
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .toast {
            transition: none;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast.hide {
            display: none;
        }
    }
`;
document.head.appendChild(style);