import { useEffect, useState } from "react"; 
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

  const navigate = useNavigate();

  const totalFrames = 8;
  const fps = 6;
  const girlSwitchInterval = 500;
  const totalContactFrames = 6;
  const contactFps = 3;
  const totalFooterFrames = 11;
  const footerFps = 5;
  
  const totalGuyFrames = 8;
  const guyFps = 3;

  const totalMagicFrames = 7;
  const magicFps = 10;
  const magicResetDelay = 1000;

  const totalThanksFrames = 5;
  const thanksFps = 3;

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

          <div id="projects" className="projects-section">
            <div className="projects-title-container">
              <h1 className="projects-title">My Projects</h1>
            </div>
            
            <div className="projects-cards-container">
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
              </div>

              <div className="project-item">
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

              <div className="project-item">
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

                <img src="/images/arrow-right.svg" alt="Right" className="arrow-img" />
              </div>
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

          <div className="footer-animation-container">
            <img src="/images/pencil.png" alt="Pencil" className="footer-pencil" />
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
              <div className="footer-guy-wrap">
                <img
                  src={`/images/guy${currentGuyFrame}.svg`}
                  alt={`Guy frame ${currentGuyFrame}`}
                  className="guy-animation-img"
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