/**
 * Navigation Component
 * Handles navigation, scroll tracking, and mobile menu
 */

import { NAVIGATION_OFFSET } from '../utils/constants.js';
import { debounce } from '../utils/helpers.js';

export class Navigation {
    constructor(onSectionChange) {
        this.onSectionChange = onSectionChange;
        this.activeSection = 'hero';
        this.isMobileMenuOpen = false;
        this.sections = ['hero', 'about', 'story', 'music', 'contact'];
        
        this.elements = {
            mobileToggle: null,
            mobileMenu: null,
            desktopNav: null,
            allNavLinks: []
        };
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.updateActiveSection('hero');
    }

    cacheElements() {
        this.elements.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.elements.mobileMenu = document.getElementById('mobile-nav');
        this.elements.desktopNav = document.getElementById('desktop-nav');
        this.elements.allNavLinks = document.querySelectorAll('[data-nav]');
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.elements.mobileToggle) {
            this.elements.mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Navigation link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-scroll-to]')) {
                e.preventDefault();
                const sectionId = e.target.getAttribute('data-scroll-to');
                this.scrollToSection(sectionId);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.elements.mobileMenu?.contains(e.target) && 
                !this.elements.mobileToggle?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle resize to close mobile menu on desktop
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250));
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (!element) {
            console.warn(`Section "${sectionId}" not found`);
            return;
        }

        // Close mobile menu if open
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Update active section immediately for responsive feedback
        this.updateActiveSection(sectionId);

        // Smooth scroll with offset
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - NAVIGATION_OFFSET;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Call the section change callback
        if (this.onSectionChange) {
            this.onSectionChange(sectionId);
        }
    }

    updateActiveSection(sectionId) {
        if (this.activeSection === sectionId) return;

        this.activeSection = sectionId;

        // Update all navigation links
        this.elements.allNavLinks.forEach(link => {
            const linkSection = link.getAttribute('data-nav');
            if (linkSection === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update page title if needed
        this.updatePageTitle(sectionId);
    }

    updatePageTitle(sectionId) {
        const sectionTitles = {
            hero: 'Gracie Kay - Life Has No Script',
            about: 'Gracie Kay - Journey',
            story: 'Gracie Kay - My Story',
            music: 'Gracie Kay - Music',
            contact: 'Gracie Kay - Book Performance'
        };

        const title = sectionTitles[sectionId] || 'Gracie Kay - Life Has No Script';
        document.title = title;
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        if (!this.elements.mobileMenu || !this.elements.mobileToggle) return;

        this.isMobileMenuOpen = true;
        this.elements.mobileMenu.style.display = 'block';
        
        // Update toggle button icon
        const icon = this.elements.mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
        }

        // Add animation class
        requestAnimationFrame(() => {
            this.elements.mobileMenu.classList.add('animate-slide-in');
        });

        // Set ARIA attributes
        this.elements.mobileToggle.setAttribute('aria-expanded', 'true');
        this.elements.mobileMenu.setAttribute('aria-hidden', 'false');

        // Focus first link for accessibility
        const firstLink = this.elements.mobileMenu.querySelector('.mobile-nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }

    closeMobileMenu() {
        if (!this.elements.mobileMenu || !this.elements.mobileToggle || !this.isMobileMenuOpen) return;

        this.isMobileMenuOpen = false;
        
        // Update toggle button icon
        const icon = this.elements.mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }

        // Hide menu
        this.elements.mobileMenu.style.display = 'none';
        this.elements.mobileMenu.classList.remove('animate-slide-in');

        // Set ARIA attributes
        this.elements.mobileToggle.setAttribute('aria-expanded', 'false');
        this.elements.mobileMenu.setAttribute('aria-hidden', 'true');
    }

    // Public method for external components to track sections
    trackActiveSection() {
        const scrollPosition = window.scrollY + NAVIGATION_OFFSET;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(this.sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
                this.updateActiveSection(this.sections[i]);
                break;
            }
        }
    }

    // Get current active section
    getActiveSection() {
        return this.activeSection;
    }

    // Add section to navigation (for dynamic sections)
    addSection(sectionId, position = -1) {
        if (this.sections.includes(sectionId)) return;

        if (position >= 0 && position < this.sections.length) {
            this.sections.splice(position, 0, sectionId);
        } else {
            this.sections.push(sectionId);
        }
    }

    // Remove section from navigation
    removeSection(sectionId) {
        const index = this.sections.indexOf(sectionId);
        if (index > -1) {
            this.sections.splice(index, 1);
        }
    }

    // Highlight navigation based on scroll position
    highlightNavigation() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Handle special cases
        if (scrollPosition === 0) {
            this.updateActiveSection('hero');
            return;
        }

        if (scrollPosition + viewportHeight >= documentHeight - 10) {
            // Near bottom of page
            this.updateActiveSection(this.sections[this.sections.length - 1]);
            return;
        }

        // Normal section tracking
        this.trackActiveSection();
    }

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.updateActiveSection('hero');
    }

    // Check if mobile menu is open
    isMobileMenuActive() {
        return this.isMobileMenuOpen;
    }

    // Enable/disable navigation
    setEnabled(enabled) {
        const allLinks = document.querySelectorAll('[data-scroll-to]');
        allLinks.forEach(link => {
            if (enabled) {
                link.style.pointerEvents = 'auto';
                link.removeAttribute('disabled');
            } else {
                link.style.pointerEvents = 'none';
                link.setAttribute('disabled', 'true');
            }
        });
    }

    // Get navigation state for debugging
    getState() {
        return {
            activeSection: this.activeSection,
            isMobileMenuOpen: this.isMobileMenuOpen,
            sections: this.sections,
            elementsFound: {
                mobileToggle: !!this.elements.mobileToggle,
                mobileMenu: !!this.elements.mobileMenu,
                desktopNav: !!this.elements.desktopNav,
                navLinksCount: this.elements.allNavLinks.length
            }
        };
    }
}