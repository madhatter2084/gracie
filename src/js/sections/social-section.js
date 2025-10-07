/**
 * Social Media Section Component
 * Social platform connections and call-to-action
 */

import { SOCIAL_PLATFORMS } from '../utils/constants.js';

export class SocialSection {
    constructor() {
        this.container = null;
        this.platforms = SOCIAL_PLATFORMS;
    }

    async render() {
        this.container = document.getElementById('social');
        if (!this.container) {
            console.error('Social section container not found');
            return;
        }

        this.container.innerHTML = this.getSocialHTML();
        this.setupEventListeners();
    }

    getSocialHTML() {
        return `
            <div class="py-7 content-section">
                <div class="container">
                    <div class="text-center mb-5 animate-fade-in-up">
                        <h2 class="display-4 fw-bold social-section-title mb-4">
                            <i class="bi bi-share me-3" style="font-size: 3rem; color: var(--icon-adaptive-color);"></i>
                            Stay Connected
                        </h2>
                        <p class="fs-5 social-section-subtitle">Follow my journey across all platforms</p>
                    </div>

                    <!-- Social Platform Cards -->
                    <div class="row g-4 mb-5">
                        ${this.platforms.map((platform, index) => this.getPlatformHTML(platform, index)).join('')}
                    </div>

                    <!-- Call to Action -->
                    <div class="text-center animate-fade-in-up social-cta-delay">
                        <div class="social-cta-card card border-0 shadow-lg rounded-5 p-5">
                            <div class="mb-4">
                                <i class="bi bi-heart social-cta-icon"></i>
                            </div>
                            <h3 class="social-cta-title fw-bold mb-3">
                                Let's Connect
                            </h3>
                            <p class="social-cta-text mb-4">
                                Join thousands of music lovers following my journey. Get updates, behind-the-scenes content, and be the first to hear new releases.
                            </p>
                            <div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
                                <button class="btn btn-lg social-cta-btn-primary rounded-pill px-4 py-3" data-scroll-to="contact">
                                    <i class="bi bi-calendar-plus me-2"></i>
                                    Book Performance
                                </button>
                                <a href="${this.platforms[0].url}" class="btn btn-lg social-cta-btn-secondary rounded-pill px-4 py-3" target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-music-note me-2"></i>
                                    Listen Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPlatformHTML(platform, index) {
        const delay = `anim-delay-${index + 2}`;
        return `
            <div class="col-md-6 col-lg-3">
                <div class="social-platform-card card h-100 border-0 shadow-lg rounded-5 text-center p-4 animate-fade-in-up ${delay}" 
                     style="background: linear-gradient(135deg, ${platform.color}CC 0%, ${platform.color} 100%);"
                     data-platform="${platform.name.toLowerCase()}">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-3">
                            <i class="${platform.icon} social-platform-icon"></i>
                        </div>
                        <h4 class="social-platform-title fw-bold mb-2">${platform.name}</h4>
                        <p class="social-platform-description mb-3 flex-grow-1">${platform.description}</p>
                        <div class="social-platform-handle rounded-pill px-3 py-2 mb-3">
                            ${platform.handle}
                        </div>
                        <a href="${platform.url}" 
                           class="btn btn-light btn-sm rounded-pill fw-semibold mt-auto"
                           target="_blank" rel="noopener noreferrer"
                           data-platform="${platform.name.toLowerCase()}">
                            Follow <i class="bi bi-arrow-right ms-1"></i>
                        </a>
                    </div>  
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Platform card clicks
        const platformCards = this.container.querySelectorAll('[data-platform]');
        platformCards.forEach(card => {
            const link = card.querySelector('a[data-platform]');
            if (link) {
                link.addEventListener('click', (e) => {
                    const platform = link.getAttribute('data-platform');
                    console.log(`Social platform clicked: ${platform}`);
                    
                    // Analytics
                    if (window.gtag) {
                        window.gtag('event', 'social_platform_click', {
                            'platform': platform,
                            'location': 'social_section'
                        });
                    }
                });
            }
        });

        // Setup scroll animations
        this.setupScrollAnimations();
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
                    
                    // Stagger platform cards
                    if (entry.target.hasAttribute('data-platform')) {
                        const cards = Array.from(this.container.querySelectorAll('[data-platform]'));
                        const index = cards.indexOf(entry.target);
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                }
            });
        }, observerOptions);

        const animatedElements = this.container.querySelectorAll('.animate-fade-in-up');
        animatedElements.forEach(element => observer.observe(element));
    }

    getState() {
        return {
            rendered: !!this.container,
            platformsCount: this.platforms.length
        };
    }
}