/**
 * Timeline Section Component
 * Interactive journey timeline showing career progression
 */

import { TIMELINE_ITEMS } from '../utils/constants.js';

export class TimelineSection {
    constructor(scrollToSection) {
        this.scrollToSection = scrollToSection;
        this.container = null;
        this.timelineItems = TIMELINE_ITEMS;
    }

    async render() {
        this.container = document.getElementById('about');
        if (!this.container) {
            console.error('Timeline section container not found');
            return;
        }

        this.container.innerHTML = this.getTimelineHTML();
        this.setupEventListeners();
    }

    getTimelineHTML() {
        return `
            <div class="py-7 content-section timeline-section-bg">
                <div class="container">
                    <div class="text-center mb-5 animate-fade-in-up">
                        <h2 class="display-4 fw-bold timeline-section-title mb-4">
                            <i class="bi bi-map me-3" style="font-size: 3rem; color: var(--icon-adaptive-color);"></i>
                            My Journey
                        </h2>
                        <p class="fs-5 timeline-section-subtitle mb-0">From the pool to the stage - every step shaped who I am today</p>
                    </div>

                    <!-- Timeline Container -->
                    <div class="journey-timeline-row journey-timeline-grid-mobile animate-fade-in-up anim-delay-2">
                        ${this.timelineItems.map((item, index) => this.getTimelineItemHTML(item, index)).join('')}
                    </div>

                    <!-- Journey Quote -->
                    <div class="text-center mt-5 animate-fade-in-up timeline-quote-delay">
                        <div class="card border-0 shadow-lg rounded-5 social-hover timeline-quote-card" style="max-width: 800px; margin: 0 auto;">
                            <div class="card-body p-5">
                                <div class="mb-4">
                                    <i class="bi bi-quote timeline-quote animate-pulse" style="font-size: 3rem;"></i>
                                </div>
                                <blockquote class="mb-4">
                                    <p class="fst-italic fw-light mb-0 fs-4" style="color: var(--card-foreground); line-height: 1.6;">
                                        "I don't want to reject the concept of building my self-confidence and chasing my potential out of this programmed fear of 'what if it doesn't work out' because what if it does?"
                                    </p>
                                </blockquote>
                                <footer class="blockquote-footer">
                                    <small class="fw-semibold" style="color: var(--muted-foreground);">
                                        — The moment everything changed
                                    </small>
                                </footer>
                            </div>
                        </div>
                    </div>

                    <!-- Call to Action -->
                    <div class="text-center mt-5 animate-fade-in-up anim-delay-5">
                        <button class="btn btn-lg px-5 py-3 border-0 rounded-pill fw-bold journey-explore-btn" 
                                data-scroll-to="story" 
                                style="background-color: var(--accent); color: var(--accent-foreground);">
                            <i class="bi bi-book me-2"></i>
                            Read My Story
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getTimelineItemHTML(item, index) {
        const delay = `anim-delay-${index + 3}`;
        return `
            <div class="journey-timeline-item">
                <div class="journey-timeline-card card border-0 shadow-lg rounded-4 social-hover text-center p-4 animate-fade-in-up ${delay}" 
                     data-timeline-item="${item.id}">
                    <!-- Icon -->
                    <div class="d-flex justify-content-center mb-3">
                        <div class="journey-timeline-icon d-flex align-items-center justify-content-center" 
                             style="width: 80px; height: 80px; background-color: var(--accent); border-radius: 50%;">
                            <i class="${item.icon}" style="font-size: 1.8rem; color: #000000;"></i>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <h5 class="timeline-item-title fw-bold mb-2">${item.title}</h5>
                    <p class="timeline-item-description text-muted mb-3" style="font-size: 0.9rem; line-height: 1.4;">
                        ${item.description}
                    </p>
                    <small class="timeline-year fw-semibold" style="color: var(--accent);">${item.year}</small>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Timeline item interactions
        const timelineItems = this.container.querySelectorAll('[data-timeline-item]');
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemId = item.getAttribute('data-timeline-item');
                this.handleTimelineItemClick(itemId);
            });

            // Add keyboard navigation
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const itemId = item.getAttribute('data-timeline-item');
                    this.handleTimelineItemClick(itemId);
                }
            });

            // Make items focusable
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Learn more about ${item.querySelector('.timeline-item-title').textContent}`);
        });

        // Intersection Observer for animations
        this.setupScrollAnimations();
    }

    handleTimelineItemClick(itemId) {
        const item = this.timelineItems.find(item => item.id === itemId);
        if (!item) return;

        // Show detailed information (could be a modal or expand inline)
        this.showTimelineDetail(item);
        
        // Analytics
        console.log(`Timeline item clicked: ${itemId}`);
        if (window.gtag) {
            window.gtag('event', 'timeline_interaction', {
                'item_id': itemId,
                'item_title': item.title
            });
        }
    }

    showTimelineDetail(item) {
        // For now, scroll to story section for more details
        // In a full implementation, this could show a modal with more information
        if (this.scrollToSection) {
            this.scrollToSection('story');
        }

        // Could also show a toast with more information
        if (window.app?.components?.toast) {
            window.app.components.toast.info(
                item.content,
                item.title,
                null,
                6000
            );
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
                    
                    // Stagger timeline items
                    if (entry.target.hasAttribute('data-timeline-item')) {
                        const items = Array.from(this.container.querySelectorAll('[data-timeline-item]'));
                        const index = items.indexOf(entry.target);
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                }
            });
        }, observerOptions);

        // Observe timeline items
        const animatedElements = this.container.querySelectorAll('.animate-fade-in-up');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Add new timeline item dynamically
    addTimelineItem(item, position = -1) {
        if (position >= 0 && position < this.timelineItems.length) {
            this.timelineItems.splice(position, 0, item);
        } else {
            this.timelineItems.push(item);
        }
        
        // Re-render if needed
        this.render();
    }

    // Update timeline item
    updateTimelineItem(itemId, updates) {
        const itemIndex = this.timelineItems.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return false;

        this.timelineItems[itemIndex] = { ...this.timelineItems[itemIndex], ...updates };
        
        // Update the DOM element
        const itemElement = this.container.querySelector(`[data-timeline-item="${itemId}"]`);
        if (itemElement) {
            const titleElement = itemElement.querySelector('.timeline-item-title');
            const descriptionElement = itemElement.querySelector('.timeline-item-description');
            const yearElement = itemElement.querySelector('.timeline-year');

            if (updates.title && titleElement) titleElement.textContent = updates.title;
            if (updates.description && descriptionElement) descriptionElement.textContent = updates.description;
            if (updates.year && yearElement) yearElement.textContent = updates.year;
        }

        return true;
    }

    // Get timeline section state
    getState() {
        return {
            rendered: !!this.container,
            itemCount: this.timelineItems.length,
            visibleItems: this.container?.querySelectorAll('[data-timeline-item]').length || 0
        };
    }
}