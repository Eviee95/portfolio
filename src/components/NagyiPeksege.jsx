import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NagyiPeksege.css';

const NagyiPeksege = () => {
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

  const audioRef = useRef(null);
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
  }, []);

  // Try to play once userInteracted changes (will be true only after gesture)
  useEffect(() => {
    if (userInteracted && !audioPlayed) {
      console.log('User interacted - calling playHelloSound()');
      playHelloSound();
    }
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Modal handlers
  const openModal = (imageIndex) => {
    setSelectedImage(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToNextImage = () => {
    if (selectedImage < 9) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(1);
    }
  };

  const goToPrevImage = () => {
    if (selectedImage > 1) {
      setSelectedImage(selectedImage - 1);
    } else {
      setSelectedImage(9);
    }
  };

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowRight') {
          goToNextImage();
        } else if (e.key === 'ArrowLeft') {
          goToPrevImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, selectedImage]);

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

  // Check if first divider line is visible and start animation
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

  // Check if second divider line is visible and start animation
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

  // Check if third divider line is visible and start animation
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

  // Animation for nice/ugly SVGs
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

  // Animation for alternating kido images
  useEffect(() => {
    const interval = setInterval(() => setKidoImage(prev => prev === 'kido1' ? 'kido2' : 'kido1'), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container nagyi-page" onClick={handleUserInteraction}>
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
              <h1>Grandma's Bakery Project</h1>

              <div className="main-content-container">
                <div className="text-content">
                  <h2>How did Grandma's Bakery come to life?</h2>
                  <p>This was an independent practical project. The only thing I was sure about at the beginning was that I wanted to create a webshop. Then the bakery idea came up, since it felt less cliche. The final concept was inspired by an old red embroidered wall hanging with quotes that I found at my grandparents' house. That's how "Grandma's Bakery" was born, along with the hero section illustration.</p>
                 
                  <p>
                   I wanted the site to stay true to the idea of a grandmother—traditional, accessible, and easy to use for older people—yet still appealing and attention-grabbing for younger generations. That's why I included a humorous quote right at the beginning. My goal was to combine tradition with modern design.
                  </p>
                </div>

                <div className="image-content">
                  <div className="computer-with-video">
                    <img src="/images/computer.svg" alt="Computer displaying Grandma's Bakery" className="computer-frame" />
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
                        <source src="/images/nagyi.mov" type="video/mp4" />
                        <source src="/images/nagyi.mov" type="video/quicktime" />
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
                              if (videoRef.current) {
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
                    src={`/images/linen${animationCompletedRef.current ? 15 : lineSvgIndex}.svg`}
                    alt="Decorative divider line"
                    className="line-svg"
                  />
                </div>
              </div>

              <div className="second-section">
                <div className="comparison-container">
                  <div className="comparison-text">
                    <img 
                      src={`/images/nagyiill.svg`} 
                      alt="nagyiIllustration" 
                    />   
                    <h2>How does it look, and why like this?</h2>
                    <p>Since I enjoy making illustrations, I didn't hold back on including them throughout the site. The background idea came from old recipes—slightly yellowed, typed with an old typewriter—which also inspired one of the fonts. The second font has a slight Hungarian folk-tale feel, but since I didn't want to use the exact same style from fairy tales, I created one myself. I named it Hungarian First Class, because every child in Hungary learns to write with these letters at school—though I've never seen an adult actually write like that. For the color palette, I used natural beige and brown tones to reflect the atmosphere of a bakery. I always struggle with logos since I find it difficult to make them simple enough—but compared to my first attempt, I managed to really simplify it this time.</p>
                  </div>
                </div>
              </div>

              <div className="divider-line-container flipped" ref={secondDividerLineRef}>
                <div className="divider-line">
                  <img
                    src={`/images/linen${secondAnimationCompletedRef.current ? 15 : secondLineSvgIndex}.svg`}
                    alt="Decorative divider line"
                    className="line-svg flipped"
                  />
                </div>
              </div>

              <div className="third-section">
                <div className="design-process-row">
                  
                  <div className="design-column logos-column">
                    <h2>Logos</h2>
                    <div className="logo-item">
                      <div className="logo-with-background light-bg">
                        <img src="/images/nagyiold.svg" alt="Black and White Logo" className="process-logo" />
                      </div>
                    </div>
                    <div>
                        <img src="/images/nyildown.svg" alt="nyildown" className="process-logo" />
                      </div>
                    <div className="logo-item">
                      <div className="logo-with-background dark-bg">
                        <img src="/images/nagyinew.svg" alt="Colored Logo" className="process-logo" />
                      </div>
                    </div>
                    <img src={`/images/${kidoImage}.svg`} alt="Alternating kido image"/>
                  </div>

                  <div className="design-column text-column">
                    <h2>How Did I Make It? (The Design Process)</h2>
                    <p>For the color palette, I used natural beige and brown tones to reflect the atmosphere of a bakery. I always struggle with logos since I find it difficult to make them simple enough—but compared to my first attempt, I managed to really simplify it this time.</p>
                    
                    <p>I know how important wireframes are, but as a junior designer I was so eager to start that I didn't always plan everything in advance. Instead, I just focused on the next step. This might have been the first project where I really paid attention to UX. The biggest challenge was designing the ordering process. I tried to make everything clear, with obvious button labels and progress indicators showing exactly where the user is in the process—especially for impatient people like me.</p>
                    
                    <p>For the About Us section, I didn't want to overdo it, since I believe most visitors don't even open that page on these kinds of sites. For the FAQ section, I added a modern twist by presenting it in a dialogue style—similar to messaging apps, which people are used to scanning quickly. I also included a "like" button—something older users especially love—which I treated as a simple way to give positive feedback to the bakery.</p>
                  </div>

                  <div className="design-column balls-column">
                    <h2>Colors</h2>
                    <div className="ball-animation-container">
                      <img src="/images/B48C52.svg" alt="Animated ball" className="ball-animation" />
                      <div className="ball-hex-code">#B48C52</div>
                    </div>
                    <div className="ball-animation-container">
                      <img src="/images/27140F.svg" alt="Animated ball" className="ball-animation" />
                      <div className="ball-hex-code">#27140F</div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '30px', width: '100%' }}>
                      <h2>Fonts</h2>
                      <h3>American Typewriter</h3>
                      <div style={{
                        fontFamily: "'AmericanTypewriter', 'Courier New', monospace",
                        textAlign: 'center',
                        margin: '0 auto',
                        padding: '20px',
                        letterSpacing: '5px',
                        fontSize: 'clamp(16px, 2vw, 24px)',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        maxWidth: '800px'
                      }}>
                        aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ
                      </div>
                      <h3>Hungarian First Class</h3>
                      <div style={{
                        fontFamily: "'HungarianFirstClass', 'Times New Roman', serif",
                        textAlign: 'center',
                        margin: '0 auto',
                        padding: '20px',
                        letterSpacing: '5px',
                        fontSize: 'clamp(16px, 2vw, 24px)',
                        borderRadius: '10px',
                        maxWidth: '800px'
                      }}>
                        aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider-line-container" ref={thirdDividerLineRef}>
                  <div className="divider-line">
                    <img
                      src={`/images/linen${thirdAnimationCompletedRef.current ? 15 : thirdLineSvgIndex}.svg`}
                      alt="Decorative divider line"
                      className="line-svg"
                    />
                  </div>
                </div>

                <div className="project-gallery-section">
                  <h2>Project Gallery</h2>
                  
                  <div className="gallery-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div 
                        key={num} 
                        className="gallery-item"
                        onClick={() => openModal(num)}
                      >
                        <img 
                          src={`/images/nagyi${num}.png`} 
                          alt={`Grandma's Bakery screenshot ${num}`}
                          className="gallery-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modal for image preview */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-nav modal-prev" onClick={goToPrevImage}>
              ‹
            </button>
            <div className="modal-image-container">
              <img 
                src={`/images/nagyi${selectedImage}.png`} 
                alt={`Grandma's Bakery screenshot ${selectedImage}`}
                className="modal-image"
              />
            </div>
            <button className="modal-nav modal-next" onClick={goToNextImage}>
              ›
            </button>
            <div className="modal-counter">
              {selectedImage} / 9
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NagyiPeksege;