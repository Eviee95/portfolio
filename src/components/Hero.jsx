import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [currentGirl, setCurrentGirl] = useState(1);
  const [currentContactFrame, setCurrentContactFrame] = useState(1);
  const [aboutBtnDown, setAboutBtnDown] = useState(false);
  const [sendBtnDown, setSendBtnDown] = useState(false);
  
  // Footer animation state
  const [footerFrame, setFooterFrame] = useState(1);
  const [footerPlayed, setFooterPlayed] = useState(false);
  
  // New guy animation state
  const [currentGuyFrame, setCurrentGuyFrame] = useState(1);

  // Magic hover animation states for each card
  const [isHovering, setIsHovering] = useState([false, false, false]);
  const [currentMagicFrame, setCurrentMagicFrame] = useState([1, 1, 1]);
  const [animationComplete, setAnimationComplete] = useState([false, false, false]);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Thanks animation state
  const [currentThanksFrame, setCurrentThanksFrame] = useState(1);

  // Navigation hook
  const navigate = useNavigate();

  // Animation settings
  const totalFrames = 8;
  const fps = 6;
  const girlSwitchInterval = 500;
  const totalContactFrames = 6;
  const contactFps = 3;
  const totalFooterFrames = 11;
  const footerFps = 5;
  
  // New guy animation settings
  const totalGuyFrames = 8;
  const guyFps = 3;

  // Magic animation settings
  const totalMagicFrames = 7;
  const magicFps = 10;
  const magicResetDelay = 1000;

  // Thanks animation settings
  const totalThanksFrames = 5;
  const thanksFps = 3;

  // Main frame-by-frame animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % totalFrames) + 1);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [totalFrames, fps]);

  // Ping-pong animation for girl image
  useEffect(() => {
    const girlInterval = setInterval(() => {
      setCurrentGirl((prev) => (prev === 1 ? 2 : 1));
    }, girlSwitchInterval);

    return () => clearInterval(girlInterval);
  }, [girlSwitchInterval]);

  // Contact frame-by-frame animation
  useEffect(() => {
    const contactInterval = setInterval(() => {
      setCurrentContactFrame((prev) => (prev % totalContactFrames) + 1);
    }, 1000 / contactFps);

    return () => clearInterval(contactInterval);
  }, [totalContactFrames, contactFps]);

  // Guy frame-by-frame animation
  useEffect(() => {
    const guyInterval = setInterval(() => {
      setCurrentGuyFrame((prev) => (prev % totalGuyFrames) + 1);
    }, 1000 / guyFps);

    return () => clearInterval(guyInterval);
  }, [totalGuyFrames, guyFps]);

  // Thanks frame-by-frame animation
  useEffect(() => {
    const thanksInterval = setInterval(() => {
      setCurrentThanksFrame((prev) => (prev % totalThanksFrames) + 1);
    }, 1000 / thanksFps);

    return () => clearInterval(thanksInterval);
  }, [totalThanksFrames, thanksFps]);

  // Magic hover animation for each card
  useEffect(() => {
    const intervals = [];
    const timeouts = [];
    
    isHovering.forEach((hovering, index) => {
      if (hovering) {
        const interval = setInterval(() => {
          setCurrentMagicFrame(prev => {
            const newFrames = [...prev];
            if (newFrames[index] < totalMagicFrames) {
              newFrames[index] += 1;
            } else {
              setAnimationComplete(prevComplete => {
                const newComplete = [...prevComplete];
                newComplete[index] = true;
                return newComplete;
              });
              clearInterval(interval);
              
              const timeout = setTimeout(() => {
                setCurrentMagicFrame(prev => {
                  const newResetFrames = [...prev];
                  newResetFrames[index] = 1;
                  return newResetFrames;
                });
                setAnimationComplete(prevComplete => {
                  const newComplete = [...prevComplete];
                  newComplete[index] = false;
                  return newComplete;
                });
              }, magicResetDelay);
              
              timeouts.push(timeout);
            }
            return newFrames;
          });
        }, 1000 / magicFps);
        
        intervals.push(interval);
      } else {
        setCurrentMagicFrame(prev => {
          const newFrames = [...prev];
          newFrames[index] = 1;
          return newFrames;
        });
        setAnimationComplete(prevComplete => {
          const newComplete = [...prevComplete];
          newComplete[index] = false;
          return newComplete;
        });
      }
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isHovering, totalMagicFrames, magicFps, magicResetDelay]);

  // Footer observer
  useEffect(() => {
    const footerElement = document.querySelector(".footer");
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !footerPlayed) {
          setTimeout(() => {
            setFooterPlayed(true);
          }, 500);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, [footerPlayed]);

  // Footer frame-by-frame animation
  useEffect(() => {
    if (!footerPlayed) return;
    
    const startTimeout = setTimeout(() => {
      setFooterFrame(1);
      let frame = 1;
      const interval = setInterval(() => {
        frame++;
        if (frame <= totalFooterFrames) {
          setFooterFrame(frame);
        }
        if (frame === totalFooterFrames) {
          clearInterval(interval);
        }
      }, 1000 / footerFps);

      return () => {
        clearInterval(interval);
        clearTimeout(startTimeout);
      };
    }, 200);
  }, [footerPlayed]);

  const handleAboutBtnDown = () => setAboutBtnDown(true);
  const handleAboutBtnUp = () => setAboutBtnDown(false);

  const handleSendBtnDown = () => setSendBtnDown(true);
  const handleSendBtnUp = () => setSendBtnUp(false);

  const handleMagicHover = (index) => {
    setIsHovering(prev => {
      const newHovering = [...prev];
      newHovering[index] = true;
      return newHovering;
    });
  };

  const handleMagicLeave = (index) => {
    setIsHovering(prev => {
      const newHovering = [...prev];
      newHovering[index] = false;
      return newHovering;
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToGreenPulse = () => {
    navigate("/greenpulse");
  };

  return (
    <div id="home" className="hero-root">
      {/* Header navigation and logo */}
      <div className="header">
        <img src="/images/logo.svg" alt="Logo" className="header-logo" />
        <nav className="header-nav">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            About Me
          </a>
          
          {/* Dropdown for My Projects */}
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
                    scrollToSection("projects");
                    setIsDropdownOpen(false);
                  }}
                >
                  All Projects
                </a>
                <a
                  href="#greenpulse"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToGreenPulse();
                    setIsDropdownOpen(false);
                  }}
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
              scrollToSection("contact");
            }}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Main container */}
      <div className="main-container">
        {/* 1. Main frame-by-frame animation with postit overlay */}
        <div className="main-frame">
          <img
            src={`/images/${currentFrame}.svg`}
            alt={`Animation frame ${currentFrame}`}
            className="main-animation-img"
          />
          {/* Responsive postit stack */}
          <div className="postit-stack">
            <img src="/images/postit.png" alt="Postit" className="postit-img" />
            <img src="/images/postit.svg" alt="Postit SVG" className="postit-svg-img" />
          </div>
        </div>

        {/* 2. About Me section with ping-pong girl */}
        <div id="about" className="about-section">
          <img src={`/images/girl${currentGirl}.svg`} alt="Girl" className="about-img" />
          <div className="about-text">
            <h1>About Me</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            {/* AboutMeButton SVG below the text, billentyűzet-gomb hatással */}
            <div className="aboutme-button-wrap">
              <img
                src="/images/aboutmebutton.svg"
                alt="About Me Button"
                className={`aboutme-button-img${aboutBtnDown ? " pressed" : ""}`}
                tabIndex={0}
                onPointerDown={handleAboutBtnDown}
                onPointerUp={handleAboutBtnUp}
                onPointerLeave={handleAboutBtnUp}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") handleAboutBtnDown();
                }}
                onKeyUp={(e) => {
                  if (e.key === " " || e.key === "Enter") handleAboutBtnUp();
                }}
                aria-pressed={aboutBtnDown}
                role="button"
              />
            </div>
          </div>
        </div>

        {/* 3. My Projects section with green pulse effect - ENHANCED CARDS AND MAGIC */}
        <div id="projects" className="projects-section">
          {/* Bal kártya */}
          <div className="project-item">
            <img
              src="/images/arrow-right.svg"
              alt="Left"
              style={{ transform: "scaleX(-1)" }}
              className="arrow-img"
            />

            <div 
              className="card-magic-container"
              onMouseEnter={() => handleMagicHover(0)}
              onMouseLeave={() => handleMagicLeave(0)}
            >
              {/* Magic animáció a kártya fölött - LARGER */}
              <div className="magic-container">
                <img 
                  src={`/images/magic${animationComplete[0] ? 1 : currentMagicFrame[0]}.svg`} 
                  alt="Magic Effect" 
                  className="magic-img" 
                />
              </div>

              <div className="card-container">
                <img src="/images/card.svg" alt="Card 1" className="project-card" />
                <img src="/images/greenpulse.png" alt="Green Pulse" className="greenpulse-img" />
              </div>
            </div>
          </div>

          {/* Középső kártya */}
          <div className="project-item">
            <div 
              className="card-magic-container center-card"
              onMouseEnter={() => handleMagicHover(1)}
              onMouseLeave={() => handleMagicLeave(1)}
            >
              <div className="magic-container">
                <img 
                  src={`/images/magic${animationComplete[1] ? 1 : currentMagicFrame[1]}.svg`} 
                  alt="Magic Effect" 
                  className="magic-img" 
                />
              </div>

              <div className="card-container">
                <img src="/images/card.svg" alt="Card 2" className="project-card" />
                <img src="/images/greenpulse.png" alt="Green Pulse" className="greenpulse-img" />
              </div>
            </div>
          </div>

          {/* Jobb kártya */}
          <div className="project-item">
            <div 
              className="card-magic-container"
              onMouseEnter={() => handleMagicHover(2)}
              onMouseLeave={() => handleMagicLeave(2)}
            >
              <div className="magic-container">
                <img 
                  src={`/images/magic${animationComplete[2] ? 1 : currentMagicFrame[2]}.svg`} 
                  alt="Magic Effect" 
                  className="magic-img" 
                />
              </div>

              <div className="card-container">
                <img src="/images/card.svg" alt="Card 3" className="project-card" />
                <img src="/images/greenpulse.png" alt="Green Pulse" className="greenpulse-img" />
              </div>
            </div>

            <img src="/images/arrow-right.svg" alt="Right" className="arrow-img" />
          </div>
        </div>

        {/* 4. Contact section with faster animation */}
        <div id="contact" className="contact-section stain-relative">
          {/* Coffee stain PNG over the contact section */}
          <img src="/images/coffeestain.png" alt="Coffee stain" className="coffeestain-contact-img" />
          <form
            className="contact-form"
            onSubmit={handleSendMessage}
          >
            <h1>Contact Me</h1>
            <input type="text" placeholder="Name" required className="contact-input" />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required rows={5} />
            
            {/* Send button replaced with send.svg - centered */}
            <div className="send-button-container">
              <img
                src="/images/send.svg"
                alt="Send"
                className={`send-button-img${sendBtnDown ? " pressed" : ""}`}
                onClick={handleSendMessage}
                tabIndex={0}
                onPointerDown={handleSendBtnDown}
                onPointerUp={handleSendBtnUp}
                onPointerLeave={handleSendBtnUp}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") handleSendBtnDown();
                }}
                onKeyUp={(e) => {
                  if (e.key === " " || e.key === "Enter") handleSendBtnUp();
                }}
                aria-pressed={sendBtnDown}
                role="button"
                style={{ cursor: 'pointer' }}
              />
            </div>
            
            <div className="social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook.svg" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/discord.svg" alt="Discord" className="social-icon" />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/dribbble.svg" alt="Dribbble" className="social-icon" />
              </a>
            </div>
          </form>
          <div className="contact-img-col">
            <img
              src={`/images/contact${currentContactFrame}.svg`}
              alt="Contact"
              className="contact-animation-img"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          {/* Pencil on the right side - VERY BIG */}
          <img src="/images/pencil.png" alt="Pencil" className="footer-pencil" />
          
          {/* Eraser on the left side - VERY BIG */}
          <img src="/images/eraser.png" alt="Eraser" className="footer-eraser" />
          
          <div className="footer-content-wrapper">
            <div className="footer-thanks-animation">
              <img
                src={`/images/thanks${currentThanksFrame}.svg`}
                alt={`Thanks frame ${currentThanksFrame}`}
                className="thanks-animation-img"
              />
            </div>
            <div className="footer-img-wrap">
              <img
                src={`/images/footer${footerFrame}.svg`}
                alt={`Footer frame ${footerFrame}`}
                className="footer-animation-img"
              />
            </div>
            {/* New guy animation on the right - positioned lower */}
            <div className="footer-guy-wrap">
              <img
                src={`/images/guy${currentGuyFrame}.svg`}
                alt={`Guy frame ${currentGuyFrame}`}
                className="guy-animation-img"
              />
            </div>
          </div>
          <div className="footer-links">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              About Me
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
            >
              My Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Responsive styles and background image */}
      <style>{`
        html, body {
          width: 100vw;
          overflow-x: hidden;
        }
        
        .hero-root {
          min-height: 100vh;
          width: 100vw;
          background: url('/images/background.jpg') center center / cover no-repeat;
          font-family: DiaryOfAWimpyKidFont, sans-serif;
          box-sizing: border-box;
          overflow-x: hidden;
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
        
        /* Dropdown styles */
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
          padding: 0;
          margin: 0;
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
        
        .main-container {
          margin: 0 auto;
          max-width: 1800px;
          width: 100%;
          padding-left: 7vw;
          padding-right: 7vw;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        
        .main-frame {
          margin-top: 2vw;
          position: relative;
        }
        
        .main-animation-img {
          display: block;
          margin: 0 auto;
          width: 100%;
          max-width: 1800px;
          height: auto;
          object-fit: contain;
          image-rendering: pixelated;
        }
        
        .postit-stack {
          position: absolute;
          top: 20%;
          left: 30%;
          transform: translate(-50%, -50%);
          width: 46vw;
          max-width: 400px;
          min-width: 180px;
          aspect-ratio: 1/1;
          z-index: 10;
        }
        
        .postit-img, .postit-svg-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }
        
        .postit-img {
          z-index: 1;
        }
        
        .postit-svg-img {
          z-index: 2;
        }
        
        /* About Me Button styling - only press effect, no border, no shadow */
        .aboutme-button-wrap {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-top: 22px;
        }
        
        .aboutme-button-img {
          width: 240px;
          max-width: 60vw;
          height: auto;
          cursor: pointer;
          transition: filter 0.13s cubic-bezier(.65,.05,.36,1), transform 0.13s cubic-bezier(.65,.05,.36,1);
          outline: none;
        }
        
        .aboutme-button-img.pressed, .aboutme-button-img:active {
          transform: translateY(8px);
          filter: brightness(0.85);
        }
        
        .aboutme-button-img:focus {
          filter: brightness(1.04);
        }
        
        /* Send Button styling - centered */
        .send-button-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 22px;
        }
        
        .send-button-img {
          width: 240px;
          max-width: 60vw;
          height: auto;
          cursor: pointer;
          transition: filter 0.13s cubic-bezier(.65,.05,.36,1), transform 0.13s cubic-bezier(.65,.05,.36,1);
          outline: none;
        }
        
        .send-button-img.pressed, .send-button-img:active {
          transform: translateY(8px);
          filter: brightness(0.85);
        }
        
        .send-button-img:focus {
          filter: brightness(1.04);
        }
        
        /* Coffee stain on contact section - BIGGER! */
        .stain-relative {
          position: relative;
        }
        
        .coffeestain-contact-img {
          position: absolute;
          top: -80px;
          left: 0;
          width: 540px;
          height: 540px;
          z-index: 2;
          pointer-events: none;
          opacity: 0.72;
          mix-blend-mode: multiply;
        }
        
        /* Card container for green pulse effect - ENHANCED SIZE */
        .card-container {
          position: relative;
          display: inline-block;
        }
        
        .greenpulse-img {
          position: absolute;
          top: 49%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: auto;
          z-index: -1;
        }
        
        /* NEW: Container for both magic effect and card - ENHANCED SIZE */
        .card-magic-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        
        /* Magic effect container - positioned above the card - ENHANCED SIZE */
        .magic-container {
          position: relative;
          margin-bottom: -30px; /* Increased overlap with the card */
          z-index: 10;
        }
        
        .magic-img {
          width: 280px; /* Reduced from 350px */
          height: auto;
        }
        
        /* Project card - ENHANCED SIZE */
        .project-card {
          width: 100%;
          max-width: 320px; /* Reduced from 400px */
          position: relative;
          z-index: 2;
        }
        
        .center-card {
          max-width: 400px; /* Reduced from 500px */
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
          100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
        }
        
        /* Projects section - UPDATED TO KEEP CARDS IN ONE ROW WITH LARGER GAPS */
        .projects-section {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(40px, 8vw, 100px); /* Increased gap between cards */
          margin: clamp(24px, 8vw, 60px) 0 clamp(80px, 15vw, 140px) 0;
          padding: 0 clamp(10px, 3vw, 20px);
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        
        .projects-section::-webkit-scrollbar {
          display: none;
        }
        
        .project-item {
          display: flex;
          align-items: center;
          gap: clamp(40px, 5vw, 80px); /* Increased gap between arrows and cards */
          position: relative;
          flex: 0 0 auto;
        }
        
        .arrow-img {
          width: clamp(40px, 4vw, 60px); /* Increased arrow size */
          flex-shrink: 0;
        }
        
        @media (max-width: 1100px) {
          .postit-stack {
            width: 36vw;
            max-width: 300px;
            min-width: 120px;
          }
          
          .aboutme-button-img, .send-button-img {
            width: 180px;
          }
          
          .coffeestain-contact-img {
            width: 340px;
            height: 340px;
            top: -36px;
            left: 0;
          }
          
          .magic-img {
            width: 220px; /* Reduced from 280px */
          }
          
          .project-card {
            max-width: 280px; /* Reduced from 350px */
          }
          
          .center-card {
            max-width: 350px; /* Reduced from 450px */
          }
          
          .projects-section {
            gap: clamp(30px, 6vw, 80px); /* Adjusted for medium screens */
          }
          
          .project-item {
            gap: clamp(30px, 4vw, 60px); /* Adjusted for medium screens */
          }
          
          .arrow-img {
            width: clamp(35px, 3.5vw, 50px); /* Adjusted for medium screens */
          }
        }
        
        @media (max-width: 850px) {
          .postit-stack {
            width: 40vw;
            max-width: 230px;
            min-width: 90px;
          }
          
          .aboutme-button-img, .send-button-img {
            width: 150px;
          }
          
          .coffeestain-contact-img {
            width: 180px;
            height: 180px;
            top: -8px;
            left: 0;
          }
          
          .magic-img {
            width: 180px; /* Reduced from 220px */
          }
          
          .project-card {
            max-width: 240px; /* Reduced from 300px */
          }
          
          .center-card {
            max-width: 300px; /* Reduced from 380px */
          }
          
          .projects-section {
            gap: clamp(25px, 5vw, 60px); /* Adjusted for smaller screens */
          }
          
          .project-item {
            gap: clamp(25px, 3.5vw, 50px); /* Adjusted for smaller screens */
          }
          
          .arrow-img {
            width: clamp(30px, 3vw, 45px); /* Adjusted for smaller screens */
          }
        }
        
        @media (max-width: 600px) {
          .postit-stack {
            position: absolute;
            left: 50%;
            top: 7vw;
            transform: translate(-50%, 0);
            width: 55vw;
            max-width: 160px;
            min-width: 70px;
          }
          
          .aboutme-button-img, .send-button-img {
            width: 110px;
          }
          
          .coffeestain-contact-img {
            width: 120px;
            height: 120px;
            top: 0;
            left: 0;
          }
          
          .magic-img {
            width: 150px; /* Reduced from 180px */
          }
          
          .project-card {
            max-width: 200px; /* Reduced from 250px */
          }
          
          .center-card {
            max-width: 250px; /* Reduced from 300px */
          }
          
          .projects-section {
            gap: clamp(20px, 4vw, 40px); /* Adjusted for mobile */
          }
          
          .project-item {
            gap: clamp(20px, 3vw, 40px); /* Adjusted for mobile */
          }
          
          .arrow-img {
            width: clamp(25px, 2.5vw, 35px); /* Adjusted for mobile */
          }
        }
        
        .about-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(30px, 8vw, 80px);
          margin: clamp(24px, 8vw, 60px) 0;
          padding: 0 clamp(10px, 3vw, 20px);
          flex-wrap: wrap;
        }
        
        .about-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          object-fit: contain;
          flex: 1 1 250px;
        }
        
        .about-text {
          flex: 1 1 300px;
        }
        
        .about-text h1 {
          font-size: clamp(24px, 3vw, 36px);
        }
        
        .about-text p {
          font-size: clamp(18px, 2vw, 30px);
        }
        
        .contact-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          margin: clamp(80px, 15vw, 140px) 0 clamp(80px, 15vw, 140px) 0;
          padding: 0 clamp(10px, 3vw, 20px);
          gap: clamp(24px, 5vw, 60px);
        }
        
        .contact-form {
          flex: 1 1 300px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-left: clamp(0px, 6vw, 90px);
        }
        
        .contact-form h1 {
          font-size: clamp(24px, 3vw, 36px);
        }
        
        .contact-form input, .contact-form textarea {
          padding: 12px;
          font-size: 18px;
          border-radius: 8px;
          border: 2px solid black;
          font-family: DiaryOfAWimpyKidFont, sans-serif;
          background-color: transparent;
        }
        
        .contact-form textarea {
          resize: vertical;
        }
        
        .contact-form button {
          display: none;
        }
        
        .social-row {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          justify-content: center;
        }
        
        .social-icon {
          width: 56px;
          height: 56px;
          transition: transform 0.2s ease;
        }
        
        .social-icon:hover {
          transform: scale(1.1);
        }
        
        .contact-img-col {
          flex: 1 1 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .contact-animation-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          object-fit: contain;
          image-rendering: pixelated;
        }
        
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(28px, 5vw, 60px) clamp(10px, 3vw, 20px) clamp(20px, 2vw, 40px);
          margin-top: clamp(20px, 5vw, 40px);
          gap: clamp(20px, 3vw, 40px);
          width: 100%;
          position: relative;
          min-height: 300px;
        }
        
        .footer-content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          max-width: 1400px;
          gap: 60px;
        }
        
        .footer-thanks-animation {
          position: absolute;
          top: 8%;
          left: 65%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          z-index: 10;
          text-align: center;
        }
        
        .thanks-animation-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: contain;
          image-rendering: pixelated;
        }
        
        .footer-img-wrap {
          flex: 1;
          text-align: left;
          margin-right: 100px;
        }
        
        .footer-guy-wrap {
          flex: 1;
          text-align: left;
          margin-top: 120px;
          margin-left: 0;
          margin-right: 60px;
        }
        
        .footer-animation-img {
          width: 100%;
          max-width: 500px;
          margin-top: 50px;
          height: auto;
          object-fit: contain;
          image-rendering: pixelated;
        }
        
        .guy-animation-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          object-fit: contain;
          image-rendering: pixelated;
          margin-left: -60px;
        }
        
        /* Pencil and eraser styles - VERY BIG SIZE */
        .footer-pencil {
          position: absolute;
          right: 4%;
          bottom: 20%;
          height: 350px;
          z-index: 100;
          transform: rotate(15deg);
        }
        
        .footer-eraser {
          position: absolute;
          left: 4%;
          top: 5%;
          height: 200px;
          z-index: 100;
          transform: rotate(-10deg);
        }
        
        /* Additional breakpoint for larger screens */
        @media (min-width: 1400px) {
          .guy-animation-img {
            max-width: 600px;
            margin-left: -80px;
          }
          
          .footer-guy-wrap {
            margin-top: 400px;
            margin-right: 80px;
          }

          .footer-pencil {
            height: 780px;
            right: 2%;
            bottom:12%;
          }
          
          .footer-eraser {
            height: 160px;
            left: 0%;
            top: -16%;
          }
        }
        
        .footer-links {
          display: flex;
          gap: clamp(16px, 2vw, 40px);
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          z-index: 101;
        }
        
        .footer-links a {
          color: black;
          font-size: clamp(14px, 2vw, 20px);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-links a:hover {
          color: 444;
        }
        
        @media (max-width: 1100px) {
          .main-container {
            padding-left: 3vw;
            padding-right: 3vw;
            max-width: 98vw;
            width: 98vw;
          }
          
          .header {
            padding: 20px 4vw;
          }
          
          .footer-content-wrapper {
            gap: 60px;
          }
          
          .footer-img-wrap {
            margin-right: 20px;
          }
          
          .footer-guy-wrap {
            margin-right: 40px;
            margin-left: 0;
          }
          
          .guy-animation-img {
            margin-left: -40px;
          }
          
          .footer-pencil {
            height: 280px;
            right: 2%;
            bottom: 25%;
          }
          
          .footer-eraser {
            height: 160px;
            left: 2%;
            top: 8%;
          }
        }
        
        @media (max-width: 850px) {
          .about-section, .contact-section {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }
          
          .contact-form {
            margin-left: 0;
          }
          
          .footer-content-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          
          .footer-img-wrap, .footer-guy-wrap {
            text-align: center;
            margin: 0;
          }
          
          .footer-guy-wrap {
            margin-top: 0;
            order: -1;
            margin-right: 0;
          }
          
          .guy-animation-img {
            max-width: 90vw;
            margin-left: 0;
          }
          
          .footer-pencil {
            height: 220px;
            right: 1%;
            bottom: 30%;
          }
          
          .footer-eraser {
            height: 130px;
            left: 1%;
            top: 10%;
          }
        }
        
        @media (max-width: 600px) {
          .main-container {
            padding-left: 2vw;
            padding-right: 2vw;
            margin: 0;
            max-width: 100vw;
            width: 100vw;
          }
          
          .header {
            flex-direction: column;
            gap: 10px;
            padding: 10px 2vw;
            font-size: 1.2rem;
          }
          
          .header-logo {
            width: 80px;
          }
          
          .main-animation-img, .about-img, .contact-animation-img, .footer-animation-img, .guy-animation-img {
            max-width: 98vw;
          }
          
          .about-text h1, .contact-form h1 {
            font-size: 1.3rem;
          }
          
          .about-text p {
            font-size: 1rem;
          }
          
          .coffeestain-contact-img {
            width: 120px;
            height: 120px;
            top: 0;
            left: 0;
          }
          
          .footer-content-wrapper {
            gap: 30px;
          }
          
          .footer-pencil {
            height: 180px;
            right: 0;
            bottom: 35%;
          }
          
          .footer-eraser {
            height: 100px;
            left: 0;
            top: 12%;
          }
          
          .footer {
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;