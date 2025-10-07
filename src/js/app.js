/**
 * Main Application Controller
 * Handles app initialization, loading states, and global event coordination
 */

import { ThemeSwitcher } from './components/theme-switcher.js';
import { Navigation } from './components/navigation.js';
import { ToastManager } from './components/toast.js';
import { HeroSection } from './sections/hero-section.js';
import { TimelineSection } from './sections/timeline-section.js';
import { StorySection } from './sections/story-section.js';
import { MusicSection } from './sections/music-section.js';
import { ContactSection } from './sections/contact-section.js';
import { SocialSection } from './sections/social-section.js';
import { FooterSection } from './sections/footer-section.js';
import { BookingWizard } from './components/booking-wizard.js';
import { Gallery } from './components/gallery.js';
import { loadSVG } from './components/svg-loader.js';

class App {
    constructor() {
        this.state = {
            isLoading: true,
            isPageVisible: false,
            activeSection: 'hero',
            isBookingOpen: false,
            isMobileMenuOpen: false
        };

        this.components = {};
        this.sections = {};
        
        this.init();
    }

    async init() {
        try {
            // Initialize core components first
            this.components.toast = new ToastManager();
            this.components.navigation = new Navigation(this.handleSectionChange.bind(this));
            this.components.themeSwitcher = new ThemeSwitcher();
            
            // Load SVG assets
            await this.loadAssets();
            
            // Initialize sections
            await this.initializeSections();
            
            // Initialize modals and interactive components
            this.components.bookingWizard = new BookingWizard(this.components.toast);
            this.components.gallery = new Gallery();
            
            // Set up global event listeners
            this.setupEventListeners();
            
            // Handle initial loading
            this.handlePageLoad();
            
        } catch (error) {
            console.error('App initialization error:', error);
            this.handleLoadingError();
        }
    }

    async loadAssets() {
        try {
            // Load logos for loading screen and navigation
            const gracieKayLogo = await loadSVG('GracieKayLogo');
            
            // Insert loading logo
            const loadingLogoContainer = document.getElementById('loading-logo');
            if (loadingLogoContainer && gracieKayLogo) {
                loadingLogoContainer.innerHTML = gracieKayLogo;
            }
            
            // Insert navigation logo
            const navLogoContainer = document.getElementById('nav-logo');
            if (navLogoContainer && gracieKayLogo) {
                navLogoContainer.innerHTML = gracieKayLogo;
            }
            
        } catch (error) {
            console.error('Error loading assets:', error);
        }
    }

    async initializeSections() {
        try {
            // Initialize all sections
            this.sections.hero = new HeroSection(this.components.navigation.scrollToSection.bind(this.components.navigation));
            this.sections.timeline = new TimelineSection(this.components.navigation.scrollToSection.bind(this.components.navigation));
            this.sections.story = new StorySection();
            this.sections.music = new MusicSection();
            this.sections.contact = new ContactSection(this.handleBookingOpen.bind(this));
            this.sections.social = new SocialSection();
            this.sections.footer = new FooterSection();

            // Render all sections
            await Promise.all([
                this.sections.hero.render(),
                this.sections.timeline.render(),
                this.sections.story.render(),
                this.sections.music.render(),
                this.sections.contact.render(),
                this.sections.social.render(),
                this.sections.footer.render()
            ]);

        } catch (error) {
            console.error('Error initializing sections:', error);
        }
    }

    setupEventListeners() {
        // Global scroll listener for section tracking
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.trackActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Handle booking modal
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-booking-open]')) {
                e.preventDefault();
                this.handleBookingOpen();
            }
        });

        // Handle modal close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.matches('.booking-modal-overlay')) {
                this.handleBookingClose();
            }
            if (e.target.matches('.slideshow-modal')) {
                this.components.gallery.close();
            }
        });

        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.state.isBookingOpen) {
                    this.handleBookingClose();
                }
                if (this.components.gallery && this.components.gallery.isOpen) {
                    this.components.gallery.close();
                }
            }
        });

        // Clean up scroll blocking
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }

    trackActiveSection() {
        const sections = ['hero', 'about', 'story', 'music', 'contact'];
        const scrollPosition = window.scrollY + 190;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
                if (this.state.activeSection !== sections[i]) {
                    this.handleSectionChange(sections[i]);
                }
                break;
            }
        }
    }

    handleSectionChange(sectionId) {
        this.state.activeSection = sectionId;
        this.components.navigation.updateActiveSection(sectionId);
    }

    handleBookingOpen() {
        this.state.isBookingOpen = true;
        this.components.bookingWizard.open();
    }

    handleBookingClose() {
        this.state.isBookingOpen = false;
        this.components.bookingWizard.close();
    }

    handleBookingSubmit(formData) {
        console.log('Booking submitted:', formData);
        this.components.toast.show(
            `Thanks ${formData.firstName}! Your booking request has been submitted.`,
            'success',
            'Booking Summary',
            formData
        );
        this.handleBookingClose();
    }

    handlePageLoad() {
        // Simplified loading with shorter duration
        const loadingTimer = setTimeout(() => {
            this.state.isLoading = false;
            this.hideLoadingScreen();
            
            // Immediate fade-in after loading completes
            setTimeout(() => {
                this.state.isPageVisible = true;
                this.showMainContent();
            }, 50);
        }, 800);
    }

    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('page-loading');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    showMainContent() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.remove('page-fade-hidden');
            mainContent.classList.add('page-fade-visible');
        }
    }

    handleLoadingError() {
        console.error('Critical loading error occurred');
        this.hideLoadingScreen();
        this.showMainContent();
        
        // Show error toast
        setTimeout(() => {
            this.components.toast?.show(
                'Some content may not have loaded properly. Please refresh the page.',
                'error'
            );
        }, 1000);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause any audio/video
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }
});

// Export for debugging
window.App = App;