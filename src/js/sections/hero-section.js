/**
 * Hero Section Component
 * Main landing section with title, description, and call-to-action
 */

import { SPOTIFY_TRACK } from '../utils/constants.js';
import { createElement } from '../utils/helpers.js';

export class HeroSection {
    constructor(scrollToSection) {
        this.scrollToSection = scrollToSection;
        this.container = null;
    }

    async render() {
        this.container = document.getElementById('hero');
        if (!this.container) {
            console.error('Hero section container not found');
            return;
        }

        this.container.innerHTML = this.getHeroHTML();
        this.setupEventListeners();
    }

    getHeroHTML() {
        return `
            <div class="hero-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="text-center text-md-start">
                                <!-- Hero Text Overlay -->
                                <div class="hero-text-overlay rounded-5 p-5 mb-5 animate-fade-in-up">
                                    <!-- Hero Content -->
                                    <div class="hero-content">
                                        <!-- Main Title -->
                                        <h1 class="hero-title hero-title-responsive-lg fw-bold mb-4 animate-fade-in-up">
                                            Gracie Kay
                                        </h1>
                                        
                                        <!-- Subtitle -->
                                        <h2 class="hero-subtitle hero-subtitle-responsive-lg script-font hero-subtitle-light-black mb-4 animate-fade-in-up anim-delay-1">
                                            Life Has No Script
                                        </h2>
                                        
                                        <!-- Description -->
                                        <div class="hero-description-container animate-fade-in-up hero-description-container-delay">
                                            <h2 class="hero-description hero-description-responsive hero-description-h2 mb-5">
                                                From competitive swimming to creating music that moves hearts. 
                                                Every note tells a story, every song is a new chapter. 
                                                Welcome to my unscripted journey. ✨
                                            </h2>
                                        </div>
                                        
                                        <!-- Action Buttons -->
                                        <div class="hero-buttons-container d-flex flex-column flex-md-row gap-3 mb-5 animate-fade-in-up anim-delay-3">
                                            <button class="btn btn-lg hero-btn-primary rounded-pill px-5 py-3" data-scroll-to="music">
                                                <i class="bi bi-music-note-beamed me-2"></i>
                                                Listen to My Music
                                            </button>
                                            <button class="btn btn-lg hero-btn-secondary rounded-pill px-5 py-3" data-scroll-to="about">
                                                <i class="bi bi-arrow-down-circle me-2"></i>
                                                Discover My Journey
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Spotify Player -->
                                <div class="hero-music-player animate-fade-in-up anim-delay-4">
                                    <div class="card border-0 shadow-lg rounded-5 social-hover mb-5">
                                        <div class="card-body p-4 text-center">
                                            <div class="mb-3">
                                                <i class="bi-spotify spotify-icon"></i>
                                            </div>
                                            <h4 class="card-title fw-bold mb-3">Now Playing</h4>
                                            <p class="card-text mb-4">Stream my latest release "Undercover"</p>
                                            
                                            <!-- Spotify Embed Container -->
                                            <div class="hero-spotify-container">
                                                <div class="iframe-container hero-spotify-compact">
                                                    <div class="iframe-loading-overlay">
                                                        <div class="iframe-loading-content">
                                                            <div class="iframe-loading-spinner">
                                                                <div class="iframe-spinner-ring"></div>
                                                            </div>
                                                            <div class="iframe-loading-text">
                                                                <div class="iframe-loading-title">Loading Spotify Player...</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <iframe 
                                                        class="iframe-element iframe-hidden hero-spotify-responsive w-100" 
                                                        src="https://open.spotify.com/embed/track/05NQHtHM970DIZPR0fabB9?utm_source=generator&theme=0" 
                                                        frameborder="0" 
                                                        allowfullscreen="" 
                                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                                        loading="lazy">
                                                    </iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Social Links -->
                                <div class="hero-social-container text-center animate-fade-in-up anim-delay-5">
                                    <h5 class="mb-4 fw-medium">Connect with me</h5>
                                    <div class="hero-social-links d-flex justify-content-center gap-4">
                                        <a href="${SPOTIFY_TRACK.spotifyUrl}" class="hero-social-link hero-social-spotify" target="_blank" rel="noopener noreferrer" title="Listen on Spotify">
                                            <i class="bi bi-spotify"></i>
                                        </a>
                                        <a href="${SPOTIFY_TRACK.appleMusicUrl}" class="hero-social-link hero-social-apple" target="_blank" rel="noopener noreferrer" title="Listen on Apple Music">
                                            <i class="bi bi-music-note"></i>
                                        </a>
                                        <a href="#" class="hero-social-link hero-social-instagram" target="_blank" rel="noopener noreferrer" title="Follow on Instagram">
                                            <i class="bi bi-instagram"></i>
                                        </a>
                                        <a href="#" class="hero-social-link hero-social-tiktok" target="_blank" rel="noopener noreferrer" title="Follow on TikTok">
                                            <i class="bi bi-tiktok"></i>
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Scroll Indicator -->
                                <div class="hero-scroll-indicator text-center mt-5 animate-fade-in-up anim-delay-6">
                                    <button class="btn border-0 hero-scroll-btn" data-scroll-to="about" title="Scroll to learn more">
                                        <i class="bi bi-chevron-down animate-bounce"></i>
                                    </button>
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

        // Handle iframe loading
        const iframe = this.container.querySelector('.iframe-element');
        const loadingOverlay = this.container.querySelector('.iframe-loading-overlay');

        if (iframe && loadingOverlay) {
            // Show iframe when loaded
            iframe.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        iframe.classList.remove('iframe-hidden');
                        iframe.classList.add('iframe-visible');
                    }, 300);
                }, 1000); // Give it a moment to load content
            });

            // Handle iframe error
            iframe.addEventListener('error', () => {
                console.warn('Spotify iframe failed to load');
                loadingOverlay.innerHTML = `
                    <div class="iframe-loading-content">
                        <div class="iframe-loading-text">
                            <div class="iframe-loading-title">
                                <i class="bi bi-exclamation-triangle me-2"></i>
                                Unable to load player
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Handle social link clicks with analytics
        const socialLinks = this.container.querySelectorAll('.hero-social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link);
                console.log(`Social link clicked: ${platform}`);
                
                // Add click analytics here if needed
                if (platform && window.gtag) {
                    window.gtag('event', 'social_click', {
                        'platform': platform,
                        'location': 'hero'
                    });
                }
            });
        });

        // Scroll indicator animation
        const scrollIndicator = this.container.querySelector('.hero-scroll-indicator .bi-chevron-down');
        if (scrollIndicator) {
            // Add continuous bounce animation
            setInterval(() => {
                scrollIndicator.classList.remove('animate-bounce');
                requestAnimationFrame(() => {
                    scrollIndicator.classList.add('animate-bounce');
                });
            }, 3000);
        }
    }

    getSocialPlatform(linkElement) {
        if (linkElement.classList.contains('hero-social-spotify')) return 'spotify';
        if (linkElement.classList.contains('hero-social-apple')) return 'apple-music';
        if (linkElement.classList.contains('hero-social-instagram')) return 'instagram';
        if (linkElement.classList.contains('hero-social-tiktok')) return 'tiktok';
        return 'unknown';
    }

    // Update Spotify track information
    updateSpotifyTrack(trackInfo) {
        if (!this.container) return;

        const iframe = this.container.querySelector('.iframe-element');
        if (iframe && trackInfo.spotifyEmbedUrl) {
            iframe.src = trackInfo.spotifyEmbedUrl;
        }

        // Update social links
        const spotifyLink = this.container.querySelector('.hero-social-spotify');
        if (spotifyLink && trackInfo.spotifyUrl) {
            spotifyLink.href = trackInfo.spotifyUrl;
        }

        const appleMusicLink = this.container.querySelector('.hero-social-apple');
        if (appleMusicLink && trackInfo.appleMusicUrl) {
            appleMusicLink.href = trackInfo.appleMusicUrl;
        }
    }

    // Animate hero elements in sequence
    animateIn() {
        if (!this.container) return;

        const animatedElements = this.container.querySelectorAll('.animate-fade-in-up');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fade-in-up');
            }, index * 200);
        });
    }

    // Get hero section state
    getState() {
        return {
            rendered: !!this.container,
            spotifyLoaded: this.container?.querySelector('.iframe-visible') !== null,
            socialLinksCount: this.container?.querySelectorAll('.hero-social-link').length || 0
        };
    }
}