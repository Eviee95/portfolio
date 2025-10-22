import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GreenPulse.css';

const GreenPulse = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [backBtnDown, setBackBtnDown] = useState(false);
  const [lineSvgIndex, setLineSvgIndex] = useState(1);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const dividerLineRef = useRef(null);

  const [secondLineSvgIndex, setSecondLineSvgIndex] = useState(1);
  const [secondAnimationStarted, setSecondAnimationStarted] = useState(false);
  const [secondAnimationCompleted, setSecondAnimationCompleted] = useState(false);
  const secondDividerLineRef = useRef(null);

  const [thirdLineSvgIndex, setThirdLineSvgIndex] = useState(1);
  const [thirdAnimationStarted, setThirdAnimationStarted] = useState(false);
  const [thirdAnimationCompleted, setThirdAnimationCompleted] = useState(false);
  const thirdDividerLineRef = useRef(null);

  const [fourthLineSvgIndex, setFourthLineSvgIndex] = useState(1);
  const [fourthAnimationStarted, setFourthAnimationStarted] = useState(false);
  const [fourthAnimationCompleted, setFourthAnimationCompleted] = useState(false);
  const fourthDividerLineRef = useRef(null);

  const [niceSvgState, setNiceSvgState] = useState('open');
  const [uglySvgState, setUglySvgState] = useState('open');
  const [kidoImage, setKidoImage] = useState('kido1');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [showMrBean, setShowMrBean] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const animationCompletedRef = useRef(false);
  const secondAnimationCompletedRef = useRef(false);
  const thirdAnimationCompletedRef = useRef(false);
  const fourthAnimationCompletedRef = useRef(false);

  const audioRef = useRef(null);
  // New: keep an AudioContext to resume on user gesture (helps unblocking WebAudio)
  const audioContextRef = useRef(null);

  // Play hello sound but only after a gesture-resume step
  const playHelloSound = async () => {
    if (audioPlayed) {
      console.log('Audio already played, skipping');
      return;
    }

    // Must not attempt to play before user interaction
    if (!userInteracted) {
      console.log('playHelloSound: waiting for user interaction');
      return;
    }

    try {
      // Create audio element once
      if (!audioRef.current) {
        audioRef.current = new Audio('/images/hello.mp3');
        audioRef.current.volume = 0.8;
        audioRef.current.preload = 'auto';
        audioRef.current.addEventListener('ended', () => {
          console.log('Audio finished playing');
          setShowMrBean(false);
          setAudioPlayed(true);
        });
      }

      // If we use AudioContext in the app, ensure it's resumed first
      if (audioContextRef.current) {
        try {
          await audioContextRef.current.resume();
          console.log('AudioContext resumed before playing audio');
        } catch (err) {
          console.warn('AudioContext resume failed', err);
        }
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully from /images/hello.mp3');
            setAudioPlayed(true);
            setShowMrBean(true);
          })
          .catch(error => {
            console.error('Audio play failed:', error);
            // fallback display Mr. Bean briefly if audio can't play
            setShowMrBean(true);
            setTimeout(() => setShowMrBean(false), 3000);
          });
      }
    } catch (error) {
      console.error('Audio error:', error);
      setShowMrBean(true);
      setTimeout(() => setShowMrBean(false), 3000);
    }
  };

  const handleImageError = () => {
    console.log('Mr. Bean image failed to load');
    setImageError(true);
  };

  // Centralized handler for the first user gesture
  const handleUserInteraction = async () => {
    if (!userInteracted) {
      console.log('User interaction detected - unlocking audio/video features');
      setUserInteracted(true);

      // Try to create/resume an AudioContext. Many browsers require this to be resumed by gesture.
      try {
        if (!audioContextRef.current && (window.AudioContext || window.webkitAudioContext)) {
          const AC = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AC();
        }
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
          console.log('AudioContext resumed on user gesture');
        }
      } catch (err) {
        console.warn('Failed to create/resume AudioContext:', err);
      }

      // Now safe to attempt playback
      playHelloSound();
    }
  };

  // Initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
    setAudioPlayed(false);
    setUserInteracted(false);
    setShowMrBean(true);

    const fallbackTimer = setTimeout(() => {
      if (!userInteracted && !audioPlayed) {
        console.log('No user interaction - hiding Mr. Bean');
        setShowMrBean(false);
      }
    }, 3000);

    return () => {
      clearTimeout(fallbackTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) { /* ignore */ }
        audioContextRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add "once" event listeners to unlock on first gesture
  useEffect(() => {
    const events = ['click', 'keydown', 'touchstart'];
    const interactionHandler = () => {
      handleUserInteraction();
    };

    events.forEach(event => {
      document.addEventListener(event, interactionHandler, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => document.removeEventListener(event, interactionHandler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Try to play once userInteracted changes (will be true only after gesture)
  useEffect(() => {
    if (userInteracted && !audioPlayed) {
      console.log('User interacted - calling playHelloSound()');
      playHelloSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInteracted]);

  const handleGoBack = () => navigate('/');
  const handleBackBtnDown = () => setBackBtnDown(true);
  const handleBackBtnUp = () => setBackBtnDown(false);
  const handleBackClick = () => {
    handleUserInteraction();
    handleBackBtnDown();
    setTimeout(() => {
      handleBackBtnUp();
      handleGoBack();
    }, 150);
  };

  const handleVideoPlay = () => setIsVideoPlaying(true);
  const handleVideoPause = () => setIsVideoPlaying(false);

  // IntersectionObserver to autoplay muted video when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          // Allowed: autoplay only while muted
          if (videoRef.current.paused) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(err => {
              console.log('Auto-play prevented or failed:', err);
            });
          }
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // The rest of your existing animation and observer logic unchanged...
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted && !animationCompletedRef.current) {
          setAnimationStarted(true);
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
    if (dividerLineRef.current) observer.observe(dividerLineRef.current);
    return () => { if (dividerLineRef.current) observer.unobserve(dividerLineRef.current); };
  }, [animationStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !secondAnimationStarted && !secondAnimationCompletedRef.current) {
          setSecondAnimationStarted(true);
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
    if (secondDividerLineRef.current) observer.observe(secondDividerLineRef.current);
    return () => { if (secondDividerLineRef.current) observer.unobserve(secondDividerLineRef.current); };
  }, [secondAnimationStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !thirdAnimationStarted && !thirdAnimationCompletedRef.current) {
          setThirdAnimationStarted(true);
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
    if (thirdDividerLineRef.current) observer.observe(thirdDividerLineRef.current);
    return () => { if (thirdDividerLineRef.current) observer.unobserve(thirdDividerLineRef.current); };
  }, [thirdAnimationStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fourthAnimationStarted && !fourthAnimationCompletedRef.current) {
          setFourthAnimationStarted(true);
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setFourthLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setFourthAnimationCompleted(true);
              fourthAnimationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );
    if (fourthDividerLineRef.current) observer.observe(fourthDividerLineRef.current);
    return () => { if (fourthDividerLineRef.current) observer.unobserve(fourthDividerLineRef.current); };
  }, [fourthAnimationStarted]);

  useEffect(() => {
    let niceInterval;
    let uglyInterval;
    const startNiceAnimation = () => {
      niceInterval = setInterval(() => {
        setNiceSvgState('closed');
        setTimeout(() => setNiceSvgState('open'), 200);
      }, 2000);
    };
    const startUglyAnimation = () => {
      uglyInterval = setInterval(() => {
        setUglySvgState('closed');
        setTimeout(() => setUglySvgState('open'), 200);
      }, 2000);
    };
    startNiceAnimation();
    startUglyAnimation();
    return () => { clearInterval(niceInterval); clearInterval(uglyInterval); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setKidoImage(prev => prev === 'kido1' ? 'kido2' : 'kido1'), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container greenpulse-page" onClick={handleUserInteraction}>
      {showMrBean && (
        <div className="mrbean-overlay" onClick={(e) => { e.stopPropagation(); /* allow clicks to interact but don't close layer */ }}>
          {!imageError ? (
            <img
              src="/images/mrbean.svg"
              alt="Mr. Bean"
              className="mrbean-image"
              onError={handleImageError}
            />
          ) : (
            <div className="mrbean-fallback">
              <span>👋 Mr. Bean says Hello!</span>
              {!userInteracted && !audioPlayed && (
                <div style={{ fontSize: '14px', marginTop: '8px', color: '#666' }}>
                  Click anywhere to hear me!
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="page-content">
        <div className="main-container">
          <div className="greenpulse-content-container">
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
                <div className="text-content">
                  <h2>What Was This All About Anyway?</h2>
                  <p>GreenPulse is a Budapest-based startup, they make this smart energy monitoring thing for SMEs. The task was to create a landing page that:</p>
                  <ul>
                    <li>Quickly says what they do (because nobody has time to read).</li>
                    <li>Doesn't make them seem sketchy; there needs to be something that makes you believe they're actually good.</li>
                    <li>Encourages you to request a demo or contact them.</li>
                  </ul>
                  <p>The target audience is like, business leaders, finance people who want to save on their electricity bill and want to be a bit greener.</p>
                </div>

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
                            onClick={(e) => {
                              e.stopPropagation();
                              // mark as user interaction so audio can play after this
                              handleUserInteraction();
                              // unmute only after gesture (if you want sound on the video)
                              if (videoRef.current) {
                                // keep autoplay behavior muted — do not unmute automatically,
                                // but if you explicitly want sound, require the user to toggle it
                                videoRef.current.play().catch(err => console.log('Play blocked:', err));
                              }
                            }}
                          >
                            ▶
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider-line-container" ref={dividerLineRef}>
                <div className="divider-line">
                  <img
                    src={`/images/line${animationCompletedRef.current ? 15 : lineSvgIndex}.svg`}
                    alt="Decorative divider line"
                    className="line-svg"
                  />
                </div>
              </div>

              <div className="second-section">
                <h2>What was wrong with the old version? (Which obviously doesn't exist 😊)</h2>

                <div className="comparison-container">
                  <div className="comparison-image">
                    <img src={`/images/nice${niceSvgState}.svg`} alt="Good design example" className="comparison-svg" />
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
                    <img src={`/images/ugly${uglySvgState}.svg`} alt="Bad design example" className="comparison-svg" />
                    <p>Bad design</p>
                  </div>
                </div>
              </div>

              <div className="divider-line-container flipped" ref={secondDividerLineRef}>
                <div className="divider-line">
                  <img
                    src={`/images/line${secondAnimationCompletedRef.current ? 15 : secondLineSvgIndex}.svg`}
                    alt="Decorative divider line"
                    className="line-svg flipped"
                  />
                </div>
              </div>

              <div className="third-section">
                <div className="design-process-row">
                  <div className="design-column logos-column">
                    <h2 style={{ fontSize: "2rem", }}>Logos</h2>
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
                    <img src={`/images/${kidoImage}.svg`} alt="Alternating kido image" />
                  </div>

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

                  <div className="design-column balls-column">
                    <h2 style={{ fontSize: "2rem", }}>Colors</h2>
                    <div className="ball-animation-container">
                      <img src="/images/00696F.svg" alt="Animated ball" className="ball-animation" />
                      <div className="ball-hex-code">#00696F</div>
                    </div>
                    <div className="ball-animation-container">
                      <img src="/images/6BD8B0.svg" alt="Animated ball" className="ball-animation" />
                      <div className="ball-hex-code">#6BD8B0</div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '30px', width: '100%' }}>
                      <h2 style={{ fontSize: "2rem", }}>Font</h2>
                      <h2 style={{ fontSize: "2rem", color: "#00696F" }}>Helvetica Neue</h2>
                      <h3 style={{ fontFamily: "Helvetica Neue", textAlign: 'center', margin: '0 auto', padding: '20px', letterSpacing: '5px' }}>
                        aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="divider-line-container" ref={fourthDividerLineRef}>
                  <div className="divider-line">
                    <img
                      src={`/images/line${fourthAnimationCompletedRef.current ? 15 : fourthLineSvgIndex}.svg`}
                      alt="Decorative divider line"
                      className="line-svg"
                    />
                  </div>
                </div>

                <div className="design-images-content full-width">
                  <div className="images-row">
                    <div className="image-with-caption">
                      <img src="/images/GreenPulseSketch.png" alt="GreenPulse Sketch" className="design-process-img" />
                      <p>Initial Sketch</p>
                    </div>
                    <img src="/images/nyil.svg" alt="Arrow" />
                    <div className="image-with-caption">
                      <img src="/images/GreenPulseWireframe.png" alt="GreenPulse Wireframe" className="design-process-img" />
                      <p>Wireframe</p>
                    </div>
                    <img src="/images/nyil.svg" alt="Arrow" />
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