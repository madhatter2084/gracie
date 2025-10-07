import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  icon: string;
}

interface InteractiveGalleryProps {
  items: GalleryItem[];
}

export function InteractiveGallery({ items }: InteractiveGalleryProps) {
  const [isSlideShowOpen, setIsSlideShowOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openSlideShow = (index: number) => {
    setCurrentSlide(index);
    setIsSlideShowOpen(true);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
  };

  const closeSlideShow = () => {
    setIsSlideShowOpen(false);
    // Restore background scroll
    document.body.style.overflow = 'auto';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSlideShowOpen) return;
      
      if (e.key === 'Escape') {
        closeSlideShow();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    if (isSlideShowOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Cleanup: restore scroll when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isSlideShowOpen, items.length]);

  return (
    <>
      {/* Gallery Grid - Fixed 2x2 Layout */}
      <div className="gallery-grid">
        {items.map((item, index) => (
          <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
            <div 
              className="gallery-item social-hover card shadow-lg h-100 border-0 rounded-5 overflow-hidden gallery-item-card" 
              onClick={() => openSlideShow(index)}
            >
              <div className="position-relative overflow-hidden">
                <ImageWithFallback 
                  src={item.src}
                  alt={item.alt}
                  className="card-img-top gallery-image"
                />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="text-center text-white">
                    <i className="bi bi-play-circle gallery-play-icon"></i>
                    <p className="mb-0 fw-bold">View Gallery</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-center">
                <div className="mb-3">
                  <i className={`${item.icon} gallery-card-icon`}></i>
                </div>
                <h5 className="card-title fw-bold mb-2 gallery-card-title">
                  {item.title}
                </h5>
                <p className="card-text mb-0 gallery-card-text">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slideshow Modal - Fixed and Centered */}
      {isSlideShowOpen && (
        <div 
          className="modal-overlay show slideshow-modal" 
          onClick={closeSlideShow}
        >
          <div 
            className="position-relative bg-black rounded-4 overflow-hidden animate-fade-in-up slideshow-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeSlideShow}
              className="position-absolute top-0 end-0 m-3 btn btn-sm rounded-circle social-button slideshow-close-btn"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="position-absolute start-0 top-50 translate-middle-y ms-3 btn social-button slideshow-nav-btn"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              onClick={nextSlide}
              className="position-absolute end-0 top-50 translate-middle-y me-3 btn social-button slideshow-nav-btn"
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Current Image Container - Scrollable */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center overflow-auto slideshow-image-container">
              <ImageWithFallback 
                src={items[currentSlide].src}
                alt={items[currentSlide].alt}
                className="object-fit-contain w-100 h-100 slideshow-image"
              />
            </div>

            {/* Image Info */}
            <div className="position-absolute bottom-0 start-0 end-0 p-4 text-white slideshow-info">
              <h5 className="mb-2 fw-bold d-flex align-items-center">
                <i className={`${items[currentSlide].icon} me-2 slideshow-info-icon`}></i>
                {items[currentSlide].title}
              </h5>
              <p className="mb-1">{items[currentSlide].description}</p>
              <small className="opacity-75">
                {currentSlide + 1} of {items.length}
              </small>
            </div>

            {/* Thumbnail Strip */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-2 p-2 rounded-pill slideshow-thumbs">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`btn-sm rounded-circle border-0 slideshow-thumb ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}