import { useState, useEffect } from 'react';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  eventType: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  expectedDuration: string;
  expectedAttendees: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueState: string;
  venueZip: string;
  venueType: string;
  performanceType: string;
  setLength: string;
  soundSystem: string;
  techRequirements: string;
  budget: string;
  additionalServices: string[];
  specialRequests: string;
  howDidYouHear: string;
  previousEvents: string;
}

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

export function BookingWizard({ isOpen, onClose, onSubmit }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '', lastName: '', email: '', phone: '', company: '', title: '',
    eventType: '', eventName: '', eventDate: '', eventTime: '', expectedDuration: '', expectedAttendees: '',
    venueName: '', venueAddress: '', venueCity: '', venueState: '', venueZip: '', venueType: '',
    performanceType: '', setLength: '', soundSystem: '', techRequirements: '',
    budget: '', additionalServices: [], specialRequests: '', howDidYouHear: '', previousEvents: ''
  });

  const totalSteps = 5;

  // Clean up scroll blocking when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Don't block body scroll
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    } else {
      // Ensure body scroll is enabled
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, [isOpen]);

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', company: '', title: '',
      eventType: '', eventName: '', eventDate: '', eventTime: '', expectedDuration: '', expectedAttendees: '',
      venueName: '', venueAddress: '', venueCity: '', venueState: '', venueZip: '', venueType: '',
      performanceType: '', setLength: '', soundSystem: '', techRequirements: '',
      budget: '', additionalServices: [], specialRequests: '', howDidYouHear: '', previousEvents: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Contact Information';
      case 2: return 'Event Details';
      case 3: return 'Venue Information';
      case 4: return 'Performance Requirements';
      case 5: return 'Budget & Final Details';
      default: return 'Booking Details';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return 'bi-person-fill';
      case 2: return 'bi-calendar-event';
      case 3: return 'bi-geo-alt-fill';
      case 4: return 'bi-music-note-beamed';
      case 5: return 'bi-check-circle-fill';
      default: return 'bi-circle-fill';
    }
  };

  return (
    <div 
      className="modal-overlay show booking-modal-overlay"
      onClick={handleClose}
    >
      <div 
        className="bg-card rounded-4 shadow-lg animate-fade-in-up booking-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between booking-header-border">
          <div className="d-flex align-items-center">
            <div className="rounded-circle me-3 d-flex align-items-center justify-content-center booking-step-icon-wrapper">
              <i className={`bi ${getStepIcon()} booking-step-icon`}></i>
            </div>
            <div>
              <h4 className="mb-0 fw-bold booking-title">
                Book Gracie Kay
              </h4>
              <small className="booking-step-subtitle">
                Step {currentStep} of {totalSteps}: {getStepTitle()}
              </small>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-sm rounded-circle booking-close-btn"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-3" style={{flexShrink: 0}}>
          <div className="progress booking-progress-bg">
            <div 
              className="progress-bar booking-progress-bar"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`
              }}
            />
          </div>
          <div className="d-flex justify-content-between mt-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <small 
                key={i} 
                className={`booking-progress-step ${i + 1 <= currentStep ? 'active' : 'inactive'}`}
              >
                {i + 1}
              </small>
            ))}
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-4 overflow-auto booking-form-content">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="animate-slide-in">
                <h5 className="mb-4 fw-bold d-flex align-items-center booking-section-title">
                  <i className="bi bi-person-fill me-2 booking-section-icon" style={{color: 'var(--icon-adaptive-color)'}}></i>
                  Let's get to know you
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">First Name *</label>
                    <input type="text" className="form-control" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Last Name *</label>
                    <input type="text" className="form-control" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Email *</label>
                    <input type="email" className="form-control" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Phone *</label>
                    <input type="tel" className="form-control" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Company</label>
                    <input type="text" className="form-control" value={formData.company} onChange={(e) => updateFormData('company', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Title</label>
                    <input type="text" className="form-control" value={formData.title} onChange={(e) => updateFormData('title', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-slide-in">
                <h5 className="mb-4 fw-bold d-flex align-items-center booking-section-title">
                  <i className="bi bi-calendar-event me-2 booking-section-icon"></i>
                  Event Details
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Event Type *</label>
                    <select className="form-control" value={formData.eventType} onChange={(e) => updateFormData('eventType', e.target.value)} required>
                      <option value="">Select event type</option>
                      <option value="concert">Concert</option>
                      <option value="festival">Festival</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="private-party">Private Party</option>
                      <option value="charity">Charity Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Event Name</label>
                    <input type="text" className="form-control" value={formData.eventName} onChange={(e) => updateFormData('eventName', e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Event Date *</label>
                    <input type="date" className="form-control" value={formData.eventDate} onChange={(e) => updateFormData('eventDate', e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Start Time *</label>
                    <input type="time" className="form-control" value={formData.eventTime} onChange={(e) => updateFormData('eventTime', e.target.value)} required />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-slide-in">
                <h5 className="mb-4 fw-bold d-flex align-items-center booking-section-title">
                  <i className="bi bi-geo-alt-fill me-2 booking-section-icon"></i>
                  Venue Information
                </h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold booking-form-label">Venue Name *</label>
                    <input type="text" className="form-control" value={formData.venueName} onChange={(e) => updateFormData('venueName', e.target.value)} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold booking-form-label">Address *</label>
                    <input type="text" className="form-control" value={formData.venueAddress} onChange={(e) => updateFormData('venueAddress', e.target.value)} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold booking-form-label">City *</label>
                    <input type="text" className="form-control" value={formData.venueCity} onChange={(e) => updateFormData('venueCity', e.target.value)} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold booking-form-label">State *</label>
                    <input type="text" className="form-control" value={formData.venueState} onChange={(e) => updateFormData('venueState', e.target.value)} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold booking-form-label">ZIP</label>
                    <input type="text" className="form-control" value={formData.venueZip} onChange={(e) => updateFormData('venueZip', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-slide-in">
                <h5 className="mb-4 fw-bold d-flex align-items-center booking-section-title">
                  <i className="bi bi-music-note-beamed me-2 booking-section-icon"></i>
                  Performance Requirements
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Performance Type *</label>
                    <select className="form-control" value={formData.performanceType} onChange={(e) => updateFormData('performanceType', e.target.value)} required>
                      <option value="">Select performance type</option>
                      <option value="full-band">Full band</option>
                      <option value="acoustic">Acoustic</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold booking-form-label">Set Length *</label>
                    <select className="form-control" value={formData.setLength} onChange={(e) => updateFormData('setLength', e.target.value)} required>
                      <option value="">Select set length</option>
                      <option value="1-hour">1 hour</option>
                      <option value="2-hours">2 hours</option>
                      <option value="3-hours">3 hours</option>
                      <option value="3-plus-hours">3+ hours</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold booking-form-label">Technical Requirements</label>
                    <textarea className="form-control" rows={3} value={formData.techRequirements} onChange={(e) => updateFormData('techRequirements', e.target.value)} placeholder="Any specific technical requirements, stage setup, lighting, etc." />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-slide-in">
                <h5 className="mb-4 fw-bold d-flex align-items-center booking-section-title">
                  <i className="bi bi-check-circle-fill me-2 booking-section-icon"></i>
                  Budget & Final Details
                </h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold booking-form-label">Budget Range *</label>
                    <select className="form-control" value={formData.budget} onChange={(e) => updateFormData('budget', e.target.value)} required>
                      <option value="">Select budget range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-plus">$10,000+</option>
                      <option value="discuss">Prefer to discuss</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold d-block mb-3 booking-form-label">Additional Services</label>
                    <div className="row g-2">
                      {['Meet & Greet', 'Photo Opportunity', 'Custom Song Request', 'Sound Engineer', 'Lighting Design', 'Video Recording', 'Social Media Content'].map(service => (
                        <div key={service} className="col-md-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={formData.additionalServices.includes(service)} onChange={() => handleServiceToggle(service)} id={service.replace(/\s+/g, '')} />
                            <label className="form-check-label booking-form-label" htmlFor={service.replace(/\s+/g, '')}>{service}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold booking-form-label">Any special request or additional information</label>
                    <textarea className="form-control" rows={4} value={formData.specialRequests} onChange={(e) => updateFormData('specialRequests', e.target.value)} placeholder="Any special request or additional information..." />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer with Navigation */}
        <div className="p-4 border-top d-flex justify-content-between align-items-center booking-footer-border">
          <div>
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn booking-btn-prev">
                <i className="bi bi-arrow-left me-2"></i>Previous
              </button>
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            <small className="booking-step-counter">{currentStep} of {totalSteps}</small>
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn px-4 booking-btn-next">
                Next <i className="bi bi-arrow-right ms-2"></i>
              </button>
            ) : (
              <button type="submit" onClick={handleSubmit} className="btn px-4 booking-btn-next">
                <i className="bi bi-send me-2"></i>Submit Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}