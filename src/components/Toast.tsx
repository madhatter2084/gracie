import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  summary?: string;
  formData?: any;
}

export function Toast({ message, type, isVisible, onClose, duration = 5000, summary, formData }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-x-circle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'info':
        return '#3b82f6';
      default:
        return '#3b82f6';
    }
  };

  if (!isVisible) return null;

  // Enhanced verification notice with summary
  if (summary && formData) {
    return (
      <div className="toast-container">
        <div className={`toast verification-toast ${type} ${isVisible ? 'show' : ''}`} style={{ minWidth: '400px', maxWidth: '500px' }}>
          <div className="verification-toast-header d-flex align-items-center mb-3">
            <i 
              className={`bi ${getIcon()} me-3`} 
              style={{ color: getColor(), fontSize: '1.5rem' }}
            ></i>
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold" style={{ color: 'var(--card-foreground)' }}>
                Booking Request Submitted
              </h6>
              <small className="text-muted">Thank you for your interest!</small>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--muted-foreground)',
                border: 'none',
                padding: '4px'
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div className="verification-summary mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-person-fill me-2" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}></i>
              <small className="fw-semibold" style={{ color: 'var(--card-foreground)' }}>
                {formData.firstName} {formData.lastName}
              </small>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-calendar-event me-2" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}></i>
              <small style={{ color: 'var(--muted-foreground)' }}>
                {formData.eventType} • {formData.eventDate}
              </small>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}></i>
              <small style={{ color: 'var(--muted-foreground)' }}>
                {formData.venueName}, {formData.venueCity}
              </small>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-music-note-beamed me-2" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}></i>
              <small style={{ color: 'var(--muted-foreground)' }}>
                {formData.performanceType} • {formData.setLength}
              </small>
            </div>
          </div>
          
          <div className="verification-message p-3 rounded" style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}>
            <p className="mb-2 fw-semibold" style={{ color: 'var(--card-foreground)', fontSize: '0.9rem' }}>
              We'll get back to you within 24 hours with:
            </p>
            <ul className="mb-0 ps-3" style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
              <li>Availability confirmation</li>
              <li>Detailed quote and contract</li>
              <li>Next steps for your event</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Standard toast
  return (
    <div className="toast-container">
      <div className={`toast ${type} ${isVisible ? 'show' : ''}`}>
        <div className="d-flex align-items-center">
          <i 
            className={`bi ${getIcon()} me-3`} 
            style={{ color: getColor(), fontSize: '1.2rem' }}
          ></i>
          <div className="flex-grow-1">
            <p className="mb-0 fw-semibold" style={{ color: 'var(--card-foreground)' }}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm ms-3"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--muted-foreground)',
              border: 'none',
              padding: '4px'
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast notification hook for easy usage
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    summary?: string;
    formData?: any;
  }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', summary?: string, formData?: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type, isVisible: true, summary, formData };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Auto-remove after longer duration for verification notices
    const duration = summary ? 8000 : 5000;
    setTimeout(() => {
      setToasts(prevToasts => 
        prevToasts.map(toast => 
          toast.id === id ? { ...toast, isVisible: false } : toast
        )
      );
      
      // Remove from array after animation
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      }, 300);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
    
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 300);
  };

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => removeToast(toast.id)}
          summary={toast.summary}
          formData={toast.formData}
        />
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}