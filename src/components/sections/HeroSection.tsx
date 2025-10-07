import graciePortrait from 'figma:asset/6b6443567d3b74856944288318f3b10df995a3b1.png';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <div className="d-flex align-items-center hero-section pt-[60px] pr-[15px] pb-[40px] pl-[15px]">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6 col-md-8 p-0">
            {/* Text Overlay Background for Better Readability */}
            <div className="hero-text-overlay rounded-5 px-0 sm:px-[15px] py-[28px]">
              <div className="hero-content animate-fade-in-up px-0 sm:px-[15px] py-[25px]">
                <h1 className="mb-4 fw-bold hero-title text-center hero-title-responsive">
                  Life Has No Script
                </h1>
                <h2 className="mb-4 hero-subtitle script-font text-center hero-subtitle-light-black hero-subtitle-responsive">
                  You Get to Write Your Own
                </h2>
                
                <div className="mb-5 animate-fade-in-up hero-description-container-delay">
                  <div className="hero-description-responsive mb-4 hero-description description-light text-center">
                    <img 
                      src={graciePortrait} 
                      alt="Gracie Kay portrait"
                      className="mb-3 mx-auto d-block rounded-4 shadow-lg d-lg-none"
                      style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
                    />
                    <p className="mb-0 hero-description-h2" style={{ fontSize: '16px' }}>
                      From competitive swimmer to singer-songwriter, this is my journey of finding my voice and writing my own story.
                    </p>
                  </div>
                </div>



                {/* Actual Spotify Embed Player - Real Preview Playback */}
                <div className="mt-5 animate-fade-in-up hero-music-player">
                  <div className="d-flex justify-content-center">
                    <div className="hero-spotify-container" style={{ maxWidth: '500px', width: '100%' }}>
                      <div 
                        style={{
                          height: '152px',
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: '1.5rem',
                          position: 'relative'
                        }}
                        className="shadow-lg"
                      >
                        <iframe 
                          data-testid="embed-iframe" 
                          style={{
                            border: 'none',
                            width: '100%',
                            height: '152px',
                            background: 'transparent',
                            position: 'absolute',
                            top: '0',
                            left: '0'
                          }}
                          src="https://open.spotify.com/embed/track/05NQHtHM970DIZPR0fabB9?utm_source=generator&theme=0" 
                          width="100%" 
                          height="152"
                          frameBorder="0" 
                          allowFullScreen="" 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          title="Gracie Kay - Undercover on Spotify"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 animate-fade-in-up text-end hero-social-container">
                  <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap hero-social-links">
                    <a 
                      href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hero-social-link hero-social-spotify"
                    >
                      <i className="bi bi-spotify"></i>
                    </a>
                    <a 
                      href="https://music.apple.com/ca/song/undercover/1822967268" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hero-social-link hero-social-apple"
                    >
                      <i className="bi bi-music-note"></i>
                    </a>
                    <a 
                      href="https://instagram.com/graciekay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hero-social-link hero-social-instagram"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a 
                      href="https://tiktok.com/@graciekay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hero-social-link hero-social-tiktok"
                    >
                      <i className="bi bi-tiktok"></i>
                    </a>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="mt-5 animate-bounce text-center hero-scroll-indicator">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="btn border-0 bg-transparent hero-scroll-btn"
                  >
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}