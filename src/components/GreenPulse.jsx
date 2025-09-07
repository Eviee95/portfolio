// GreenPulse.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const GreenPulse = () => {
  const navigate = useNavigate();
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Mouse position state for eye tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chameleonRef = useRef(null);
  const eyeContainerRef = useRef(null);
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

  const handleGoBack = () => {
    navigate("/"); // Vissza navigálás a főoldalra (Hero)
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  // Track mouse movement for eye animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if first divider line is visible and start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted && !animationCompleted) {
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
  }, [animationStarted, animationCompleted]);

  // Check if second divider line is visible and start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !secondAnimationStarted && !secondAnimationCompleted) {
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
  }, [secondAnimationStarted, secondAnimationCompleted]);

  // Calculate eye position based on mouse position
  const calculateEyePosition = () => {
    if (!chameleonRef.current || !eyeContainerRef.current) return { x: 0, y: 0 };
    
    const eyeContainerRect = eyeContainerRef.current.getBoundingClientRect();
    
    const eyeCenterX = eyeContainerRect.left + eyeContainerRect.width / 2;
    const eyeCenterY = eyeContainerRect.top + eyeContainerRect.height / 2;
    
    const deltaX = mousePosition.x - eyeCenterX;
    const deltaY = mousePosition.y - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    
    const maxDistance = eyeContainerRect.width / 4;
    const distance = Math.min(maxDistance, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15);
    
    const eyeX = Math.cos(angle) * distance;
    const eyeY = Math.sin(angle) * distance;
    
    return { x: eyeX, y: eyeY };
  };

  return (
    <div className="greenpulse-page">
      {/* Header */}
      <div className="header">
        <img src="/images/logo.svg" alt="Logo" className="header-logo" />
        <nav className="header-nav">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToHome();
            }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              navigateToHome();
              setTimeout(() => scrollToSection("about"), 100);
            }}
          >
            About Me
          </a>
          
          {/* Dropdown */}
          <div className="dropdown">
            <button 
              className="dropdown-toggle"
              onClick={toggleDropdown}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              My Projects
              <img 
                src="/images/arrow-down.svg" 
                alt="Dropdown arrow" 
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
              />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToHome();
                    setTimeout(() => scrollToSection("projects"), 100);
                    setIsDropdownOpen(false);
                  }}
                >
                  All Projects
                </a>
                <a
                  href="#greenpulse"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDropdownOpen(false);
                  }}
                  style={{backgroundColor: '#f0f0f0', fontWeight: 'bold'}}
                >
                  GreenPulse
                </a>
              </div>
            )}
          </div>
          
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigateToHome();
              setTimeout(() => scrollToSection("contact"), 100);
            }}
          >
            Contact
          </a>
        </nav>
      </div>
      
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

            {/* Chameleon */}
            <div className="image-content">
              <div className="chameleon-container" ref={chameleonRef}>
                <img src="/images/kameleon.svg" alt="GreenPulse Chameleon Mascot" className="chameleon-body" />
                <div className="eye-container" ref={eyeContainerRef}>
                  <img 
                    src="/images/kameleoneye.svg" 
                    alt="Chameleon eye" 
                    className="pupil" 
                    style={{ 
                      transform: `translate(${calculateEyePosition().x}px, ${calculateEyePosition().y}px)` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* First divider line */}
          <div className="divider-line-container" ref={dividerLineRef}>
            <div className="divider-line">
              <img 
                src={`/images/line${lineSvgIndex}.svg`} 
                alt="Decorative divider line" 
                className="line-svg"
              />
            </div>
          </div>
          
          {/* Second section */}
          <div className="second-section">
            <h2>What was wrong with the old version? (Which obviously doesn't exist 😊)</h2>
            <p>Well, there were some issues...</p>
            <ul>
              <li>You couldn't understand in 5 seconds who they are and what they want. That's a problem. If a CFO doesn't get it quickly, they bounce.</li>
              <li>Zero trust. No numbers, no stories, no reviews, nothing. It felt like they were just making promises.</li>
              <li>The design looked like it was made in 2005. But they're a cool AT & IoT startup, not a corner shop.</li>
            </ul>
            <p>They didn't tell me what to do. There was no clear button for "request a demo".</p>
          </div>

          {/* Second divider line - flipped */}
          <div className="divider-line-container flipped" ref={secondDividerLineRef}>
            <div className="divider-line">
              <img 
                src={`/images/line${secondLineSvgIndex}.svg`} 
                alt="Decorative divider line" 
                className="line-svg flipped"
              />
            </div>
          </div>

          {/* Third section - Design Process */}
          <div className="third-section">
            <div className="design-process-container">
              {/* Image on the left */}
              <div className="design-image-content">
                <img src="/images/design-process.svg" alt="Design process illustration" className="design-process-image" />
              </div>

              {/* Text on the right */}
              <div className="design-text-content">
                <h2>How Did I Make It? (The Design Process)</h2>
                <p>First, I sketched a wireframe on paper to plan where everything goes. Very basic. Then I moved to Figma.</p>
                
                <h3>Structure:</h3>
                <ul>
                  <li><strong>Top (Hero):</strong> The main point in one sentence + a big red "Request a Demo" button.</li>
                  <li><strong>Middle (Features):</strong> Three sections: MEASURE → ANALYZE → SAVE. A simple icon for each.</li>
                  <li><strong>Testimonials:</strong> I put (fake) customer quotes here with concrete numbers. "30% savings in one month!" – stuff like that.</li>
                  <li><strong>About:</strong> That they're from Budapest, and what their mission is. So they aren't just a faceless company.</li>
                  <li><strong>Contact:</strong> Another CTA button, and contact info.</li>
                </ul>
                
                <h3>Look & Feel:</h3>
                <ul>
                  <li><strong>Colors:</strong> Green. But not a boring green, different shades. The chameleon is green too, so it ties everything together.</li>
                  <li><strong>Icons:</strong> Super simple. A chart, a coin, a gauge. Everyone gets it.</li>
                  <li><strong>Typography:</strong> Headlines are bold and eye-catching, and the buttons have contrast so you have to click them.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .greenpulse-page {
          min-height: 100vh;
          background: url('/images/background.jpg') center center / cover no-repeat;
          font-family: DiaryOfAWimpyKidFont, sans-serif;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 7vw;
          font-size: clamp(1.3rem, 2vw, 2.2rem);
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .header-logo {
          width: clamp(80px, 8vw, 120px);
          height: auto;
        }
        
        .header-nav {
          display: flex;
          gap: clamp(18px, 4vw, 40px);
          align-items: center;
        }
        
        .header-nav a {
          color: black;
          text-decoration: none;
        }
        
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-toggle {
          background: none;
          border: none;
          font-family: DiaryOfAWimpyKidFont, sans-serif;
          font-size: clamp(1.3rem, 2vw, 2.2rem);
          font-weight: bold;
          text-transform: uppercase;
          color: black;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .dropdown-arrow {
          width: 14px;
          height: 14px;
          transition: transform 0.3s ease;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 2px solid black;
          border-radius: 8px;
          padding: 10px 0;
          min-width: 180px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .dropdown-menu a {
          display: block;
          padding: 8px 16px;
          color: black;
          text-decoration: none;
          font-size: 1.2rem;
        }
        
        .dropdown-menu a:hover {
          background-color: #f0f0f0;
        }
        
        .greenpulse-content-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 5vw;
          max-width: 1600px;
          margin: 0 auto;
          box-sizing: border-box;
          width: 100%;
        }
        
        .back-button-container {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .back-button-img {
          width: 240px;
          max-width: 60vw;
          height: auto;
          cursor: pointer;
          transition: filter 0.13s cubic-bezier(.65,.05,.36,1), transform 0.13s cubic-bezier(.65,.05,.36,1);
          outline: none;
        }
        
        .back-button-img.pressed, .back-button-img:active {
          transform: translateY(8px);
          filter: brightness(0.85);
        }
        
        .back-button-img:focus {
          filter: brightness(1.04);
        }
        
        .greenpulse-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .greenpulse-content h1 {
          font-size: 2.5rem;
          margin: 0 0 40px 0;
          text-align: center;
        }
        
        .main-content-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 60px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .text-content {
          flex: 1;
          max-width: 700px;
        }
        
        .text-content h2 {
          font-size: clamp(24px, 3vw, 36px);
          margin-top: 0;
          color: #2e7d32;
        }
        
        .text-content p {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
        }
        
        .text-content ul {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
          margin: 15px 0;
          padding-left: 20px;
        }
        
        .image-content {
          flex: 1;
          display: flex;
          justify-content: right;
          align-items: center;
          max-width: 600px;
        }
        
        .chameleon-container {
          position: relative;
          width: 100%;
          max-width: 500px;
        }
        
        .chameleon-body {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
        }
        
        .eye-container {
          position: absolute;
          width: 12%;
          height: 12%;
          top: 20%;
          left: 68%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }
        
        .pupil {
          width: 60%;
          height: 60%;
          transition: transform 0.1s ease-out;
        }
        
        .divider-line-container {
          width: 100%;
          max-width: 1000px;
          margin: 60px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
        
        .divider-line {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .line-svg {
          width: 100%;
          height: 180px;
          object-fit: fill;
        }
        
        .line-svg.flipped {
          transform: scaleY(-1);
        }
        
        .second-section {
          max-width: 800px;
          width: 100%;
          text-align: center;
          margin-top: 40px;
        }
        
        .second-section h2 {
          font-size: clamp(24px, 3vw, 36px);
          margin-top: 0;
          color: #2e7d32;
        }
        
        .second-section p {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
        }
        
        .second-section ul {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
          margin: 15px 0;
          padding-left: 20px;
          text-align: left;
        }
        
        /* Third section - Design Process */
        .third-section {
          width: 100%;
          max-width: 1400px;
          margin: 40px auto 40px;
        }
        
        .design-process-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 60px;
          width: 100%;
        }
        
        .design-image-content {
          flex: 1;
          display: flex;
          justify-content: left;
          align-items: center;
          max-width: 600px;
        }
        
        .design-process-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          max-width: 500px;
        }
        
        .design-text-content {
          flex: 1;
          max-width: 700px;
        }
        
        .design-text-content h2 {
          font-size: clamp(24px, 3vw, 36px);
          margin-top: 0;
          color: #2e7d32;
        }
        
        .design-text-content h3 {
          font-size: clamp(20px, 2.5vw, 30px);
          color: #2e7d32;
          margin-top: 25px;
        }
        
        .design-text-content p {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
        }
        
        .design-text-content ul {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.6;
          margin: 15px 0;
          padding-left: 20px;
        }
        
        .design-text-content li {
          margin-bottom: 10px;
        }
        
        @media (max-width: 1200px) {
          .main-content-container {
            flex-direction: column;
            align-items: center;
            gap: 50px;
          }
          
          .design-process-container {
            flex-direction: column;
            align-items: center;
            gap: 50px;
          }
          
          .text-content, .image-content, .design-text-content, .design-image-content {
            max-width: 90%;
          }
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .greenpulse-content h1 {
            font-size: 2rem;
            margin: 0 0 30px 0;
          }
          
          .greenpulse-content-container {
            padding: 20px 4vw;
          }
          
          .text-content, .image-content, .design-text-content, .design-image-content {
            max-width: 100%;
          }
          
          .eye-container {
            top: 22%;
            left: 63%;
            width: 14%;
            height: 14%;
          }
          
          .divider-line-container {
            margin: 40px 0;
            min-height: 150px;
          }
          
          .line-svg {
            height: 140px;
          }
        }

        @media (max-width: 480px) {
          .text-content, .image-content, .design-text-content, .design-image-content {
            max-width: 100%;
          }
          
          .eye-container {
            top: 20%;
            left: 61%;
          }
          
          .divider-line-container {
            min-height: 120px;
            margin: 30px 0;
          }
          
          .line-svg {
            height: 110px;
          }
        }
      `}</style>
    </div>
  );
};

export default GreenPulse;