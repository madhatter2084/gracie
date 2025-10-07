/**
 * Spotify Player Component
 * Custom Spotify player with fallback
 */

import { SPOTIFY_TRACK } from '../utils/constants.js';

export class SpotifyPlayer {
    constructor(container) {
        this.container = container;
        this.trackInfo = SPOTIFY_TRACK;
        this.audioElement = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        
        this.init();
    }

    init() {
        if (!this.container) return;

        this.render();
        this.setupEventListeners();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = this.getPlayerHTML();
        this.setupAudioElement();
    }

    getPlayerHTML() {
        return `
            <div class="spotify-player-container">
                <!-- Desktop Player -->
                <div class="d-none d-md-block">
                    <div class="spotify-player-card">
                        <!-- Player Header -->
                        <div class="spotify-player-header">
                            <div class="spotify-album-art">
                                <img src="${this.trackInfo.albumArt}" 
                                     alt="${this.trackInfo.name}" 
                                     class="spotify-album-image">
                            </div>
                            <div class="spotify-song-info">
                                <div class="spotify-song-title">${this.trackInfo.name}</div>
                                <div class="spotify-artist-name">${this.trackInfo.artist}</div>
                                <div class="spotify-preview-badge">
                                    <span>Preview</span>
                                </div>
                            </div>
                            <div class="spotify-logo">
                                <i class="bi bi-spotify"></i>
                            </div>
                        </div>

                        <!-- Player Controls -->
                        <div class="spotify-player-controls">
                            <div class="spotify-control-buttons">
                                <button class="spotify-btn spotify-btn-secondary" id="spotify-prev">
                                    <i class="bi bi-skip-backward"></i>
                                </button>
                                <button class="spotify-btn spotify-btn-primary" id="spotify-play">
                                    <i class="bi bi-play-circle"></i>
                                </button>
                                <button class="spotify-btn spotify-btn-secondary" id="spotify-next">
                                    <i class="bi bi-skip-forward"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Progress Bar -->
                        <div class="spotify-progress-container mt-3">
                            <div class="spotify-progress-info d-flex align-items-center gap-3">
                                <span class="spotify-time-current">0:00</span>
                                <div class="spotify-progress-bar-container flex-grow-1">
                                    <div class="spotify-progress-bar" id="spotify-progress" style="width: 0%"></div>
                                </div>
                                <span class="spotify-time-total">0:30</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Compact Player -->
                <div class="spotify-mobile-player d-md-none">
                    <div class="spotify-compact-card">
                        <div class="spotify-compact-header">
                            <div class="spotify-compact-album">
                                <img src="${this.trackInfo.albumArt}" 
                                     alt="${this.trackInfo.name}" 
                                     class="spotify-compact-image">
                            </div>
                            <div class="spotify-compact-info">
                                <div class="spotify-compact-title">${this.trackInfo.name}</div>
                                <div class="spotify-compact-artist">${this.trackInfo.artist}</div>
                            </div>
                            <button class="spotify-compact-play" id="spotify-play-mobile">
                                <i class="bi bi-play-circle-fill"></i>
                            </button>
                        </div>
                        <div class="spotify-compact-progress" id="spotify-progress-mobile">
                            <div class="spotify-compact-progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>

                <!-- Hidden Audio Element -->
                <audio id="spotify-audio" preload="none">
                    <source src="${this.trackInfo.previewUrl || ''}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    }

    setupAudioElement() {
        this.audioElement = this.container.querySelector('#spotify-audio');
        if (!this.audioElement) return;

        this.audioElement.addEventListener('loadedmetadata', () => {
            this.duration = this.audioElement.duration;
            this.updateTimeDisplay();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateProgress();
        });

        this.audioElement.addEventListener('ended', () => {
            this.stop();
        });

        this.audioElement.addEventListener('error', () => {
            console.warn('Audio playback error - preview not available');
            this.showPlaybackError();
        });
    }

    setupEventListeners() {
        if (!this.container) return;

        // Desktop play button
        const playBtn = this.container.querySelector('#spotify-play');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlayback());
        }

        // Mobile play button
        const playBtnMobile = this.container.querySelector('#spotify-play-mobile');
        if (playBtnMobile) {
            playBtnMobile.addEventListener('click', () => this.togglePlayback());
        }

        // Progress bar click
        const progressContainer = this.container.querySelector('.spotify-progress-bar-container');
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                this.seek(percentage);
            });
        }
    }

    togglePlayback() {
        if (!this.audioElement) {
            this.openSpotify();
            return;
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (!this.audioElement || !this.trackInfo.previewUrl) {
            this.openSpotify();
            return;
        }

        this.audioElement.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButtons();
        }).catch((error) => {
            console.warn('Playback failed:', error);
            this.openSpotify();
        });
    }

    pause() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updatePlayButtons();
        }
    }

    stop() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.isPlaying = false;
            this.currentTime = 0;
            this.updatePlayButtons();
            this.updateProgress();
        }
    }

    seek(percentage) {
        if (this.audioElement && this.duration > 0) {
            this.audioElement.currentTime = percentage * this.duration;
        }
    }

    updatePlayButtons() {
        const playButtons = this.container.querySelectorAll('#spotify-play, #spotify-play-mobile');
        playButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                if (this.isPlaying) {
                    icon.className = icon.className.includes('mobile') ? 'bi bi-pause-circle-fill' : 'bi bi-pause-circle';
                } else {
                    icon.className = icon.className.includes('mobile') ? 'bi bi-play-circle-fill' : 'bi bi-play-circle';
                }
            }
        });
    }

    updateProgress() {
        if (this.duration === 0) return;

        const percentage = (this.currentTime / this.duration) * 100;
        
        const progressBars = this.container.querySelectorAll('#spotify-progress, .spotify-compact-progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = `${percentage}%`;
        });

        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        const currentTimeElement = this.container.querySelector('.spotify-time-current');
        const totalTimeElement = this.container.querySelector('.spotify-time-total');

        if (currentTimeElement) {
            currentTimeElement.textContent = this.formatTime(this.currentTime);
        }

        if (totalTimeElement) {
            totalTimeElement.textContent = this.formatTime(this.duration);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showPlaybackError() {
        const playButtons = this.container.querySelectorAll('#spotify-play, #spotify-play-mobile');
        playButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.className = 'bi bi-exclamation-circle';
                button.title = 'Preview not available - Click to open Spotify';
            }
        });
    }

    openSpotify() {
        window.open(this.trackInfo.spotifyUrl, '_blank', 'noopener,noreferrer');
        
        // Analytics
        if (window.gtag) {
            window.gtag('event', 'spotify_redirect', {
                'track_name': this.trackInfo.name,
                'artist': this.trackInfo.artist
            });
        }
    }

    updateTrack(trackInfo) {
        this.trackInfo = { ...this.trackInfo, ...trackInfo };
        this.render();
    }

    getState() {
        return {
            isPlaying: this.isPlaying,
            currentTime: this.currentTime,
            duration: this.duration,
            trackInfo: this.trackInfo
        };
    }
}