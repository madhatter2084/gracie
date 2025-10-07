interface NavigationProps {
  scrollToSection?: (sectionId: string) => void;
}

export function Navigation({ scrollToSection }: NavigationProps) {
  const handleScrollToSection = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      // Fallback if scrollToSection is not provided
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{zIndex: 1000}}>
      <div className="container">
        <a 
          className="navbar-brand fw-bold d-flex align-items-center" 
          href="#hero"
          style={{color: 'var(--foreground)', fontSize: '1.5rem'}}
          onClick={(e) => {
            e.preventDefault();
            handleScrollToSection('hero');
          }}
        >
          <i className="bi bi-music-note-beamed me-2" style={{color: 'var(--accent)'}}></i>
          Gracie Kay
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{color: 'var(--foreground)'}}
        >
          <i className="bi bi-list" style={{fontSize: '1.5rem'}}></i>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#hero"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('hero');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#about"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('about');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-map me-1"></i>Journey
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#story"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('story');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-book me-1"></i>Story
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#music"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('music');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-music-note me-1"></i>Music
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#gallery"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('gallery');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-camera me-1"></i>Gallery
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link px-3 py-2 fw-semibold social-hover" 
                href="#contact"
                style={{color: 'var(--foreground)', transition: 'all 0.3s ease'}}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('contact');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="bi bi-calendar-check me-1"></i>Book
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}