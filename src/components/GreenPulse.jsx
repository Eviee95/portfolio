import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GreenPulse.css';

const GreenPulse = () => {
  const navigate = useNavigate();
  
  // Video ref
  const videoRef = useRef(null);
  // Back button state
  const [backBtnDown, setBackBtnDown] = useState(false);
  // Line SVG state
  const [lineSvgIndex, setLineSvgIndex] = useState(1);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const dividerLineRef = useRef(null);
  // Second line animation state
  const [secondLineSvgIndex, setSecondLineSvgIndex] = useState(1);
  const [secondAnimationStarted, setSecondAnimationStarted] = useState(false);
  const [secondAnimationCompleted, setSecondAnimationCompleted] = useState(false);
  const secondDividerLineRef = useRef(null);
  // Third line animation state
  const [thirdLineSvgIndex, setThirdLineSvgIndex] = useState(1);
  const [thirdAnimationStarted, setThirdAnimationStarted] = useState(false);
  const [thirdAnimationCompleted, setThirdAnimationCompleted] = useState(false);
  const thirdDividerLineRef = useRef(null);
  // Animation states for comparison SVGs
  const [niceSvgState, setNiceSvgState] = useState('open');
  const [uglySvgState, setUglySvgState] = useState('open');
  // State for alternating kido images
  const [kidoImage, setKidoImage] = useState('kido1');
  // Video play state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Use refs to track animation completion persistently
  const animationCompletedRef = useRef(false);
  const secondAnimationCompletedRef = useRef(false);
  const thirdAnimationCompletedRef = useRef(false);

  // Mindig az oldal tetejére görbünk, amikor betöltődik az oldal
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleBackBtnDown = () => setBackBtnDown(true);
  const handleBackBtnUp = () => setBackBtnDown(false);

  const handleBackClick = () => {
    handleBackBtnDown();
    setTimeout(() => {
      handleBackBtnUp();
      handleGoBack();
    }, 150); 
  };

  // Video play/pause handlers
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  // Auto-play video when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log('Auto-play prevented:', error);
          });
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Check if first divider line is visible and start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted && !animationCompletedRef.current) {
          setAnimationStarted(true);
          
          // Animate through the line SVGs
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setAnimationCompleted(true);
              animationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );

    if (dividerLineRef.current) {
      observer.observe(dividerLineRef.current);
    }

    return () => {
      if (dividerLineRef.current) {
        observer.unobserve(dividerLineRef.current);
      }
    };
  }, [animationStarted]);

  // Check if second divider line is visible and start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !secondAnimationStarted && !secondAnimationCompletedRef.current) {
          setSecondAnimationStarted(true);
          
          // Animate through the line SVGs
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setSecondLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setSecondAnimationCompleted(true);
              secondAnimationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );

    if (secondDividerLineRef.current) {
      observer.observe(secondDividerLineRef.current);
    }

    return () => {
      if (secondDividerLineRef.current) {
        observer.unobserve(secondDividerLineRef.current);
      }
    };
  }, [secondAnimationStarted]);

  // Check if third divider line is visible and start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !thirdAnimationStarted && !thirdAnimationCompletedRef.current) {
          setThirdAnimationStarted(true);
          
          // Animate through the line SVGs
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setThirdLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setThirdAnimationCompleted(true);
              thirdAnimationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );

    if (thirdDividerLineRef.current) {
      observer.observe(thirdDividerLineRef.current);
    }

    return () => {
      if (thirdDividerLineRef.current) {
        observer.unobserve(thirdDividerLineRef.current);
      }
    };
  }, [thirdAnimationStarted]);

  // Animation for nice/ugly SVGs - open 4s, closed very briefly (50ms)
  useEffect(() => {
    let niceInterval;
    let uglyInterval;

    const startNiceAnimation = () => {
      niceInterval = setInterval(() => {
        // Show closed state very briefly
        setNiceSvgState('closed');
        
        // Immediately return to open state (almost instant)
        setTimeout(() => {
          setNiceSvgState('open');
        }, 200); // Extremely short closed state (50ms)
      }, 2000); // Repeat every 4 seconds
    };

    const startUglyAnimation = () => {
      uglyInterval = setInterval(() => {
        // Show closed state very briefly
        setUglySvgState('closed');
        
        // Immediately return to open state (almost instant)
        setTimeout(() => {
          setUglySvgState('open');
        }, 200); // Extremely short closed state (50ms)
      }, 2000); // Repeat every 4 seconds
    };

    // Start animations
    startNiceAnimation();
    startUglyAnimation();

    return () => {
      clearInterval(niceInterval);
      clearInterval(uglyInterval);
    };
  }, []);

  // Animation for alternating kido images
  useEffect(() => {
    const interval = setInterval(() => {
      setKidoImage(prev => prev === 'kido1' ? 'kido2' : 'kido1');
    }, 500); // Change every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container greenpulse-page">
      <div className="page-content">
        <div className="main-container">
          <div className="greenpulse-content-container">
            {/* Back button */}
            <div className="back-button-container">
              <img
                src="/images/back.svg"
                alt="Back"
                className={`back-button-img${backBtnDown ? " pressed" : ""}`}
                onClick={handleBackClick}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") handleBackBtnDown();
                }}
                onKeyUp={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    handleBackBtnUp();
                    handleGoBack();
                  }
                }}
                aria-pressed={backBtnDown}
                role="button"
                style={{ cursor: 'pointer' }}
              />
            </div>
            
            <main className="greenpulse-content">
              <h1>GreenPulse Project</h1>
              
              <div className="main-content-container">
                {/* Text */}
                <div className="text-content">
                  <h2>What Was This All About Anyway?</h2>
                  <p>GreenPulse is a Budapest-based startup, they make this smart energy monitoring thing for SMEs. The task was to create a landing page that:</p>
                  <ul>
                    <li>Quickly says what they do (because nobody has time to read).</li>
                    <li>Doesn't make them seem sketchy; there needs to be something that makes you believe they're actually good.</li>
                    <li>Encourages you to request a demo or contact them.</li>
                  </ul>
                  <p>
                    The target audience is like, business leaders, finance people who want to save on their electricity bill and want to be a bit greener.
                  </p>
                </div>

                {/* Computer with video playing on screen */}
                <div className="image-content">
                  <div className="computer-with-video">
                    <img src="/images/computer.svg" alt="Computer displaying GreenPulse" className="computer-frame" />
                    <div className="video-screen">
                      <video 
                        ref={videoRef}
                        className="greenpulse-screen-video"
                        muted
                        loop
                        playsInline
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      >
                        <source src="/images/greenpulse.mov" type="video/mp4" />
                        <source src="/images/greenpulse.mov" type="video/quicktime" />
                        Your browser does not support the video tag.
                      </video>
                      {!isVideoPlaying && (
                        <div className="video-play-overlay">
                          <button 
                            className="play-button"
                            onClick={() => videoRef.current?.play()}
                          >
                            ▶
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* First divider line */}
              <div className="divider-line-container" ref={dividerLineRef}>
                <div className="divider-line">
                  <img 
                    src={`/images/line${animationCompletedRef.current ? 15 : lineSvgIndex}.svg`} 
                    alt="Decorative divider line" 
                    className="line-svg"
                  />
                </div>
              </div>
              
              {/* Second section */}
              <div className="second-section">
                <h2>What was wrong with the old version? (Which obviously doesn't exist 😊)</h2>
                
                <div className="comparison-container">
                  <div className="comparison-image">
                    <img 
                      src={`/images/nice${niceSvgState}.svg`} 
                      alt="Good design example" 
                      className="comparison-svg" 
                    />
                    <p>Good design</p>
                  </div>
                  
                  <div className="comparison-text">
                    <p>Well, there were some issues...</p>
                    <ul>
                      <li>You couldn't understand in 5 seconds who they are and what they want. That's a problem. If a CFO doesn't get it quickly, they bounce.</li>
                      <li>Zero trust. No numbers, no stories, no reviews, nothing. It felt like they were just making promises.</li>
                      <li>The design looked like it was made in 2005. But they're a cool AT & IoT startup, not a corner shop.</li>
                    </ul>
                    <p>They didn't tell me what to do. There was no clear button for "request a demo".</p>
                  </div>
                  
                  <div className="comparison-image">
                    <img 
                      src={`/images/ugly${uglySvgState}.svg`} 
                      alt="Bad design example" 
                      className="comparison-svg" 
                    />
                    <p>Bad design</p>
                  </div>
                </div>
              </div>

              {/* Second divider line - flipped horizontally */}
              <div className="divider-line-container flipped" ref={secondDividerLineRef}>
                <div className="divider-line">
                  <img 
                    src={`/images/line${secondAnimationCompletedRef.current ? 15 : secondLineSvgIndex}.svg`} 
                    alt="Decorative divider line" 
                    className="line-svg flipped"
                  />
                </div>
              </div>

              {/* Third section - Design Process */}
              <div className="third-section">
                {/* Three columns side by side */}
                <div className="design-process-row">
                  
                  <div className="design-column logos-column">
                    <h2>Logos</h2>
                    <div className="logo-item">
                      <div className="logo-with-background light-bg">
                        <img src="/images/logoblackwhite.svg" alt="Black and White Logo" className="process-logo" />
                      </div>
                    </div>
                    <div className="logo-item">
                      <div className="logo-with-background dark-bg">
                        <img src="/images/logocolored.svg" alt="Colored Logo" className="process-logo" />
                      </div>
                    </div>
                    <img src={`/images/${kidoImage}.svg`} alt="Alternating kido image"/>
                  </div>

                  {/* Text column */}
                  <div className="design-column text-column">
                    <h2>How Did I Make It? (The Design Process)</h2>
                    <p>Started with paper (iPad) wireframes, then moved to Figma.</p>
                    
                    <h3>Structure:</h3>
                    <ul>
                      <li><strong>Hero:</strong> Clear value proposition + prominent "Request Demo" button</li>
                      <li><strong>Features:</strong> MEASURE → ANALYZE → SAVE flow with simple icons</li>
                      <li><strong>Testimonials:</strong> Concrete results with numbers ("30% savings!")</li>
                      <li><strong>About:</strong> Budapest roots and mission to add personality</li>
                      <li><strong>Contact:</strong> Repeated CTA with contact information</li>
                    </ul>
                    
                    <h3>Look & Feel:</h3>
                    <ul>
                      <li><strong>Colors:</strong> Various green shades matching the chameleon mascot</li>
                      <li><strong>Icons:</strong> Simple, universally understood symbols</li>
                      <li><strong>Typography:</strong> Bold headlines with high-contrast buttons</li>
                    </ul>
                  </div>
                  
                  {/* Balls column */}
                  <div className="design-column balls-column">
                    <h2>Colors</h2>
                    <div className="ball-animation-container">
                      <img 
                        src="/images/paca.svg" 
                        alt="Animated ball" 
                        className="ball-animation"
                      />
                      <div className="ball-hex-code">#6bd8b0</div>
                    </div>
                    
                    <div className="ball-animation-container">
                      <img 
                        src="/images/paca.svg" 
                        alt="Animated ball" 
                        className="ball-animation"
                      />
                      <div className="ball-hex-code">#4caf50</div>
                    </div>
                    
                    {/* Centered Helvetica text */}
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '30px',
                      width: '100%'
                    }}>
                      <h2>Font</h2>
                      <h2>Helvetica Neue</h2>
                      <h3 style={{
                        fontFamily: "Helvetica Neue",
                        textAlign: 'center',
                        margin: '0 auto',
                        padding: '20px',
                        letterSpacing: '5px'
                      }}>
                        aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Images below - full width */}
                <div className="design-images-content full-width">
                  <div className="images-row">
                    <div className="image-with-caption">
                      <img src="/images/GreenPulseSketch.png" alt="GreenPulse Sketch" className="design-process-img" />
                      <p>Initial Sketch</p>
                    </div>
                    <img 
                      src="/images/nyil.svg" 
                      alt="Arrow"
                    />
                    <div className="image-with-caption">
                      <img src="/images/GreenPulseWireframe.png" alt="GreenPulse Wireframe" className="design-process-img" />
                      <p>Wireframe</p>
                    </div>
                    <img 
                      src="/images/nyil.svg" 
                      alt="Arrow"
                    />
                    <div className="image-with-caption">
                      <img src="/images/GreenPulseFinal.jpg" alt="GreenPulse Final Design" className="design-process-img" />
                      <p>Final Design</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenPulse;