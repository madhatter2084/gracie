import { useState, useEffect } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { InteractiveGallery } from './components/InteractiveGallery';
import { BookingWizard } from './components/BookingWizard';
import { useToast } from './components/Toast';
import { HeroSection } from './components/sections/HeroSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { StorySection } from './components/sections/StorySection';
import { SocialMediaSection } from './components/sections/SocialMediaSection';
import { FooterSection } from './components/sections/FooterSection';
import { GALLERY_ITEMS } from './components/constants';
import GracieKayLogo from './imports/GracieKayLogo';
import heroBackgroundImage from 'figma:asset/335fd537760d909db2eb97bbf9832f0601ff582f.png';
import beachUmbrellaImage from 'figma:asset/b1338ce63939661dd32d5e281c63c28690c0f36e.png';
import imgDkModeBg1 from 'figma:asset/bd29471e0ea4611e054140a8cbc50af76a82952e.png';
import imgUndercoverSingleCover1 from 'figma:asset/7c4df68a4337d179507ba05e80902128911a809f.png';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const { showToast, ToastContainer } = useToast();

  // Scroll function for navigation with active section tracking
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
      
      // Use native scrollIntoView which should respect scroll-padding-top
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'story', 'music', 'contact'];
      const scrollPosition = window.scrollY + 190; // Increased offset to match generous navigation spacing

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle booking submission
  const handleBookingSubmit = (formData: any) => {
    console.log('Booking submitted:', formData);
    showToast(
      `Thanks ${formData.firstName}! Your booking request has been submitted.`,
      'success',
      'Booking Summary',
      formData
    );
    setIsBookingOpen(false);
  };

  // Page loading and fade-in effect
  useEffect(() => {
    // Simplified loading with shorter duration to prevent timeouts
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Immediate fade-in after loading completes
      setTimeout(() => {
        setIsPageVisible(true);
      }, 50);
    }, 800); // Reduced from 1200ms to 800ms

    return () => clearTimeout(loadingTimer);
  }, []);

  // Clean up any potential scroll blocking
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'bi-house' },
    { id: 'about', label: 'Journey', icon: 'bi-map' },
    { id: 'story', label: 'Story', icon: 'bi-book' },
    { id: 'music', label: 'Music', icon: 'bi-music-note' },
    { id: 'contact', label: 'Book', icon: 'bi-calendar-check' }
  ];

  return (
    <div className="app-wrapper">
      {/* Page Loading Animation */}
      {isLoading && (
        <div className="page-loading-overlay">
          <div className="page-loading-content">
            {/* Logo */}
            <div className="page-loading-logo">
              <GracieKayLogo />
            </div>
            
            {/* Loading Spinner */}
            <div className="page-loading-spinner">
              <div className="page-spinner-ring"></div>
            </div>
            
            {/* Loading Text */}
            <div className="page-loading-text">
              <h3 className="page-loading-title">Gracie Kay</h3>
              <p className="page-loading-subtitle">Life Has No Script</p>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Hero Background with Gracie Kay Portrait - Outside fade wrapper */}
      <div className="hero-bg-fixed">
        <img 
          src={heroBackgroundImage}
          alt="Gracie Kay artistic portrait"
          className="w-100 h-100 object-fit-cover hero-bg-image"
          loading="eager"
          decoding="async"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
      </div>

      {/* Theme Switcher - Outside fade wrapper to maintain fixed positioning */}
      <ThemeSwitcher />

      {/* Main Content with Fade-in */}
      <div className={`main-app-content ${isPageVisible ? 'page-fade-visible' : 'page-fade-hidden'}`}>
        {/* Toast Container */}
        <ToastContainer />

      {/* Navigation Bar with Proper Theme Switching */}
      <nav className="position-fixed w-100 top-0 main-nav">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Logo/Brand with SVG - Bigger Size */}
            <a 
              href="#hero"
              className="nav-logo-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
            >
              <div className="nav-logo">
                <GracieKayLogo />
              </div>
            </a>
            
            {/* Desktop Navigation Links */}
            <div className="d-none d-lg-flex align-items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <i className={`${item.icon} ${item.id === 'hero' ? '' : 'me-2'}`}></i>
                  {item.id !== 'hero' && item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="d-lg-none btn border-0 mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="d-lg-none mt-3 p-3 mobile-nav-menu">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Booking Wizard Modal */}
      {isBookingOpen && (
        <BookingWizard 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection scrollToSection={scrollToSection} />
        </section>

        {/* Interactive Timeline Section */}
        <section id="about">
          <TimelineSection scrollToSection={scrollToSection} />
        </section>

        {/* Story Section */}
        <section id="story">
          <StorySection />
        </section>

        {/* Music Section */}
        <section id="music" className="py-7 content-section music-section-backdrop">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-end mb-5 animate-fade-in-up">
                  <h2 className="display-4 mb-4 fw-bold music-section-title text-center text-md-end">
                    <i className="bi bi-vinyl-fill me-3" style={{fontSize: '3rem', color: 'var(--icon-adaptive-color)'}}></i>
                    The Music
                  </h2>
                  <p className="fs-5 music-section-desc mb-4 text-center text-md-end" style={{color: 'var(--foreground)'}}>Listen to the soundtrack of my journey</p>
                  {/* Beach Umbrella Images */}
                  <div className="d-flex justify-content-center justify-content-lg-end">
                    <div className="d-flex flex-column flex-md-row gap-3">
                      <ImageWithFallback 
                        src={imgDkModeBg1}
                        alt="Gracie Kay"
                        className="rounded-5 shadow-lg music-header-image d-block"
                      />
                      <ImageWithFallback 
                        src={beachUmbrellaImage}
                        alt="Gracie Kay with beach umbrella"
                        className="rounded-5 shadow-lg music-header-image d-block"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Streaming Platform Cards - CSS Grid Layout */}
                <div className="streaming-platform-grid mb-5">
                  <div className="animate-fade-in-up anim-delay-03">
                    <div className="card h-100 border-0 shadow-lg rounded-5 social-hover music-platform-card">
                      <div className="card-body p-5">
                        <div className="text-center mb-4">
                          <i className="bi bi-spotify" style={{fontSize: '2.5rem', color: '#1DB954'}}></i>
                        </div>
                        <h4 className="card-title fw-bold text-center mb-3 music-platform-title">
                          More on Spotify
                        </h4>
                        <p className="card-text text-center mb-4 music-platform-description">
                          Explore my full discography and latest releases
                        </p>
                        <div className="text-center">
                          <a href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow" 
                             className="btn btn-lg border-0 rounded-pill fw-semibold social-button px-4 py-3 music-platform-btn-spotify" 
                             target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-play-circle me-2"></i>Open Spotify
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="animate-fade-in-up anim-delay-04">
                    <div className="card h-100 border-0 shadow-lg rounded-5 social-hover music-platform-card">
                      <div className="card-body p-5">
                        <div className="text-center mb-4">
                          <i className="bi bi-music-note" style={{fontSize: '2.5rem', color: '#FA233B'}}></i>
                        </div>
                        <h4 className="card-title fw-bold text-center mb-3 music-platform-title">
                          Apple Music
                        </h4>
                        <p className="card-text text-center mb-4 music-platform-description">
                          Also available on Apple Music and other platforms
                        </p>
                        <div className="text-center">
                          <a href="https://music.apple.com/ca/song/undercover/1822967268" 
                             className="btn btn-lg border-0 rounded-pill fw-semibold social-button px-4 py-3 music-platform-btn-apple"
                             target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-play-circle me-2"></i>Listen on Apple Music
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Testimonial Quote */}
                <div className="text-center animate-fade-in-up anim-delay-05">
                  <div className="card border-0 shadow-lg rounded-5 social-hover music-testimonial-card">
                    <div className="card-body p-5">
                      <div className="row align-items-center">
                        {/* Image on the left */}
                        <div className="col-md-5 mb-4 mb-md-0">
                          <ImageWithFallback 
                            src={imgUndercoverSingleCover1}
                            alt="Gracie Kay with umbrella"
                            className="w-100 rounded-4 shadow"
                            style={{maxWidth: '400px'}}
                          />
                        </div>
                        
                        {/* Text content on the right */}
                        <div className="col-md-7">
                          <div className="mb-4">
                            <i className="bi bi-quote animate-pulse" style={{fontSize: '3rem', color: 'var(--accent)'}}></i>
                          </div>
                          <blockquote className="mb-4">
                            <p className="fst-italic fw-light mb-0 music-testimonial-text">
                              "I don't want to reject the concept of building my self-confidence and chasing my potential out of this programmed fear of 'what if it doesn't work out' because what if it does?"
                            </p>
                          </blockquote>
                          <footer className="blockquote-footer">
                            <small className="fw-semibold music-testimonial-footer">
                              — A moment of discovery
                            </small>
                          </footer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="py-7 content-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                {/* Header Section */}
                <div className="text-center mb-5 animate-fade-in-up">
                  <div className="mb-4">
                    <i className="bi bi-check-circle-fill me-3" style={{fontSize: '2.5rem', color: 'var(--icon-adaptive-color)'}}></i>
                    <h1 className="display-4 fw-bold d-inline contact-header-title">
                      Book Gracie Kay
                    </h1>
                  </div>

                </div>
                
                {/* Main Booking Card */}
                <div className="card border-0 shadow-lg rounded-5 social-hover animate-fade-in-up contact-main-card anim-delay-02">
                  <div className="card-body p-5 text-center">
                    {/* Music Icon and Title */}
                    <div className="mb-5">
                      <div className="mb-4">
                        <i className="bi bi-music-note" style={{fontSize: '4rem', color: 'var(--accent)'}}></i>
                      </div>
                      <h3 className="fw-bold mb-3 contact-card-title">
                        Professional Artist Booking
                      </h3>
                      <p className="mb-0 contact-card-description">
                        From intimate acoustic sets to full performances, let's discuss how we can make your event unforgettable.
                      </p>
                    </div>

                    {/* Booking Process Timeline */}
                    <div className="booking-timeline-container mb-5">
                      <div className="booking-timeline">
                        {/* Step 1: Inquiry */}
                        <div className="timeline-step">
                          <div className="timeline-icon-container">
                            <div className="timeline-icon">
                              <i className="bi bi-chat-dots" style={{fontSize: '1.5rem', color: '#000'}}></i>
                            </div>
                          </div>
                          <div className="timeline-content">
                            <h5 className="timeline-title">Inquiry</h5>
                            <p className="timeline-subtitle">Share your vision</p>
                          </div>
                        </div>

                        {/* Step 2: Planning */}
                        <div className="timeline-step">
                          <div className="timeline-icon-container">
                            <div className="timeline-icon">
                              <i className="bi bi-music-note-beamed" style={{fontSize: '1.5rem', color: '#000'}}></i>
                            </div>
                          </div>
                          <div className="timeline-content">
                            <h5 className="timeline-title">Planning</h5>
                            <p className="timeline-subtitle">Craft the perfect set</p>
                          </div>
                        </div>

                        {/* Step 3: Performance */}
                        <div className="timeline-step">
                          <div className="timeline-icon-container">
                            <div className="timeline-icon">
                              <i className="bi bi-star-fill" style={{fontSize: '1.5rem', color: '#000'}}></i>
                            </div>
                          </div>
                          <div className="timeline-content">
                            <h5 className="timeline-title">Performance</h5>
                            <p className="timeline-subtitle">Unforgettable moments</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Service Types Below Timeline */}

                    </div>

                    {/* CTA Button */}
                    <div className="mb-4">
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="btn btn-lg px-5 py-3 border-0 rounded-pill fw-bold booking-cta-button"
                      >
                        <i className="bi bi-calendar-plus me-2"></i>
                        Start Booking Process
                      </button>
                    </div>

                    {/* Footer Text */}
                    <div>
                      <small className="contact-footer-text">
                        <i className="bi bi-shield-check me-1" style={{color: 'var(--accent)'}}></i>
                        Professional • Reliable • Unforgettable
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <SocialMediaSection />

        {/* Footer */}
        <FooterSection />
      </div>
      </div>
    </div>
  );
}