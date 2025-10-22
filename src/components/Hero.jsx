import { useEffect, useState, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import "./Hero.css";

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
  const [isSending, setIsSending] = useState(false);
  
  const [footerFrame, setFooterFrame] = useState(1);
  const [footerPlayed, setFooterPlayed] = useState(false);
  
  const [currentGuyFrame, setCurrentGuyFrame] = useState(1);

  const [isHovering, setIsHovering] = useState([false, false, false]);
  const [currentMagicFrame, setCurrentMagicFrame] = useState([1, 1, 1]);
  const [animationComplete, setAnimationComplete] = useState([false, false, false]);

  const [currentThanksFrame, setCurrentThanksFrame] = useState(1);

  // Új állapotok a divider line animációkhoz
  const [firstLineSvgIndex, setFirstLineSvgIndex] = useState(1);
  const [firstAnimationStarted, setFirstAnimationStarted] = useState(false);
  const [firstAnimationCompleted, setFirstAnimationCompleted] = useState(false);
  const firstDividerLineRef = useRef(null);

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

  const [fifthLineSvgIndex, setFifthLineSvgIndex] = useState(1);
  const [fifthAnimationStarted, setFifthAnimationStarted] = useState(false);
  const [fifthAnimationCompleted, setFifthAnimationCompleted] = useState(false);
  const fifthDividerLineRef = useRef(null);

  const firstAnimationCompletedRef = useRef(false);
  const secondAnimationCompletedRef = useRef(false);
  const thirdAnimationCompletedRef = useRef(false);
  const fourthAnimationCompletedRef = useRef(false);
  const fifthAnimationCompletedRef = useRef(false);

  const navigate = useNavigate();

  const totalFrames = 8;
  const fps = 6;
  const girlSwitchInterval = 500;
  const totalContactFrames = 6;
  const contactFps = 3;
  const totalFooterFrames = 11;
  const footerFps = 1;
  
  const totalGuyFrames = 8;
  const guyFps = 3;

  const totalMagicFrames = 7;
  const magicFps = 10;
  const magicResetDelay = 1000;

  const totalThanksFrames = 5;
  const thanksFps = 3;

  // Divider line animációk
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firstAnimationStarted && !firstAnimationCompletedRef.current) {
          setFirstAnimationStarted(true);
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setFirstLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setFirstAnimationCompleted(true);
              firstAnimationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );
    if (firstDividerLineRef.current) observer.observe(firstDividerLineRef.current);
    return () => { if (firstDividerLineRef.current) observer.unobserve(firstDividerLineRef.current); };
  }, [firstAnimationStarted]);

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fifthAnimationStarted && !fifthAnimationCompletedRef.current) {
          setFifthAnimationStarted(true);
          let currentIndex = 1;
          const interval = setInterval(() => {
            if (currentIndex < 15) {
              currentIndex++;
              setFifthLineSvgIndex(currentIndex);
            } else {
              clearInterval(interval);
              setFifthAnimationCompleted(true);
              fifthAnimationCompletedRef.current = true;
            }
          }, 100);
        }
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );
    if (fifthDividerLineRef.current) observer.observe(fifthDividerLineRef.current);
    return () => { if (fifthDividerLineRef.current) observer.unobserve(fifthDividerLineRef.current); };
  }, [fifthAnimationStarted]);

  // Egyéb useEffect-ek változatlanok
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % totalFrames) + 1);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [totalFrames, fps]);

  useEffect(() => {
    const girlInterval = setInterval(() => {
      setCurrentGirl((prev) => (prev === 1 ? 2 : 1));
    }, girlSwitchInterval);

    return () => clearInterval(girlInterval);
  }, [girlSwitchInterval]);

  useEffect(() => {
    const contactInterval = setInterval(() => {
      setCurrentContactFrame((prev) => (prev % totalContactFrames) + 1);
    }, 1000 / contactFps);

    return () => clearInterval(contactInterval);
  }, [totalContactFrames, contactFps]);

  useEffect(() => {
    const guyInterval = setInterval(() => {
      setCurrentGuyFrame((prev) => (prev % totalGuyFrames) + 1);
    }, 1000 / guyFps);

    return () => clearInterval(guyInterval);
  }, [totalGuyFrames, guyFps]);

  useEffect(() => {
    const thanksInterval = setInterval(() => {
      setCurrentThanksFrame((prev) => (prev % totalThanksFrames) + 1);
    }, 1000 / thanksFps);

    return () => clearInterval(thanksInterval);
  }, [totalThanksFrames, thanksFps]);

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

  useEffect(() => {
    const footerElement = document.querySelector(".footer-animation-container");
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

  useEffect(() => {
    if (!footerPlayed) return;
    
    let frame = 1;
    const interval = setInterval(() => {
      frame = (frame % totalFooterFrames) + 1;
      setFooterFrame(frame);
    }, 1000 / footerFps);

    return () => clearInterval(interval);
  }, [footerPlayed, totalFooterFrames, footerFps]);

  const handleAboutBtnDown = () => setAboutBtnDown(true);
  const handleAboutBtnUp = () => setAboutBtnDown(false);

  const handleSendBtnDown = () => setSendBtnDown(true);
  const handleSendBtnUp = () => setSendBtnDown(false);

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendMessage = async (e) => {
    let form;
    
    if (e.type === 'submit') {
      e.preventDefault();
      form = e.target;
    } else {
      e.preventDefault();
      form = document.querySelector('.contact-form');
    }

    if (!form) {
      console.error("Form element not found");
      return;
    }

    setIsSending(true);
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      alert('Kérlek töltsd ki az összes mezőt!');
      setIsSending(false);
      return;
    }

    if (!isValidEmail(email)) {
      alert('Kérlek érvényes email címet adj meg!');
      setIsSending(false);
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        name: name,
        email: email,
        message: message,
        timestamp: serverTimestamp(),
        read: false
      });

      alert('Köszönjük az üzeneted! Hamarosan válaszolunk.');
      form.reset();
      
    } catch (error) {
      console.error('Hiba az üzenet küldésekor:', error);
      alert('Hiba történt az üzenet küldése során. Kérlek próbáld újra később.');
    } finally {
      setIsSending(false);
    }
  };

  const navigateToGreenPulse = () => {
    navigate("/greenpulse");
  };

  const navigateToNagyiPeksege = () => {
    navigate("/nagyi-peksege");
  };

  const navigateToPetNanny = () => {
    navigate("/pet-nanny");
  };

  const handleCardClick = (projectType) => {
    switch(projectType) {
      case 'greenpulse':
        navigateToGreenPulse();
        break;
      case 'nagyi':
        navigateToNagyiPeksege();
        break;
      case 'petnanny':
        navigateToPetNanny();
        break;
      default:
        break;
    }
  };

  return (
    <div id="home" className="page-container hero-root">
      <div className="page-content">
        <div className="main-container">
          <div className="main-frame">
            <img
              src={`/images/${currentFrame}.svg`}
              alt={`Animation frame ${currentFrame}`}
              className="main-animation-img"
            />
            <div className="postit-stack">
              <img src="/images/postit.png" alt="Postit" className="postit-img" />
              <img src="/images/postit.svg" alt="Postit SVG" className="postit-svg-img" />
            </div>
          </div>

          {/* 1. Divider line - fő animáció után */}
          <div className="divider-line-container" ref={firstDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/line${firstAnimationCompletedRef.current ? 15 : firstLineSvgIndex}.svg`}
                alt="Decorative divider line"
                className="line-svg"
              />
            </div>
          </div>

          <div id="about" className="about-section">
            <img src={`/images/girl${currentGirl}.svg`} alt="Girl" className="about-img" />
            <div className="about-text">
              <h1>About Me</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
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

          {/* 2. Divider line - about szakasz után */}
          <div className="divider-line-container" ref={secondDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/line${secondAnimationCompletedRef.current ? 15 : secondLineSvgIndex}.svg`}
                alt="Decorative divider line"
                className="line-svg flipped"
              />
            </div>
          </div>

          <div id="projects" className="projects-section">
            <div className="projects-title-container">
              <h1 className="projects-title">My Projects</h1>
            </div>
            
            <div className="projects-cards-container">
              {/* 1. kártya - Nagyi Peksege */}
              <div className="project-item first-card">
                <img
                  src="/images/arrow-right.svg"
                  alt="Left"
                  style={{ transform: "scaleX(-1)" }}
                  className="arrow-img left-arrow"
                />

                <div 
                  className="card-magic-container"
                  onMouseEnter={() => handleMagicHover(0)}
                  onMouseLeave={() => handleMagicLeave(0)}
                  onClick={() => handleCardClick('nagyi')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="magic-container">
                    <img 
                      src={`/images/magic${animationComplete[0] ? 1 : currentMagicFrame[0]}.svg`} 
                      alt="Magic Effect" 
                      className="magic-img" 
                    />
                  </div>

                  <div className="card-container">
                    <img src="/images/nagyicard.svg" alt="Nagyi Peksege Card" className="project-card" />
                  </div>
                </div>

                {/* Üres hely a jobb oldali nyíl helyett mobil nézetben */}
                <div className="arrow-placeholder"></div>
              </div>

              {/* 2. kártya - GreenPulse */}
              <div className="project-item middle-card">
                

                <div 
                  className="card-magic-container center-card"
                  onMouseEnter={() => handleMagicHover(1)}
                  onMouseLeave={() => handleMagicLeave(1)}
                  onClick={() => handleCardClick('greenpulse')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="magic-container">
                    <img 
                      src={`/images/magic${animationComplete[1] ? 1 : currentMagicFrame[1]}.svg`} 
                      alt="Magic Effect" 
                      className="magic-img" 
                    />
                  </div>

                  <div className="card-container">
                    <img src="/images/greenpulsecard.svg" alt="GreenPulse Card" className="project-card" />
                  </div>
                </div>

               
              </div>

              {/* 3. kártya - PetNanny */}
              <div className="project-item last-card">
                {/* Üres hely a bal oldali nyíl helyett mobil nézetben */}
                <div className="arrow-placeholder"></div>

                <div 
                  className="card-magic-container"
                  onMouseEnter={() => handleMagicHover(2)}
                  onMouseLeave={() => handleMagicLeave(2)}
                  onClick={() => handleCardClick('petnanny')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="magic-container">
                    <img 
                      src={`/images/magic${animationComplete[2] ? 1 : currentMagicFrame[2]}.svg`} 
                      alt="Magic Effect" 
                      className="magic-img" 
                    />
                  </div>

                  <div className="card-container">
                    <img src="/images/petcard.svg" alt="PetNanny Card" className="project-card" />
                  </div>
                </div>

                <img 
                  src="/images/arrow-right.svg" 
                  alt="Right" 
                  className="arrow-img right-arrow" 
                />
              </div>
            </div>
          </div>

          {/* 3. Divider line - projects szakasz után */}
          <div className="divider-line-container" ref={thirdDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/line${thirdAnimationCompletedRef.current ? 15 : thirdLineSvgIndex}.svg`}
                alt="Decorative divider line"
                className="line-svg"
              />
            </div>
          </div>

          <div id="contact" className="contact-section stain-relative">
            <img src="/images/coffeestain.png" alt="Coffee stain" className="coffeestain-contact-img" />
            <form
              className="contact-form"
              onSubmit={handleSendMessage}
            >
              <h1>Contact Me</h1>
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                required 
                className="contact-input" 
                disabled={isSending}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                required 
                disabled={isSending}
              />
              <textarea 
                name="message"
                placeholder="Message" 
                required 
                rows={5} 
                disabled={isSending}
              />
              
              <div className="send-button-container">
                {isSending ? (
                  <div className="sending-text">
                    Sending...
                  </div>
                ) : (
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
                )}
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

          {/* 4. Divider line - contact szakasz után */}
          <div className="divider-line-container" ref={fourthDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/line${fourthAnimationCompletedRef.current ? 15 : fourthLineSvgIndex}.svg`}
                alt="Decorative divider line"
                className="line-svg flipped"
              />
            </div>
          </div>

          <div className="footer-animation-container">
            <img src="/images/pencil.png" alt="Pencil" className="footer-pencil" />
            <img src="/images/eraser.png" alt="Eraser" className="footer-eraser" />
            
            <div className="footer-content-wrapper">
              <div className="footer-beatles-animation">
                <img
                  src={`/images/beatles${footerFrame}.svg`}
                  alt={`Beatles frame ${footerFrame}`}
                  className="beatles-animation-img"
                />
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Hero;