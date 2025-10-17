import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PetNanny.css';

const PetNanny = () => {
  const navigate = useNavigate();
  
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
  // Animation states for dog SVG
  const [dogSvgState, setDogSvgState] = useState('open');
  // State for alternating kido images
  const [kidoImage, setKidoImage] = useState('kido1');
  // State for pet animation
  const [petImageIndex, setPetImageIndex] = useState(1);
  const [petAnimationStarted, setPetAnimationStarted] = useState(false);

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

  // Pet animation - cycles through pet1.svg to pet11.svg
  useEffect(() => {
    const petInterval = setInterval(() => {
      setPetImageIndex(prevIndex => {
        if (prevIndex >= 11) {
          return 1; // Reset to pet1.svg
        } else {
          return prevIndex + 1; // Move to next pet image
        }
      });
    }, 800); // Change image every 800ms for slower animation

    return () => clearInterval(petInterval);
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

  // Animation for dog SVG - closed state shorter than open
  useEffect(() => {
    const timer = setTimeout(() => {
      setDogSvgState(prevState => {
        if (prevState === 'open') {
          return 'closed';
        } else {
          return 'open';
        }
      });
    }, dogSvgState === 'open' ? 1500 : 200); // Open: 1.5s, Closed: 0.5s

    return () => clearTimeout(timer);
  }, [dogSvgState]);

  // Animation for alternating kido images
  useEffect(() => {
    const interval = setInterval(() => {
      setKidoImage(prev => prev === 'kido1' ? 'kido2' : 'kido1');
    }, 500); // Change every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container petnanny-page">
      <div className="page-content">
        <div className="main-container">
          <div className="petnanny-content-container">
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
            
            <main className="petnanny-content">
              <h1>PetNanny Project</h1>
              
              <div className="main-content-container">
                {/* Text */}
                <div className="text-content">
                  <h2>What is PetNanny?</h2>
                  <p>The source of this idea was actually my own little companion. He would have loved a better organizer in his life. Well, I wanted one for him. 😄 I kept thinking, "If only there was a simple app for me to use to keep everything in the same spot: when he was walked, when his vet appointments were, or even when his deworming treatment was due." Thus, the idea for PetNanny was conceived.</p>
                 
                  <p>
                    The Goal: A digital babysitter that you could trust.

I wanted this app to act like a friend that I could trust: cute, but not too cute; smart, but not a know it all. A nice, clean, friendly, and smart digital helper that doesn't annoy you but actually assists you. Its vibe should feel automatically trustworthy - like you are handing your pet over to an experienced "pet nanny". 
                  </p>
                </div>

                {/* Image */}
                <div className="image-content">
                  <div className="project-image-container">
                    {/* Phone frame with pet animation inside */}
                    <div className="phone-frame">
                      <div className="phone-screen">
                        {/* Pet animation inside phone screen */}
                        <img 
                          src={`/images/pet${petImageIndex}.png`} 
                          alt="PetNanny App Animation" 
                          className="pet-animation" 
                        />
                      </div>
                      <img 
                        src="/images/phone.svg" 
                        alt="Phone Frame" 
                        className="phone-frame-image" 
                      />
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
                <div className="comparison-container">
                  {/* Bal oldal - váltakozó kutya SVG */}
                  <div className="comparison-image">
                    <img 
                      src={`/images/dog${dogSvgState === 'open' ? 'open' : 'closed'}.svg`} 
                      alt="Animated dog" 
                      className="comparison-svg"
                    />
                  </div>
                  
                  {/* Jobb oldal - szöveg */}
                  <div className="comparison-text">
                    <h2>The Challenge: Holding back the creative devil</h2>
                    <p>Now, this was the harder part. I easily get caught up in the flow and start brainstorming all sorts of cool but complex features. Here, however, I had to consciously fight with myself: "Don't overcomplicate it!" The main goal was for every single button, menu, and reminder to be instantly understandable and easy to find. Minimalism won!</p>
                    
                    
                    {/* cmmel és s-ziveggel SVG-k a szöveg alatt */}
                   
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
                    <h2>App Icons</h2>
                    <div className="logo-item">
                      
                        <img src="/images/petlogoblack.svg" alt="PetNanny App Icon" className="process-logo" />
                      
                    </div>
                    <div className="logo-item">
                      
                        <img src="/images/petlogo.svg" alt="Colored PetNanny Icon" className="process-logo" />
                     
                    </div>
                    <img src={`/images/${kidoImage}.svg`} alt="Alternating kido image"/>
                  </div>

                  {/* Text column */}
                  <div className="design-column text-column">
                    <h2>The Solution: Simplicity and kindness</h2>
                    
                <p>So, during the design process, I prioritized simplicity and a warm atmosphere. My motto became "click and done." Well-considered icons, a logical menu structure, and colors that don't scream at you but greet you with a smile. The best part was successfully combining these two things—usability and the "good feeling."</p>
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
                      <div className="ball-hex-code">#4fc3f7</div>
                    </div>
                    
                    <div className="ball-animation-container">
                      <img 
                        src="/images/paca.svg" 
                        alt="Animated ball" 
                        className="ball-animation"
                      />
                      <div className="ball-hex-code">#81c784</div>
                    </div>

                    <div className="ball-animation-container">
                      <img 
                        src="/images/paca.svg" 
                        alt="Animated ball" 
                        className="ball-animation"
                      />
                      <div className="ball-hex-code">#fff176</div>
                    </div>
                    
                    {/* Centered font text */}
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '30px',
                      width: '100%'
                    }}>
                      <h2>Font</h2>
                      <h2>Nunito Sans</h2>
                      <h3 style={{
                        fontFamily: "Nunito Sans, sans-serif",
                        textAlign: 'center',
                        margin: '0 auto',
                        padding: '20px',
                        letterSpacing: '2px'
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
                      <img src="/images/petnanny-sketch.png" alt="PetNanny Sketch" className="design-process-img" />
                      <p>Initial Sketch</p>
                    </div>
                    <img 
                      src="/images/nyil.svg" 
                      alt="Arrow"
                    />
                    <div className="image-with-caption">
                      <img src="/images/petnanny-wireframe.png" alt="PetNanny Wireframe" className="design-process-img" />
                      <p>Wireframe</p>
                    </div>
                    <img 
                      src="/images/nyil.svg" 
                      alt="Arrow"
                    />
                    <div className="image-with-caption">
                      <img src="/images/petnanny-final.png" alt="PetNanny Final Design" className="design-process-img" />
                      <p>Final Design</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third divider line */}
              <div className="divider-line-container" ref={thirdDividerLineRef}>
                <div className="divider-line">
                  <img 
                    src={`/images/line${thirdAnimationCompletedRef.current ? 15 : thirdLineSvgIndex}.svg`} 
                    alt="Decorative divider line" 
                    className="line-svg"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetNanny;