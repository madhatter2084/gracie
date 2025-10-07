import { useState } from 'react';

interface IframeWithLoadingProps {
  src: string;
  title: string;
  className?: string;
  height?: number | string;
  width?: number | string;
  allow?: string;
  loading?: 'lazy' | 'eager';
}

export function IframeWithLoading({
  src,
  title,
  className = '',
  height = 352,
  width = '100%',
  allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
  loading = 'lazy'
}: IframeWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Smart height calculation for cropping white space
  const getOptimalHeight = () => {
    const heightNum = parseInt(height.toString());
    
    // Mobile compact: Use a larger iframe but crop to container
    if (heightNum <= 80) {
      return '200px'; // Much larger iframe content to crop white space
    }
    // Tablet compact: Medium cropping
    else if (heightNum <= 152) {
      return '250px'; // Larger iframe content
    }
    // Desktop: Minimal cropping
    else {
      return `${Math.round(heightNum * 1.2)}px`; // 20% larger content
    }
  };

  return (
    <div 
      className={`iframe-container ${className}`} 
      style={{ 
        height, 
        width,
        overflow: 'hidden',
        background: 'var(--card)',
        borderRadius: '1.5rem',
        position: 'relative',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Simple Loading State */}
      {isLoading && (
        <div className="iframe-loading-overlay">
          <div className="iframe-loading-content">
            <div className="iframe-loading-spinner">
              <div className="iframe-spinner-ring"></div>
            </div>
            <div className="iframe-loading-text">
              <h4 className="iframe-loading-title">Loading Music Player...</h4>
            </div>
          </div>
        </div>
      )}

      {/* Iframe Wrapper for Smart Cropping */}
      <div 
        className="iframe-crop-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Actual Iframe - Intelligently sized to crop white space */}
        <iframe
          src={src}
          title={title}
          width="100%"
          height={getOptimalHeight()}
          frameBorder="0"
          allow={allow}
          loading={loading}
          onLoad={handleLoad}
          className={`iframe-element ${isLoading ? 'iframe-hidden' : 'iframe-visible'}`}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            borderRadius: '1.5rem',
            background: 'transparent',
            border: 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
    </div>
  );
}