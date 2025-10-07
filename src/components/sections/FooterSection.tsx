import GracieKayLogo from '../../imports/GracieKayLogo';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { label: 'Home', href: '#hero' },
      { label: 'My Journey', href: '#about' },
      { label: 'Real Story', href: '#story' },
      { label: 'Music', href: '#music' }
    ],
    'Music Platforms': [
      { label: 'Spotify', href: 'https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow', external: true },
      { label: 'Apple Music', href: 'https://music.apple.com/ca/song/undercover/1822967268', external: true },
      { label: 'YouTube Music', href: '#music', external: true }
    ],
    'Social Media': [
      { label: 'Instagram', href: 'https://instagram.com/graciekay', external: true },
      { label: 'TikTok', href: 'https://tiktok.com/@graciekay', external: true }
    ]
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      // Calculate responsive offset for fixed navigation
      const isMobile = window.innerWidth <= 768;
      const navHeight = isMobile ? 90 : 120; // Smaller offset for mobile
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: Math.max(0, elementPosition), // Prevent negative scroll
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="py-7 footer-section footer-section-bg">
      <div className="container mb-5">
        {/* Main Footer Content */}
        <div className="row g-4 mb-4">
          {/* Logo and Description - Bigger Logo */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <div className="footer-logo footer-logo-wrapper">
                <GracieKayLogo />
              </div>
            </div>
            <p className="mb-3 lh-base footer-description">
              Singer-songwriter making waves from pool to stage.
            </p>
            
            {/* Social Icons - Compact Grid */}
            <div className="d-flex gap-2 flex-wrap">
              <a 
                href="https://instagram.com/graciekay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle social-button d-flex align-items-center justify-content-center footer-social-btn"
                title="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a 
                href="https://tiktok.com/@graciekay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle social-button d-flex align-items-center justify-content-center footer-social-btn"
                title="TikTok"
              >
                <i className="bi bi-tiktok"></i>
              </a>
              <a 
                href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle social-button d-flex align-items-center justify-content-center footer-social-btn"
                title="Spotify"
              >
                <i className="bi bi-spotify"></i>
              </a>
              <a 
                href="https://music.apple.com/ca/song/undercover/1822967268" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-sm rounded-circle social-button d-flex align-items-center justify-content-center footer-social-btn"
                title="Apple Music"
              >
                <i className="bi bi-music-note"></i>
              </a>

            </div>
          </div>

          {/* Footer Links - More Compact */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-lg-2 col-md-3 col-sm-4">
              <h6 className="fw-bold mb-3 footer-category-title">
                {category}
              </h6>
              <ul className="list-unstyled">
                {links.map((link, index) => (
                  <li key={index} className="mb-2">
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none footer-link"
                      >
                        {link.label}
                        <i className="bi bi-arrow-up-right ms-1 footer-link-external"></i>
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-decoration-none footer-link"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter & Booking - More Compact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3 footer-newsletter-title">
              Stay Connected
            </h6>
            <p className="mb-3 footer-newsletter-text">
              Get updates on new releases and tour dates
            </p>
            <div className="d-flex gap-2 mb-3 align-items-center">
              <input
                type="email"
                className="form-control rounded-pill flex-grow-1 footer-email-input"
                placeholder="Enter email"
              />
              <button className="btn rounded-pill fw-semibold social-button footer-subscribe-btn">
                <i className="bi bi-envelope me-1"></i>
                Subscribe
              </button>
            </div>
            

          </div>
        </div>

        {/* Footer Bottom - Compact */}
        <hr className="footer-divider" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 footer-copyright">
              © {currentYear} Gracie Kay. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 footer-made-with">
              <a 
                href="https://shoresitedesigns.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none footer-link footer-link-white-hover"
              >
                Created by ShoreSite Web Design , LLC
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}