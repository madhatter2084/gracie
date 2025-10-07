/**
 * Gallery Component
 * Interactive image gallery with modal slideshow
 */

import { GALLERY_ITEMS } from '../utils/constants.js';

export class Gallery {
    constructor() {
        this.items = GALLERY_ITEMS;
        this.currentIndex = 0;
        this.modal = null;
        this.isOpen = false;
    }

    open(index = 0) {
        this.currentIndex = index;
        this.isOpen = true;
        
        this.modal = document.getElementById('gallery-modal');
        if (!this.modal) return;

        this.render();
        this.modal.style.display = 'flex';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    render() {
        if (!this.modal) return;

        const currentItem = this.items[this.currentIndex];
        
        this.modal.innerHTML = `
            <div class="slideshow-container">
                <!-- Close Button -->
                <button class="slideshow-close-btn position-absolute top-0 end-0 m-3 rounded-circle" 
                        id="gallery-close">
                    <i class="bi bi-x"></i>
                </button>

                <!-- Navigation Buttons -->
                ${this.items.length > 1 ? `
                    <button class="slideshow-nav-btn position-absolute start-0 top-50 translate-middle-y ms-3 rounded-circle" 
                            id="gallery-prev">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <button class="slideshow-nav-btn position-absolute end-0 top-50 translate-middle-y me-3 rounded-circle" 
                            id="gallery-next">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                ` : ''}

                <!-- Main Image -->
                <div class="slideshow-image-container d-flex align-items-center justify-content-center">
                    <img src="${currentItem.url}" 
                         alt="${currentItem.title}" 
                         class="slideshow-image">
                </div>

                <!-- Image Info -->
                <div class="slideshow-info position-absolute bottom-0 start-0 end-0 p-4 text-white">
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <i class="bi bi-camera slideshow-info-icon"></i>
                        <div>
                            <h4 class="mb-1">${currentItem.title}</h4>
                            <p class="mb-0">${currentItem.description}</p>
                        </div>
                    </div>
                </div>

                <!-- Thumbnails -->
                ${this.items.length > 1 ? `
                    <div class="slideshow-thumbs position-absolute start-50 translate-middle-x rounded-pill px-3 py-2 d-flex gap-2">
                        ${this.items.map((_, index) => `
                            <button class="slideshow-thumb rounded-circle ${index === this.currentIndex ? 'active' : ''}" 
                                    data-index="${index}"></button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.modal) return;

        // Close button
        const closeBtn = this.modal.querySelector('#gallery-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Navigation buttons
        const prevBtn = this.modal.querySelector('#gallery-prev');
        const nextBtn = this.modal.querySelector('#gallery-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previous());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // Thumbnail navigation
        const thumbs = this.modal.querySelectorAll('.slideshow-thumb');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.getAttribute('data-index'));
                this.goTo(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleKeydown(e) {
        if (!this.isOpen) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previous();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.next();
                break;
            case 'Escape':
                e.preventDefault();
                this.close();
                break;
        }
    }

    previous() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
        this.render();
    }

    next() {
        this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
        this.render();
    }

    goTo(index) {
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            this.render();
        }
    }

    getState() {
        return {
            isOpen: this.isOpen,
            currentIndex: this.currentIndex,
            itemsCount: this.items.length
        };
    }
}