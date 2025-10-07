import { TIMELINE_ITEMS } from '../constants';

interface TimelineSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function TimelineSection({ scrollToSection }: TimelineSectionProps) {
  return (
    <div className="py-7 content-section timeline-section-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5 animate-fade-in-up">
              <h2 className="display-4 mb-4 fw-bold timeline-section-title">
                <i className="bi bi-map me-3" style={{color: 'var(--icon-adaptive-color)'}}></i>
                My Journey
              </h2>
              <p className="fs-5 timeline-section-subtitle" style={{ color: 'var(--heading-color)' }}>
                Click each milestone to explore that part of my story
              </p>
            </div>
            
            {/* Interactive Timeline */}
            <div className="position-relative timeline-connector">
              {/* Journey Timeline - 4 in One Row */}
              <div className="journey-timeline-row journey-timeline-grid-mobile mb-5">
                {TIMELINE_ITEMS.map((item, index) => (
                  <div key={item.id} className="journey-timeline-item">
                    <div 
                      className="text-center journey-timeline-card animate-fade-in-up timeline-item-card"
                      onClick={() => {
                        console.log(`Attempting to scroll to: ${item.id}`);
                        const element = document.getElementById(item.id);
                        if (element) {
                          console.log(`Found element: ${item.id}, scrolling...`);
                          scrollToSection(item.id);
                        } else {
                          console.log(`Section ${item.id} not found, scrolling to story section instead`);
                          scrollToSection('story');
                        }
                      }}
                      style={{animationDelay: item.delay}}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          const element = document.getElementById(item.id);
                          if (element) {
                            scrollToSection(item.id);
                          } else {
                            scrollToSection('story');
                          }
                        }
                      }}
                      title={`Click to view ${item.title.toLowerCase()} stories`}
                    >
                      <div className="timeline-item-icon journey-timeline-icon mx-auto mb-3 d-flex align-items-center justify-content-center">
                        <i className={`bi ${item.icon}`}></i>
                      </div>
                      <h5 className="fw-bold mb-2 timeline-item-title">{item.title}</h5>
                      <p className="mb-3 timeline-item-description" style={{ color: 'var(--heading-color)' }}>{item.description}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(item.id);
                        }}
                        className="timeline-explore-btn"
                      >
                        <i className="bi bi-arrow-down me-1"></i>Explore
                      </button>
                    </div>
                  </div>
                ))}
              </div>


            </div>

            {/* Pull Quote */}
            <div className="text-center animate-fade-in-up timeline-quote-delay">
              <blockquote className="blockquote">
                <p className="display-5 fst-italic fw-light animate-pulse timeline-quote">
                  "Lean into what lights you up."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}