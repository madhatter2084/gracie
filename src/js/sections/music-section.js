/**
 * Music Section Component
 * Showcases music, streaming platforms, and testimonials
 */

import { SPOTIFY_TRACK } from '../utils/constants.js';

export class MusicSection {
    constructor() {
        this.container = null;
    }

    async render() {
        this.container = document.getElementById('music');
        if (!this.container) {
            console.error('Music section container not found');
            return;
        }

        this.container.innerHTML = this.getMusicHTML();
        this.setupEventListeners();
    }

    getMusicHTML() {
        return `
            <div class="py-7 content-section music-section-backdrop">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <!-- Section Header -->
                            <div class="text-end mb-5 animate-fade-in-up">
                                <h2 class="display-4 mb-4 fw-bold music-section-title">
                                    <i class="bi bi-vinyl-fill me-3" style="font-size: 3rem; color: var(--icon-adaptive-color);"></i>
                                    The Music
                                </h2>
                                <p class="fs-5 music-section-desc mb-4" style="color: var(--foreground);">
                                    Listen to the soundtrack of my journey
                                </p>
                                
                                <!-- Header Images -->
                                <div class="d-flex justify-content-end">
                                    <div class="d-flex gap-3">
                                        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzaW5nZXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTczNDgzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                             alt="Gracie Kay"
                                             class="rounded-5 shadow-lg music-header-image d-block">
                                        <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1hbmNlJTIwc2luZ2VyfGVufDF8fHx8MTc1NzM0ODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                             alt="Gracie Kay with beach umbrella"
                                             class="rounded-5 shadow-lg music-header-image d-block">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Streaming Platform Cards -->
                            <div class="streaming-platform-grid mb-5">
                                <!-- Spotify Card -->
                                <div class="animate-fade-in-up anim-delay-03">
                                    <div class="card h-100 border-0 shadow-lg rounded-5 social-hover music-platform-card">
                                        <div class="card-body p-5">
                                            <div class="text-center mb-4">
                                                <i class="bi bi-spotify" style="font-size: 2.5rem; color: #1DB954;"></i>
                                            </div>
                                            <h4 class="card-title fw-bold text-center mb-3 music-platform-title">
                                                More on Spotify
                                            </h4>
                                            <p class="card-text text-center mb-4 music-platform-description">
                                                Explore my full discography and latest releases
                                            </p>
                                            <div class="text-center">
                                                <a href="${SPOTIFY_TRACK.spotifyUrl}" 
                                                   class="btn btn-lg border-0 rounded-pill fw-semibold social-button px-4 py-3 music-platform-btn-spotify" 
                                                   target="_blank" rel="noopener noreferrer"
                                                   data-platform="spotify">
                                                    <i class="bi bi-play-circle me-2"></i>Open Spotify
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Apple Music Card -->
                                <div class="animate-fade-in-up anim-delay-04">
                                    <div class="card h-100 border-0 shadow-lg rounded-5 social-hover music-platform-card">
                                        <div class="card-body p-5">
                                            <div class="text-center mb-4">
                                                <i class="bi bi-music-note" style="font-size: 2.5rem; color: #FA233B;"></i>
                                            </div>
                                            <h4 class="card-title fw-bold text-center mb-3 music-platform-title">
                                                Apple Music
                                            </h4>
                                            <p class="card-text text-center mb-4 music-platform-description">
                                                Also available on Apple Music and other platforms
                                            </p>
                                            <div class="text-center">
                                                <a href="${SPOTIFY_TRACK.appleMusicUrl}" 
                                                   class="btn btn-lg border-0 rounded-pill fw-semibold social-button px-4 py-3 music-platform-btn-apple"
                                                   target="_blank" rel="noopener noreferrer"
                                                   data-platform="apple-music">
                                                    <i class="bi bi-play-circle me-2"></i>Listen on Apple Music
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Featured Track Testimonial -->
                            <div class="text-center animate-fade-in-up anim-delay-05">
                                <div class="card border-0 shadow-lg rounded-5 social-hover music-testimonial-card">
                                    <div class="card-body p-5">
                                        <div class="row align-items-center">
                                            <!-- Image on the left -->
                                            <div class="col-md-5 mb-4 mb-md-0">
                                                <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzaW5nZXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTczNDgzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                                     alt="Gracie Kay with umbrella"
                                                     class="w-100 rounded-4 shadow"
                                                     style="max-width: 400px;">
                                            </div>
                                            
                                            <!-- Text content on the right -->
                                            <div class="col-md-7">
                                                <div class="mb-4">
                                                    <i class="bi bi-quote animate-pulse" style="font-size: 3rem; color: var(--accent);"></i>
                                                </div>
                                                <blockquote class="mb-4">
                                                    <p class="fst-italic fw-light mb-0 music-testimonial-text">
                                                        "I don't want to reject the concept of building my self-confidence and chasing my potential out of this programmed fear of 'what if it doesn't work out' because what if it does?"
                                                    </p>
                                                </blockquote>
                                                <footer class="blockquote-footer">
                                                    <small class="fw-semibold music-testimonial-footer">
                                                        — A moment of discovery
                                                    </small>
                                                </footer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Music Highlights Grid -->
                            <div class="music-highlights-grid mt-5 animate-fade-in-up anim-delay-06">
                                <!-- Studio Sessions -->
                                <div class="music-highlight-card card border-0 shadow-lg rounded-5 social-hover">
                                    <div class="card-body p-4 text-center">
                                        <i class="bi bi-mic music-highlight-icon"></i>
                                        <h5 class="music-highlight-title fw-bold mb-3">Studio Sessions</h5>
                                        <p class="music-highlight-description">
                                            Behind-the-scenes look at creating authentic, heartfelt music
                                        </p>
                                    </div>
                                </div>

                                <!-- Live Performances -->
                                <div class="music-highlight-card card border-0 shadow-lg rounded-5 social-hover">
                                    <div class="card-body p-4 text-center">
                                        <i class="bi bi-music-note-list music-highlight-icon"></i>
                                        <h5 class="music-highlight-title fw-bold mb-3">Live Shows</h5>
                                        <p class="music-highlight-description">
                                            Bringing the energy and emotion of live performance to every venue
                                        </p>
                                    </div>
                                </div>

                                <!-- Collaborations -->
                                <div class="music-highlight-card card border-0 shadow-lg rounded-5 social-hover">
                                    <div class="card-body p-4 text-center">
                                        <i class="bi bi-people music-highlight-icon"></i>
                                        <h5 class="music-highlight-title fw-bold mb-3">Collaborations</h5>
                                        <p class="music-highlight-description">
                                            Working with talented artists to create something special together
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Call to Action -->
                            <div class="text-center mt-5 animate-fade-in-up anim-delay-07">
                                <h4 class="mb-4">Ready to experience live music?</h4>
                                <button class="btn btn-lg px-5 py-3 border-0 rounded-pill fw-bold" 
                                        data-scroll-to="contact"
                                        style="background-color: var(--accent); color: var(--accent-foreground);">
                                    <i class="bi bi-calendar-plus me-2"></i>
                                    Book a Performance
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Platform button clicks
        const platformButtons = this.container.querySelectorAll('[data-platform]');
        platformButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = button.getAttribute('data-platform');
                console.log(`Music platform clicked: ${platform}`);
                
                // Analytics
                if (window.gtag) {
                    window.gtag('event', 'music_platform_click', {
                        'platform': platform,
                        'location': 'music_section'
                    });
                }
            });
        });

        // Music highlight cards interaction
        const highlightCards = this.container.querySelectorAll('.music-highlight-card');
        highlightCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.music-highlight-title')?.textContent || 'Unknown';
                console.log(`Music highlight clicked: ${title}`);
                
                // Could expand card or show more information
                this.showHighlightDetail(title);
            });

            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            const title = card.querySelector('.music-highlight-title')?.textContent || 'music highlight';
            card.setAttribute('aria-label', `Learn more about ${title}`);
        });

        // Lazy load images
        this.setupImageLazyLoading();
        
        // Setup scroll animations
        this.setupScrollAnimations();
    }

    showHighlightDetail(title) {
        // Show more information about the music highlight
        const details = {
            'Studio Sessions': 'Experience the creative process behind each song, from initial concept to final recording.',
            'Live Shows': 'Feel the energy and connection that only live music can provide.',
            'Collaborations': 'Discover the magic that happens when artists come together to create.'
        };

        const detail = details[title] || 'Learn more about this aspect of my musical journey.';

        if (window.app?.components?.toast) {
            window.app.components.toast.info(detail, title, null, 5000);
        }
    }

    setupImageLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = this.container.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
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
                    
                    // Add staggered animation for grid items
                    if (entry.target.closest('.music-highlights-grid')) {
                        const gridItems = Array.from(entry.target.parentNode.children);
                        const index = gridItems.indexOf(entry.target);
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                }
            });
        }, observerOptions);

        const animatedElements = this.container.querySelectorAll('.animate-fade-in-up');
        animatedElements.forEach(element => observer.observe(element));
    }

    // Update streaming platform URLs
    updatePlatformLinks(platforms) {
        if (!this.container) return;

        Object.entries(platforms).forEach(([platform, url]) => {
            const button = this.container.querySelector(`[data-platform="${platform}"]`);
            if (button && url) {
                button.href = url;
            }
        });
    }

    // Add new music highlight
    addMusicHighlight(highlight) {
        const grid = this.container?.querySelector('.music-highlights-grid');
        if (!grid) return;

        const highlightHTML = `
            <div class="music-highlight-card card border-0 shadow-lg rounded-5 social-hover">
                <div class="card-body p-4 text-center">
                    <i class="${highlight.icon} music-highlight-icon"></i>
                    <h5 class="music-highlight-title fw-bold mb-3">${highlight.title}</h5>
                    <p class="music-highlight-description">
                        ${highlight.description}
                    </p>
                </div>
            </div>
        `;

        grid.insertAdjacentHTML('beforeend', highlightHTML);
        
        // Setup event listeners for new element
        const newCard = grid.lastElementChild;
        this.setupHighlightCardListeners(newCard);
    }

    setupHighlightCardListeners(card) {
        card.addEventListener('click', () => {
            const title = card.querySelector('.music-highlight-title')?.textContent || 'Unknown';
            this.showHighlightDetail(title);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        const title = card.querySelector('.music-highlight-title')?.textContent || 'music highlight';
        card.setAttribute('aria-label', `Learn more about ${title}`);
    }

    // Get music section state
    getState() {
        return {
            rendered: !!this.container,
            platformButtonsCount: this.container?.querySelectorAll('[data-platform]').length || 0,
            highlightCardsCount: this.container?.querySelectorAll('.music-highlight-card').length || 0,
            imagesCount: this.container?.querySelectorAll('img').length || 0
        };
    }
}