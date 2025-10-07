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
  // Animation states for comparison SVGs
  const [niceSvgState, setNiceSvgState] = useState('open');
  const [uglySvgState, setUglySvgState] = useState('open');
  // State for alternating kido images
  const [kidoImage, setKidoImage] = useState('kido1');

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
                  <p>PetNanny is a comprehensive pet care application designed to make pet ownership easier and more organized. The app helps pet owners manage everything from feeding schedules to veterinary appointments, all in one convenient place.</p>
                 
                  <p>
                    The goal was to create an intuitive interface that even the least tech-savvy pet owners could navigate easily, while providing powerful features for those who want more control over their pet's care routine.
                  </p>
                </div>

                {/* Image */}
                <div className="image-content">
                  <div className="project-image-container">
                    <img src="/images/petcard.svg" alt="PetNanny App" className="project-image" />
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
                  <div className="comparison-text">
                    <img 
                      src={`/images/petnanny-illustration.svg`} 
                      alt="PetNanny Illustration" 
                    />   
                    <h2>Design Philosophy</h2>
                    <p>Since pets are part of the family, I wanted the design to feel warm, friendly, and approachable. The color palette was chosen to evoke feelings of care and comfort, with soft blues and greens that are easy on the eyes. The illustrations throughout the app feature cute, stylized animals to create an emotional connection with users.</p>
                    <p>The interface prioritizes simplicity and clarity. Important information like medication schedules and vet appointments are highlighted, while secondary features are easily accessible but don't clutter the main views. The typography is clean and highly readable, ensuring that critical pet care information is never missed.</p>
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
                      <div className="logo-with-background light-bg">
                        <img src="/images/petnanny-icon.svg" alt="PetNanny App Icon" className="process-logo" />
                      </div>
                    </div>
                    <div className="logo-item">
                      <div className="logo-with-background dark-bg">
                        <img src="/images/petnanny-icon-colored.svg" alt="Colored PetNanny Icon" className="process-logo" />
                      </div>
                    </div>
                    <img src={`/images/${kidoImage}.svg`} alt="Alternating kido image"/>
                  </div>

                  {/* Text column */}
                  <div className="design-column text-column">
                    <h2>Development Process</h2>
                    <p>Started with user research and pet owner interviews, then moved to wireframes and prototyping.</p>
                    
                    <h3>Key Features:</h3>
                    <ul>
                      <li><strong>Feeding Schedule:</strong> Customizable feeding times and portion tracking</li>
                      <li><strong>Health Records:</strong> Vaccination history and medical records</li>
                      <li><strong>Medication Reminders:</strong> Never miss a dose with smart notifications</li>
                      <li><strong>Vet Appointments:</strong> Schedule and manage veterinary visits</li>
                      <li><strong>Multiple Pets:</strong> Support for households with multiple animals</li>
                    </ul>
                    
                    <h3>User Experience:</h3>
                    <ul>
                      <li><strong>Onboarding:</strong> Simple setup process for new users</li>
                      <li><strong>Dashboard:</strong> At-a-glance overview of all pet activities</li>
                      <li><strong>Notifications:</strong> Smart reminders that adapt to your schedule</li>
                      <li><strong>Accessibility:</strong> Designed with all users in mind</li>
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetNanny;