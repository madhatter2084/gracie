import { useState } from 'react';

export function StorySection() {
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [expandedStories, setExpandedStories] = useState<{[key: number]: boolean}>({});

  const toggleExpanded = (index: number) => {
    setExpandedStories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const stories = [
    {
      id: 'identity-crisis',
      title: 'Self Discovery / Identity Crisis',
      avatar: '🪞',
      username: '@graciekay',
      timeAgo: '1 year ago',
      content: 'For 23 years, my reflection was my worst enemy, so I avoided mirrors at all costs. That way maybe my insecurities would magically disappear. Spoiler: they didn\'t.',
      fullContent: `For 23 years, my reflection was my worst enemy, so I avoided mirrors at all costs. That way maybe my insecurities would magically disappear. Spoiler: they didn't. Since graduating, while it seemed like most of my peers were confidently beginning their journeys of adulthood, I felt like I fell behind still wrestling the question: "Who is really Gracie Kayal?"

Confidence has never been my strong suit. Whether it be in sports, my self-image, being a good enough friend, or holding my own in the classroom. I always felt like I fell short. Though I was lucky to have always been surrounded by support and people who saw potential in me, I couldn't see it for myself.`,
      likes: 892,
      comments: 156,
      shares: 43,
      tags: ['#SelfDiscovery', '#IdentityCrisis', '#Growth']
    },
    {
      id: 'swimming-career',
      title: 'Swimming Career',
      avatar: '🏊‍♀️',
      username: '@graciekay',
      timeAgo: '1 year ago',
      content: 'My swimming career best sums up my low minded mentality. No matter how fast I swam or any achievements I earned, I subconsciously believed I didn\'t deserve success.',
      fullContent: `My swimming career best sums up my low minded mentality. No matter how fast I swam or any achievements I earned, I subconsciously believed I didn't deserve success. I never understood what it meant to take pride in my accomplishments.

I was mostly driven to reach my potential as an athlete solely to make my family and coaches proud. I used swimming as a distraction. It was a mechanism to become recognized by others to hopefully gain a sense of self-worth. I'm understanding now why those motives can only bring you so far.`,
      likes: 743,
      comments: 98,
      shares: 34,
      tags: ['#Swimming', '#Motivation', '#SelfReflection']
    },
    {
      id: 'lowest-point',
      title: 'The Lowest Point',
      avatar: '🌧️',
      username: '@graciekay',
      timeAgo: '1 year ago',
      content: 'This past year has been a total contradiction. I had the privilege to travel parts of the world, live with my best friend (my dad) and chase my dreams of building a career in music—sounds like a dream, right? Somehow, I still managed to hit my lowest point.',
      fullContent: `This past year has been a total contradiction. I had the privilege to travel parts of the world, live with my best friend (my dad) and chase my dreams of building a career in music—sounds like a dream, right? Somehow, I still managed to hit my lowest point.

Nothing during this lifestage felt familiar, not even my own sense of self. I was at war internally, working to embrace parts of myself that I had suppressed for years.`,
      likes: 1247,
      comments: 234,
      shares: 87,
      tags: ['#LowestPoint', '#Struggle', '#Authenticity']
    },
    {
      id: 'social-media-beast',
      title: 'Social Media Reality',
      avatar: '📱',
      username: '@graciekay',
      timeAgo: '11 months ago',
      content: 'Social media\'s a beast—it\'s like we\'re all programmed to think we know someone solely based on their highlight reels, which, let\'s be honest, are often polished, curated, or just not the full story (speaking for myself at least).',
      fullContent: `Social media's a beast—it's like we're all programmed to think we know someone solely based on their highlight reels, which, let's be honest, are often polished, curated, or just not the full story (speaking for myself at least).

I think one of the scariest parts of my self-discovery journey is that I'm not doing this behind closed doors—whoever wants to follow along has access to witness my shortcomings, my flaws or if you choose to look at it the other way, my growth.

My whole life, I felt pressure to fit some "perfect image," but here's the truth: I am absolutely nowhere near perfect and never will be. I'm learning to fall in love with the journey and messiness of life through songwriting, while challenging myself to be transparent during this learning process.`,
      likes: 956,
      comments: 178,
      shares: 65,
      tags: ['#SocialMedia', '#Authenticity', '#Transparency']
    },
    {
      id: 'still-learning',
      title: 'Still Learning',
      avatar: '🌱',
      username: '@graciekay',
      timeAgo: '6 months ago',
      content: 'It is not vain to believe in yourself. Saying out loud that you can be great if you put in the work? That\'s not conceited—it\'s powerful.',
      fullContent: `It is not vain to believe in yourself. Saying out loud that you can be great if you put in the work? That's not conceited—it's powerful.

My voice and my ability to create music are gifts and I should use this privilege to try to make the world a little brighter even if at times it still feels uncomfortable for myself.

<strong>Never run away from your potential out of fear of failure.</strong>`,
      likes: 1834,
      comments: 267,
      shares: 124,
      tags: ['#SelfBelief', '#Growth', '#Potential']
    },
    {
      id: 'proving-myself',
      title: 'Proving to Myself',
      avatar: '💪',
      username: '@graciekay',
      timeAgo: '3 months ago',
      content: 'This time, in working towards my goals, my drive isn\'t stemming from feeling the need to prove my worth to anyone else—my family, my friends, even to the people who doubt me. I have an opportunity to prove to myself that I will never give up, and always strive to reach my highest potential.',
      fullContent: `This time, in working towards my goals, my drive isn't stemming from feeling the need to prove my worth to anyone else—my family, my friends, even to the people who doubt me. I have an opportunity to prove to myself that I will never give up, and always strive to reach my highest potential.

I'm so excited to continue working toward my next project, to try and best tell my story using this art and share the messy, beautiful process along the way. I'll be documenting it, challenging myself to be present and real for anyone who wants to come along for the ride.

To whoever's reading this—please understand that you are also more than capable of being great in whatever you choose to pursue.`,
      likes: 2156,
      comments: 342,
      shares: 198,
      tags: ['#SelfWorth', '#Journey', '#Gratitude']
    }
  ];

  return (
    <div className="py-7 content-section">
      <div className="container">
        <div className="text-center mb-5 animate-fade-in-up">
          <h2 className="display-4 mb-4 fw-bold story-section-title">
            <i className="bi bi-chat-heart me-3 animate-bounce story-cta-icon" style={{color: 'var(--icon-adaptive-color)'}}></i>
            The Real Story
          </h2>
          <p className="fs-5 story-section-subtitle" style={{ color: 'var(--heading-color)' }}>
            My journey of self-discovery, vulnerability, and finding my voice - unfiltered
          </p>
        </div>

        {/* Social Media Feed Style - Two Column Grid */}
        <div className="story-grid story-grid-three-cols">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div 
                className={`story-post h-100 social-hover story-post-bg ${hoveredStory === index ? 'active-post active' : ''}`}
                onMouseEnter={() => setHoveredStory(index)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="position-relative" style={{ zIndex: 2 }}>
                {/* Post Header */}
                <div className="d-flex align-items-center p-4 pb-3">
                  <div className="story-post-avatar rounded-circle d-flex align-items-center justify-content-center me-3">
                    {story.avatar}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-0 fw-bold story-post-username">
                          {story.username}
                        </h6>
                        <div className="story-post-meta fs-6 fw-normal">
                          {story.timeAgo} • {story.title}
                        </div>
                      </div>
                      <button className="btn btn-sm border-0 rounded-circle story-post-menu-btn">
                        <i className="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <div className="story-content">
                    <p 
                      className="mb-3 lh-lg story-post-content"
                      dangerouslySetInnerHTML={{
                        __html: expandedStories[index] ? story.fullContent : story.content
                      }}
                    ></p>
                    
                    {story.fullContent && story.fullContent.length > story.content.length && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="story-read-more-btn"
                      >
                        <span style={{ position: 'relative', zIndex: 2 }}>
                          <i className={`bi ${expandedStories[index] ? 'bi-chevron-up' : 'bi-chevron-down'} me-1`}></i>
                          {expandedStories[index] ? 'Show less' : 'Read more'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2 mt-3 mb-3">
                    {story.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="story-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 pb-4">
                  <div className="d-flex align-items-center justify-content-between border-top pt-3 story-action-border">
                    <div className="d-flex align-items-center gap-4">
                      <button className="btn btn-sm border-0 d-flex align-items-center gap-2 social-button story-action-btn heart">
                        <i className="bi bi-heart"></i>
                        <span>{story.likes}</span>
                      </button>
                      
                      <button className="btn btn-sm border-0 d-flex align-items-center gap-2 social-button story-action-btn accent">
                        <i className="bi bi-chat"></i>
                        <span>{story.comments}</span>
                      </button>
                      
                      <button className="btn btn-sm border-0 d-flex align-items-center gap-2 social-button story-action-btn accent">
                        <i className="bi bi-share"></i>
                        <span>{story.shares}</span>
                      </button>
                    </div>
                    
                    <button className="btn btn-sm border-0 social-button story-action-btn accent">
                      <i className="bi bi-bookmark"></i>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5 animate-fade-in-up story-cta-delay">
          <div className="p-5 rounded-5 shadow-lg social-hover story-cta-card">
            <i className="bi bi-heart-fill mb-4 animate-bounce story-cta-icon"></i>
            <h4 className="fw-bold mb-3 story-cta-title">
              Thank You for Being Here
            </h4>
            <p className="mb-4 story-cta-text">
              This journey of vulnerability and growth continues. Follow along as I document more of this messy, beautiful process of chasing my potential.
            </p>
            <p className="mb-3 fst-italic story-cta-quote">
              We are capable of greatness.
            </p>
            <p className="mb-0">
              <a 
                href="https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-lg border-0 rounded-pill fw-semibold social-button px-4 py-3"
                style={{backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}
              >
                <i className="bi bi-spotify me-2"></i>
                Listen to the soundtrack
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}