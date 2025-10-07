/**
 * Story Section Component
 * Social media style story posts
 */

import { STORY_POSTS } from '../utils/constants.js';

export class StorySection {
    constructor() {
        this.container = null;
        this.posts = STORY_POSTS;
    }

    async render() {
        this.container = document.getElementById('story');
        if (!this.container) {
            console.error('Story section container not found');
            return;
        }

        this.container.innerHTML = this.getStoryHTML();
        this.setupEventListeners();
    }

    getStoryHTML() {
        return `
            <div class="py-7 content-section">
                <div class="container">
                    <div class="text-center mb-5 animate-fade-in-up">
                        <h2 class="display-4 fw-bold story-section-title mb-4">
                            <i class="bi bi-book me-3" style="font-size: 3rem; color: var(--icon-adaptive-color);"></i>
                            My Story
                        </h2>
                        <p class="fs-5 story-section-subtitle">Moments, thoughts, and inspiration from my journey</p>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="story-grid">
                                ${this.posts.map((post, index) => this.getPostHTML(post, index)).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPostHTML(post, index) {
        const delay = `anim-delay-${index + 2}`;
        const isExpanded = post.isExpanded;
        const truncatedContent = this.truncateContent(post.content, 200);
        const needsReadMore = post.content.length > 200;

        return `
            <div class="story-post story-post-bg p-4 mb-4 animate-fade-in-up ${delay}" data-post-id="${post.id}">
                <!-- Post Header -->
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="story-post-avatar rounded-circle d-flex align-items-center justify-content-center fw-bold text-white">
                            ${post.avatar}
                        </div>
                        <div>
                            <div class="story-post-username fw-semibold">${post.username}</div>
                            <small class="story-post-meta">${post.time}</small>
                        </div>
                    </div>
                    <button class="btn story-post-menu-btn rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-three-dots"></i>
                    </button>
                </div>

                <!-- Post Content -->
                <div class="story-post-content mb-3" data-full-content="${post.content.replace(/"/g, '&quot;')}">
                    ${isExpanded ? post.content : truncatedContent}
                </div>

                ${needsReadMore ? `
                    <button class="story-read-more-btn mb-3" data-post-id="${post.id}">
                        ${isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                ` : ''}

                <!-- Tags -->
                <div class="mb-3">
                    ${post.tags.map(tag => `
                        <span class="story-tag me-2 mb-2">${tag}</span>
                    `).join('')}
                </div>

                <!-- Actions -->
                <div class="d-flex align-items-center justify-content-between story-action-border pt-3">
                    <div class="d-flex gap-4">
                        <button class="story-action-btn heart d-flex align-items-center gap-2">
                            <i class="bi bi-heart"></i>
                            <span>${this.formatNumber(post.likes)}</span>
                        </button>
                        <button class="story-action-btn accent d-flex align-items-center gap-2">
                            <i class="bi bi-chat"></i>
                            <span>${post.comments}</span>
                        </button>
                        <button class="story-action-btn accent d-flex align-items-center gap-2">
                            <i class="bi bi-share"></i>
                            <span>${post.shares}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Read more/less buttons
        const readMoreButtons = this.container.querySelectorAll('.story-read-more-btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = parseInt(button.getAttribute('data-post-id'));
                this.togglePostExpansion(postId);
            });
        });

        // Post action buttons
        const actionButtons = this.container.querySelectorAll('.story-action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleActionClick(button, e);
            });
        });
    }

    togglePostExpansion(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        post.isExpanded = !post.isExpanded;
        
        const postElement = this.container.querySelector(`[data-post-id="${postId}"]`);
        const contentElement = postElement?.querySelector('.story-post-content');
        const buttonElement = postElement?.querySelector('.story-read-more-btn');

        if (contentElement && buttonElement) {
            if (post.isExpanded) {
                contentElement.textContent = post.content;
                buttonElement.textContent = 'Read Less';
            } else {
                contentElement.textContent = this.truncateContent(post.content, 200);
                buttonElement.textContent = 'Read More';
            }
        }
    }

    handleActionClick(button, event) {
        event.preventDefault();
        
        if (button.classList.contains('heart')) {
            // Toggle heart and animate
            const icon = button.querySelector('i');
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                button.style.color = '#e91e63';
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                button.style.color = '';
            }
        }
    }

    truncateContent(content, maxLength) {
        if (content.length <= maxLength) return content;
        return content.substr(0, maxLength) + '...';
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    getState() {
        return {
            rendered: !!this.container,
            postsCount: this.posts.length
        };
    }
}