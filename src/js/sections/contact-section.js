/**
 * Contact Section Component
 * Booking form and contact information
 */

export class ContactSection {
    constructor(onBookingOpen) {
        this.onBookingOpen = onBookingOpen;
        this.container = null;
    }

    async render() {
        this.container = document.getElementById('contact');
        if (!this.container) {
            console.error('Contact section container not found');
            return;
        }

        this.container.innerHTML = this.getContactHTML();
        this.setupEventListeners();
    }

    getContactHTML() {
        return `
            <div class="py-7 content-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <!-- Header Section -->
                            <div class="text-center mb-5 animate-fade-in-up">
                                <div class="mb-4">
                                    <i class="bi bi-check-circle-fill me-3 contact-header-icon"></i>
                                    <h1 class="display-4 fw-bold d-inline contact-header-title">
                                        Book Gracie Kay
                                    </h1>
                                </div>
                            </div>
                            
                            <!-- Main Booking Card -->
                            <div class="card border-0 shadow-lg rounded-5 social-hover animate-fade-in-up contact-main-card anim-delay-02">
                                <div class="card-body p-5 text-center">
                                    <!-- Music Icon and Title -->
                                    <div class="mb-5">
                                        <div class="mb-4">
                                            <i class="bi bi-music-note contact-card-icon"></i>
                                        </div>
                                        <h3 class="fw-bold mb-3 contact-card-title">
                                            Professional Artist Booking
                                        </h3>
                                        <p class="mb-0 contact-card-description">
                                            From intimate acoustic sets to full performances, let's discuss how we can make your event unforgettable.
                                        </p>
                                    </div>

                                    <!-- Booking Process Timeline -->
                                    <div class="booking-timeline-container mb-5">
                                        <div class="booking-timeline">
                                            <!-- Step 1: Inquiry -->
                                            <div class="timeline-step">
                                                <div class="timeline-icon-container">
                                                    <div class="timeline-icon">
                                                        <i class="bi bi-chat-dots booking-step-icon"></i>
                                                    </div>
                                                </div>
                                                <div class="timeline-content">
                                                    <h5 class="timeline-title">Inquiry</h5>
                                                    <p class="timeline-subtitle">Share your vision</p>
                                                </div>
                                            </div>

                                            <!-- Step 2: Planning -->
                                            <div class="timeline-step">
                                                <div class="timeline-icon-container">
                                                    <div class="timeline-icon">
                                                        <i class="bi bi-music-note-beamed booking-step-icon"></i>
                                                    </div>
                                                </div>
                                                <div class="timeline-content">
                                                    <h5 class="timeline-title">Planning</h5>
                                                    <p class="timeline-subtitle">Craft the perfect set</p>
                                                </div>
                                            </div>

                                            <!-- Step 3: Performance -->
                                            <div class="timeline-step">
                                                <div class="timeline-icon-container">
                                                    <div class="timeline-icon">
                                                        <i class="bi bi-star-fill booking-step-icon"></i>
                                                    </div>
                                                </div>
                                                <div class="timeline-content">
                                                    <h5 class="timeline-title">Performance</h5>
                                                    <p class="timeline-subtitle">Unforgettable moments</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- CTA Button -->
                                    <div class="mb-4">
                                        <button class="btn btn-lg px-5 py-3 border-0 rounded-pill fw-bold booking-cta-button"
                                                data-booking-open>
                                            <i class="bi bi-calendar-plus me-2"></i>
                                            Start Booking Process
                                        </button>
                                    </div>

                                    <!-- Footer Text -->
                                    <div>
                                        <small class="contact-footer-text">
                                            <i class="bi bi-shield-check me-1" style="color: var(--accent);"></i>
                                            Professional • Reliable • Unforgettable
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Booking button click is handled globally in app.js
        // Timeline step interactions
        const timelineSteps = this.container.querySelectorAll('.timeline-step');
        timelineSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                this.handleTimelineStepClick(index);
            });

            // Add keyboard navigation
            step.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleTimelineStepClick(index);
                }
            });

            // Make steps focusable
            step.setAttribute('tabindex', '0');
            step.setAttribute('role', 'button');
            
            const title = step.querySelector('.timeline-title')?.textContent || 'booking step';
            step.setAttribute('aria-label', `Learn more about ${title}`);
        });

        // Setup scroll animations
        this.setupScrollAnimations();
    }

    handleTimelineStepClick(stepIndex) {
        const stepDetails = [
            {
                title: 'Inquiry',
                message: 'Tell us about your event - date, location, type of performance, and your vision. We\'ll respond within 24 hours.'
            },
            {
                title: 'Planning',
                message: 'We\'ll work together to create the perfect setlist and performance style for your event.'
            },
            {
                title: 'Performance',
                message: 'Experience live music that creates lasting memories for you and your guests.'
            }
        ];

        const step = stepDetails[stepIndex];
        if (step && window.app?.components?.toast) {
            window.app.components.toast.info(step.message, step.title, null, 5000);
        }
    }

    setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    
                    // Animate timeline steps in sequence
                    if (entry.target.closest('.booking-timeline')) {
                        const steps = Array.from(entry.target.closest('.booking-timeline').querySelectorAll('.timeline-step'));
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.style.opacity = '1';
                                step.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);

        const animatedElements = this.container.querySelectorAll('.animate-fade-in-up');
        animatedElements.forEach(element => observer.observe(element));
    }

    // Get contact section state
    getState() {
        return {
            rendered: !!this.container,
            timelineStepsCount: this.container?.querySelectorAll('.timeline-step').length || 0
        };
    }
}