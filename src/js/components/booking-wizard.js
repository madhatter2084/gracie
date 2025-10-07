/**
 * Booking Wizard Component
 * Multi-step booking form modal
 */

import { BOOKING_STEPS, EVENT_TYPES, PERFORMANCE_TYPES } from '../utils/constants.js';
import { getFormData, isValidEmail, isValidPhone } from '../utils/helpers.js';

export class BookingWizard {
    constructor(toastManager) {
        this.toastManager = toastManager;
        this.modal = null;
        this.currentStep = 0;
        this.formData = {};
        this.steps = BOOKING_STEPS;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.modal = document.getElementById('booking-modal');
        if (!this.modal) {
            console.warn('Booking modal container not found');
            return;
        }
    }

    open() {
        if (!this.modal) return;

        this.isOpen = true;
        this.currentStep = 0;
        this.formData = {};
        
        this.render();
        this.modal.style.display = 'flex';
        
        // Focus first input for accessibility
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.modal) return;

        this.isOpen = false;
        this.modal.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    render() {
        if (!this.modal) return;

        const modalContent = this.modal.querySelector('.booking-modal-content');
        if (!modalContent) return;

        modalContent.innerHTML = this.getModalHTML();
        this.setupEventListeners();
    }

    getModalHTML() {
        const currentStepData = this.steps[this.currentStep];
        const progress = ((this.currentStep + 1) / this.steps.length) * 100;

        return `
            <!-- Modal Header -->
            <div class="booking-header-border border-bottom p-4 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-3">
                    <div class="booking-step-icon-wrapper rounded-circle d-flex align-items-center justify-content-center">
                        <i class="${currentStepData.icon} booking-step-icon"></i>
                    </div>
                    <div>
                        <h3 class="booking-title mb-1">${currentStepData.title}</h3>
                        <p class="booking-step-subtitle mb-0">${currentStepData.subtitle}</p>
                    </div>
                </div>
                <button class="booking-close-btn btn rounded-circle d-flex align-items-center justify-content-center" 
                        id="booking-close">
                    <i class="bi bi-x"></i>
                </button>
            </div>

            <!-- Progress Bar -->
            <div class="booking-progress-bg p-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    ${this.steps.map((step, index) => `
                        <small class="booking-progress-step ${index <= this.currentStep ? 'active' : 'inactive'}">
                            ${step.title}
                        </small>
                    `).join('')}
                </div>
                <div class="booking-progress-bg rounded">
                    <div class="booking-progress-bar rounded" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Form Content -->
            <div class="booking-form-content p-4 flex-grow-1 overflow-auto">
                <form id="booking-form">
                    ${this.getStepContent()}
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="booking-footer-border border-top p-4 d-flex align-items-center justify-content-between">
                <div class="booking-step-counter">
                    Step ${this.currentStep + 1} of ${this.steps.length}
                </div>
                <div class="d-flex gap-2">
                    ${this.currentStep > 0 ? `
                        <button class="booking-btn-prev btn rounded-pill px-4" id="booking-prev">
                            <i class="bi bi-arrow-left me-2"></i>Previous
                        </button>
                    ` : ''}
                    <button class="booking-btn-next btn rounded-pill px-4" id="booking-next">
                        ${this.currentStep === this.steps.length - 1 ? 'Submit Booking' : 'Next'}
                        ${this.currentStep < this.steps.length - 1 ? '<i class="bi bi-arrow-right ms-2"></i>' : '<i class="bi bi-check ms-2"></i>'}
                    </button>
                </div>
            </div>
        `;
    }

    getStepContent() {
        switch (this.currentStep) {
            case 0: return this.getContactStep();
            case 1: return this.getEventStep();
            case 2: return this.getPreferencesStep();
            case 3: return this.getReviewStep();
            default: return '<p>Invalid step</p>';
        }
    }

    getContactStep() {
        return `
            <div class="booking-section-title d-flex align-items-center gap-2 mb-4">
                <i class="bi bi-person booking-section-icon"></i>
                <h4 class="mb-0">Your Information</h4>
            </div>
            
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">First Name *</label>
                    <input type="text" class="form-control" name="firstName" required 
                           value="${this.formData.firstName || ''}" placeholder="Your first name">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Last Name *</label>
                    <input type="text" class="form-control" name="lastName" required 
                           value="${this.formData.lastName || ''}" placeholder="Your last name">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Email Address *</label>
                    <input type="email" class="form-control" name="email" required 
                           value="${this.formData.email || ''}" placeholder="your@email.com">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Phone Number *</label>
                    <input type="tel" class="form-control" name="phone" required 
                           value="${this.formData.phone || ''}" placeholder="(555) 123-4567">
                </div>
                <div class="col-12">
                    <label class="booking-form-label fw-semibold mb-2">Organization/Company</label>
                    <input type="text" class="form-control" name="organization" 
                           value="${this.formData.organization || ''}" placeholder="Optional">
                </div>
            </div>
        `;
    }

    getEventStep() {
        return `
            <div class="booking-section-title d-flex align-items-center gap-2 mb-4">
                <i class="bi bi-calendar-event booking-section-icon"></i>
                <h4 class="mb-0">Event Details</h4>
            </div>
            
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Event Type *</label>
                    <select class="form-control" name="eventType" required>
                        <option value="">Select event type</option>
                        ${EVENT_TYPES.map(type => `
                            <option value="${type.value}" ${this.formData.eventType === type.value ? 'selected' : ''}>
                                ${type.label}
                            </option>
                        `).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Event Date *</label>
                    <input type="date" class="form-control" name="eventDate" required 
                           value="${this.formData.eventDate || ''}" min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Start Time</label>
                    <input type="time" class="form-control" name="startTime" 
                           value="${this.formData.startTime || ''}">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Duration (hours)</label>
                    <select class="form-control" name="duration">
                        <option value="">Select duration</option>
                        <option value="1" ${this.formData.duration === '1' ? 'selected' : ''}>1 hour</option>
                        <option value="2" ${this.formData.duration === '2' ? 'selected' : ''}>2 hours</option>
                        <option value="3" ${this.formData.duration === '3' ? 'selected' : ''}>3 hours</option>
                        <option value="4" ${this.formData.duration === '4' ? 'selected' : ''}>4+ hours</option>
                    </select>
                </div>
                <div class="col-12">
                    <label class="booking-form-label fw-semibold mb-2">Venue/Location *</label>
                    <input type="text" class="form-control" name="venue" required 
                           value="${this.formData.venue || ''}" placeholder="Venue name and address">
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Expected Guests</label>
                    <select class="form-control" name="guestCount">
                        <option value="">Select guest count</option>
                        <option value="1-25" ${this.formData.guestCount === '1-25' ? 'selected' : ''}>1-25</option>
                        <option value="26-50" ${this.formData.guestCount === '26-50' ? 'selected' : ''}>26-50</option>
                        <option value="51-100" ${this.formData.guestCount === '51-100' ? 'selected' : ''}>51-100</option>
                        <option value="100+" ${this.formData.guestCount === '100+' ? 'selected' : ''}>100+</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="booking-form-label fw-semibold mb-2">Budget Range</label>
                    <select class="form-control" name="budget">
                        <option value="">Select budget range</option>
                        <option value="under-1000" ${this.formData.budget === 'under-1000' ? 'selected' : ''}>Under $1,000</option>
                        <option value="1000-2500" ${this.formData.budget === '1000-2500' ? 'selected' : ''}>$1,000 - $2,500</option>
                        <option value="2500-5000" ${this.formData.budget === '2500-5000' ? 'selected' : ''}>$2,500 - $5,000</option>
                        <option value="5000+" ${this.formData.budget === '5000+' ? 'selected' : ''}>$5,000+</option>
                    </select>
                </div>
            </div>
        `;
    }

    getPreferencesStep() {
        return `
            <div class="booking-section-title d-flex align-items-center gap-2 mb-4">
                <i class="bi bi-music-note-beamed booking-section-icon"></i>
                <h4 class="mb-0">Performance Preferences</h4>
            </div>
            
            <div class="row g-3">
                <div class="col-12">
                    <label class="booking-form-label fw-semibold mb-2">Performance Type *</label>
                    <div class="row g-2">
                        ${PERFORMANCE_TYPES.map(type => `
                            <div class="col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="performanceType" 
                                           value="${type.value}" id="${type.value}"
                                           ${this.formData.performanceType === type.value ? 'checked' : ''}>
                                    <label class="form-check-label" for="${type.value}">
                                        <i class="${type.icon} me-2"></i>${type.label}
                                    </label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="col-12">
                    <label class="booking-form-label fw-semibold mb-2">Special Song Requests</label>
                    <textarea class="form-control" name="songRequests" rows="3" 
                              placeholder="Any specific songs you'd like to hear?">${this.formData.songRequests || ''}</textarea>
                </div>
                <div class="col-12">
                    <label class="booking-form-label fw-semibold mb-2">Additional Details</label>
                    <textarea class="form-control" name="additionalDetails" rows="4" 
                              placeholder="Tell us more about your event, special requirements, setup needs, etc.">${this.formData.additionalDetails || ''}</textarea>
                </div>
            </div>
        `;
    }

    getReviewStep() {
        return `
            <div class="booking-section-title d-flex align-items-center gap-2 mb-4">
                <i class="bi bi-check-circle booking-section-icon"></i>
                <h4 class="mb-0">Review Your Booking</h4>
            </div>
            
            <div class="card border rounded-4 p-4">
                <h5 class="mb-3">Booking Summary</h5>
                
                <div class="row g-3">
                    <div class="col-md-6">
                        <strong>Contact:</strong><br>
                        ${this.formData.firstName} ${this.formData.lastName}<br>
                        ${this.formData.email}<br>
                        ${this.formData.phone}
                    </div>
                    <div class="col-md-6">
                        <strong>Event:</strong><br>
                        ${this.getEventTypeLabel(this.formData.eventType)}<br>
                        ${this.formData.eventDate ? new Date(this.formData.eventDate).toLocaleDateString() : 'TBD'}<br>
                        ${this.formData.venue || 'TBD'}
                    </div>
                    <div class="col-12">
                        <strong>Performance:</strong><br>
                        ${this.getPerformanceTypeLabel(this.formData.performanceType)}
                        ${this.formData.duration ? ` - ${this.formData.duration} hour(s)` : ''}
                        ${this.formData.guestCount ? ` - ${this.formData.guestCount} guests` : ''}
                    </div>
                    ${this.formData.songRequests ? `
                        <div class="col-12">
                            <strong>Song Requests:</strong><br>
                            ${this.formData.songRequests}
                        </div>
                    ` : ''}
                    ${this.formData.additionalDetails ? `
                        <div class="col-12">
                            <strong>Additional Details:</strong><br>
                            ${this.formData.additionalDetails}
                        </div>
                    ` : ''}
                </div>
                
                <div class="alert alert-info mt-4 mb-0">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>What happens next?</strong><br>
                    We'll review your booking request and get back to you within 24 hours with availability and pricing details.
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.modal) return;

        // Close button
        const closeBtn = this.modal.querySelector('#booking-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Previous button
        const prevBtn = this.modal.querySelector('#booking-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }

        // Next button
        const nextBtn = this.modal.querySelector('#booking-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        // Form submission on enter
        const form = this.modal.querySelector('#booking-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.nextStep();
            });
        }
    }

    nextStep() {
        if (!this.validateCurrentStep()) return;

        this.saveCurrentStepData();

        if (this.currentStep === this.steps.length - 1) {
            this.submitBooking();
        } else {
            this.currentStep++;
            this.render();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.saveCurrentStepData();
            this.currentStep--;
            this.render();
        }
    }

    validateCurrentStep() {
        const form = this.modal?.querySelector('#booking-form');
        if (!form) return false;

        // Basic HTML5 validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        // Additional custom validation
        const formData = getFormData(form);

        switch (this.currentStep) {
            case 0: // Contact step
                if (!isValidEmail(formData.email)) {
                    this.showValidationError('Please enter a valid email address.');
                    return false;
                }
                if (!isValidPhone(formData.phone)) {
                    this.showValidationError('Please enter a valid phone number.');
                    return false;
                }
                break;

            case 1: // Event step
                if (!formData.eventType) {
                    this.showValidationError('Please select an event type.');
                    return false;
                }
                if (!formData.eventDate) {
                    this.showValidationError('Please select an event date.');
                    return false;
                }
                break;

            case 2: // Preferences step
                if (!formData.performanceType) {
                    this.showValidationError('Please select a performance type.');
                    return false;
                }
                break;
        }

        return true;
    }

    saveCurrentStepData() {
        const form = this.modal?.querySelector('#booking-form');
        if (!form) return;

        const stepData = getFormData(form);
        this.formData = { ...this.formData, ...stepData };
    }

    submitBooking() {
        console.log('Submitting booking:', this.formData);

        // Show success message
        if (this.toastManager) {
            this.toastManager.showBookingConfirmation(this.formData);
        }

        // Analytics
        if (window.gtag) {
            window.gtag('event', 'booking_submission', {
                'event_type': this.formData.eventType,
                'performance_type': this.formData.performanceType
            });
        }

        this.close();
    }

    showValidationError(message) {
        if (this.toastManager) {
            this.toastManager.error(message, 'Validation Error');
        }
    }

    getEventTypeLabel(value) {
        const type = EVENT_TYPES.find(t => t.value === value);
        return type ? type.label : value;
    }

    getPerformanceTypeLabel(value) {
        const type = PERFORMANCE_TYPES.find(t => t.value === value);
        return type ? type.label : value;
    }

    // Get booking wizard state
    getState() {
        return {
            isOpen: this.isOpen,
            currentStep: this.currentStep,
            formDataKeys: Object.keys(this.formData),
            stepsCount: this.steps.length
        };
    }
}