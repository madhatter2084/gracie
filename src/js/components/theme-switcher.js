/**
 * Theme Switcher Component
 * Handles light/dark/system theme switching with persistence
 */

import { getStorageItem, setStorageItem } from '../utils/storage.js';
import { THEME_STORAGE_KEY } from '../utils/constants.js';

export class ThemeSwitcher {
    constructor() {
        this.themes = ['light', 'dark', 'system'];
        this.currentTheme = 'system';
        this.systemTheme = 'light';
        this.button = null;
        this.icon = null;
        
        this.init();
    }

    init() {
        this.button = document.getElementById('theme-toggle');
        if (!this.button) {
            console.warn('Theme toggle button not found');
            return;
        }

        this.icon = this.button.querySelector('.theme-toggle-icon');
        
        // Load saved theme or detect system preference
        this.loadTheme();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
    }

    setupEventListeners() {
        if (!this.button) return;

        // Theme toggle button click
        this.button.addEventListener('click', () => {
            this.cycleTheme();
        });

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                this.systemTheme = e.matches ? 'dark' : 'light';
                if (this.currentTheme === 'system') {
                    this.applyTheme('system');
                }
            });
            
            // Set initial system theme
            this.systemTheme = mediaQuery.matches ? 'dark' : 'light';
        }

        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    loadTheme() {
        const savedTheme = getStorageItem(THEME_STORAGE_KEY, 'system');
        
        if (this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = 'system';
        }
    }

    saveTheme() {
        setStorageItem(THEME_STORAGE_KEY, this.currentTheme);
    }

    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.currentTheme = this.themes[nextIndex];
        
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        
        // Announce theme change for accessibility
        this.announceThemeChange();
    }

    applyTheme(theme) {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        // Remove existing theme classes
        htmlElement.classList.remove('light', 'dark');
        bodyElement.classList.remove('light', 'dark');
        
        let effectiveTheme = theme;
        
        // Handle system theme
        if (theme === 'system') {
            effectiveTheme = this.systemTheme;
        }
        
        // Apply theme class
        if (effectiveTheme === 'dark') {
            htmlElement.classList.add('dark');
            bodyElement.classList.add('dark');
        } else {
            htmlElement.classList.add('light');
            bodyElement.classList.add('light');
        }
        
        // Update button icon and tooltip
        this.updateButtonAppearance(theme);
        
        // Dispatch theme change event
        this.dispatchThemeChangeEvent(theme, effectiveTheme);
    }

    updateButtonAppearance(theme) {
        if (!this.icon || !this.button) return;

        // Update icon based on current theme
        const iconClasses = {
            light: 'bi-sun',
            dark: 'bi-moon',
            system: 'bi-circle-half'
        };

        // Remove all possible icon classes
        Object.values(iconClasses).forEach(cls => {
            this.icon.classList.remove(cls);
        });

        // Add current icon class
        this.icon.classList.add(iconClasses[theme]);

        // Update tooltip
        const tooltips = {
            light: 'Switch to dark mode',
            dark: 'Switch to system mode',
            system: 'Switch to light mode'
        };

        this.button.setAttribute('title', tooltips[theme]);
        this.button.setAttribute('aria-label', tooltips[theme]);
    }

    announceThemeChange() {
        const themeNames = {
            light: 'Light mode',
            dark: 'Dark mode',
            system: 'System mode'
        };

        const announcement = `${themeNames[this.currentTheme]} activated`;
        
        // Create announcement for screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        
        document.body.appendChild(announcer);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }

    dispatchThemeChangeEvent(theme, effectiveTheme) {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: theme,
                effectiveTheme: effectiveTheme,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getEffectiveTheme() {
        return this.currentTheme === 'system' ? this.systemTheme : this.currentTheme;
    }

    setTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme();
    }

    // Static method to get theme preference without instantiating
    static getSystemTheme() {
        if (window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    }

    // Static method to detect if user prefers reduced motion
    static prefersReducedMotion() {
        if (window.matchMedia) {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
    }
}

// CSS class for screen reader only content
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
`;
document.head.appendChild(style);