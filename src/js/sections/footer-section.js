/**
 * Footer Section Component
 * Site footer with links, social media, and newsletter signup
 */

import { loadSVG } from '../components/svg-loader.js';

export class FooterSection {
    constructor() {
        this.container = null;
    }

    async render() {
        this.container = document.getElementById('footer');
        if (!this.container) {
            console.error('Footer section container not found');
            return;
        }

        this.container.innerHTML = await this.getFooterHTML();
        this.setupEventListeners();
    }

    async getFooterHTML() {
        const gracieKayLogo = await loadSVG('GracieKayLogo');
        
        return `
            <footer class="footer-section-bg py-5">
                <div class="container">
                    <div class="row g-4">
                        <!-- Logo and Description -->
                        <div class="col-lg-4">
                            <div class="footer-logo-wrapper mb-3">
                                ${gracieKayLogo || '<div class="text-placeholder">Gracie Kay</div>'}
                            </div>
                            <p class="footer-description mb-3">
                                Life has no script. Follow my journey from competitive swimming to creating music that moves hearts.
                            </p>
                            <div class="d-flex gap-2 mb-3">
                                <a href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow" 
                                   class="footer-social-btn btn rounded-circle d-flex align-items-center justify-content-center"
                                   target="_blank" rel="noopener noreferrer" title="Spotify">
                                    <i class="bi bi-spotify"></i>
                                </a>
                                <a href="https://music.apple.com/ca/song/undercover/1822967268" 
                                   class="footer-social-btn btn rounded-circle d-flex align-items-center justify-content-center"
                                   target="_blank" rel="noopener noreferrer" title="Apple Music">
                                    <i class="bi bi-music-note"></i>
                                </a>
                                <a href="#" 
                                   class="footer-social-btn btn rounded-circle d-flex align-items-center justify-content-center"
                                   target="_blank" rel="noopener noreferrer" title="Instagram">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a href="#" 
                                   class="footer-social-btn btn rounded-circle d-flex align-items-center justify-content-center"
                                   target="_blank" rel="noopener noreferrer" title="TikTok">
                                    <i class="bi bi-tiktok"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="col-lg-2 col-md-6">
                            <h6 class="footer-category-title fw-semibold mb-3">Navigate</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <a href="#hero" class="footer-link text-decoration-none" data-scroll-to="hero">Home</a>
                                </li>
                                <li class="mb-2">
                                    <a href="#about" class="footer-link text-decoration-none" data-scroll-to="about">Journey</a>
                                </li>
                                <li class="mb-2">
                                    <a href="#story" class="footer-link text-decoration-none" data-scroll-to="story">Story</a>
                                </li>
                                <li class="mb-2">
                                    <a href="#music" class="footer-link text-decoration-none" data-scroll-to="music">Music</a>
                                </li>
                                <li class="mb-2">
                                    <a href="#contact" class="footer-link text-decoration-none" data-scroll-to="contact">Book</a>
                                </li>
                            </ul>
                        </div>

                        <!-- Music Links -->
                        <div class="col-lg-2 col-md-6">
                            <h6 class="footer-category-title fw-semibold mb-3">Music</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <a href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow" 
                                       class="footer-link footer-link-white-hover text-decoration-none footer-link-external" 
                                       target="_blank" rel="noopener noreferrer">
                                        Spotify <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="https://music.apple.com/ca/song/undercover/1822967268" 
                                       class="footer-link footer-link-white-hover text-decoration-none footer-link-external" 
                                       target="_blank" rel="noopener noreferrer">
                                        Apple Music <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" 
                                       class="footer-link footer-link-white-hover text-decoration-none footer-link-external" 
                                       target="_blank" rel="noopener noreferrer">
                                        YouTube Music <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" 
                                       class="footer-link footer-link-white-hover text-decoration-none footer-link-external" 
                                       target="_blank" rel="noopener noreferrer">
                                        SoundCloud <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Newsletter Signup -->
                        <div class="col-lg-4">
                            <h6 class="footer-newsletter-title fw-semibold mb-3">Stay Updated</h6>
                            <p class="footer-newsletter-text mb-3">
                                Get notified about new releases, upcoming shows, and exclusive content.
                            </p>
                            <form class="newsletter-form mb-3" id="newsletter-form">
                                <div class="d-flex gap-2">
                                    <input type="email" 
                                           class="form-control footer-email-input rounded-pill flex-grow-1" 
                                           placeholder="your@email.com" 
                                           required
                                           name="email"
                                           aria-label="Email address">
                                    <button type="submit" 
                                            class="footer-subscribe-btn btn rounded-pill fw-semibold">
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                            <div class="d-flex gap-2">
                                <button class="footer-book-btn btn btn-sm rounded-pill fw-semibold" data-scroll-to="contact">
                                    <i class="bi bi-calendar-plus me-1"></i>
                                    Book Show
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <hr class="footer-divider my-4">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <p class="footer-copyright mb-0">
                                &copy; ${new Date().getFullYear()} Gracie Kay. All rights reserved.
                            </p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="footer-made-with mb-0">
                                Made with <span class="footer-heart">♥</span> and lots of music
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Newsletter form submission
        const newsletterForm = this.container.querySelector('#newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(newsletterForm);
            });
        }

        // Social link tracking
        const socialLinks = this.container.querySelectorAll('.footer-social-btn, .footer-link-external');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link);
                console.log(`Footer social link clicked: ${platform}`);
                
                // Analytics
                if (window.gtag) {
                    window.gtag('event', 'footer_social_click', {
                        'platform': platform,
                        'location': 'footer'
                    });
                }
            });
        });
    }

    handleNewsletterSubmission(form) {
        const formData = new FormData(form);
        const email = formData.get('email');

        if (!this.isValidEmail(email)) {
            if (window.app?.components?.toast) {
                window.app.components.toast.error('Please enter a valid email address.');
            }
            return;
        }

        // Simulate newsletter signup
        console.log('Newsletter signup:', email);
        
        if (window.app?.components?.toast) {
            window.app.components.toast.success(
                'Thanks for subscribing! You\'ll be the first to know about new releases and shows.',
                'Successfully Subscribed',
                null,
                6000
            );
        }

        // Reset form
        form.reset();

        // Analytics
        if (window.gtag) {
            window.gtag('event', 'newsletter_signup', {
                'method': 'footer_form'
            });
        }
    }

    getSocialPlatform(linkElement) {
        const href = linkElement.href || '';
        const classes = linkElement.className || '';
        
        if (href.includes('spotify') || classes.includes('spotify')) return 'spotify';
        if (href.includes('apple') || classes.includes('music-note')) return 'apple-music';
        if (href.includes('instagram') || classes.includes('instagram')) return 'instagram';
        if (href.includes('tiktok') || classes.includes('tiktok')) return 'tiktok';
        if (href.includes('youtube')) return 'youtube';
        if (href.includes('soundcloud')) return 'soundcloud';
        
        return 'unknown';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Update social media links
    updateSocialLinks(links) {
        if (!this.container) return;

        Object.entries(links).forEach(([platform, url]) => {
            const socialButton = this.container.querySelector(`[title="${platform}"]`);
            if (socialButton && url) {
                socialButton.href = url;
            }
        });
    }

    // Get footer section state
    getState() {
        return {
            rendered: !!this.container,
            socialLinksCount: this.container?.querySelectorAll('.footer-social-btn').length || 0,
            hasNewsletterForm: !!this.container?.querySelector('#newsletter-form')
        };
    }
}