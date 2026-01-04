import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import "./Hero.css";

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

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Divider line animációk
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

  // Handle arrow click to show modal
  const handleArrowClick = () => {
    setModalContent("I'm cool and all...but not that cool 😎");
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && event.target.classList.contains('modal-overlay')) {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  // Divider observers
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

  // animation loops
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
        name, email, message, timestamp: serverTimestamp(), read: false
      });
      // Show success modal instead of alert
      setModalContent('Thank you for your message! I will reply soon. 😊');
      setShowModal(true);
      form.reset();
    } catch (error) {
      console.error('Something went wrong:', error);
      alert('An error occurred while sending the message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="home" className="page-container hero-root">
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-text">
              {modalContent}
            </div>
            <button 
              className="modal-close-btn"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

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

          <div className="divider-line-container" ref={firstDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/lineh${firstAnimationCompletedRef.current ? 15 : firstLineSvgIndex}.svg`}
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
                Hello, I'm Eva Kapusi, a beginner (a very beginner!) UI/UX designer. I'm not professional yet, but I truly enjoy bringing my ideas to life. I don't work with the most high-end tools (I'm always trying to keep things budget-friendly :) ), but nothing feels impossible as long as I have my iPad with me. A few years ago, I already knew that finance and accounting weren't my world but now I finally feel ready to make the switch. Through my portfolio and resume (downloadable below), I'd like to show a little piece of who I am.
              </p>
              <p>xoxo, Evie</p>
              
              <div className="aboutme-button-wrap">
                <img
                  src="/images/aboutmebutton.svg"
                  alt="About Me Button"
                  className={`aboutme-button-img${aboutBtnDown ? " pressed" : ""}`}
                  tabIndex={0}
                  onPointerDown={handleAboutBtnDown}
                  onPointerUp={handleAboutBtnUp}
                  onPointerLeave={handleAboutBtnUp}
                  onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") handleAboutBtnDown(); }}
                  onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") handleAboutBtnUp(); }}
                  aria-pressed={aboutBtnDown}
                  role="button"
                />
              </div>
            </div>
          </div>

          <div className="divider-line-container" ref={secondDividerLineRef}>
            <div className="divider-line">
              <img
                src={`/images/lineh${secondAnimationCompletedRef.current ? 15 : secondLineSvgIndex}.svg`}
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
              <div className="project-item first-card">
                <img 
                  src="/images/arrow-right.svg" 
                  alt="Left" 
                  className="arrow-img left-arrow" 
                  onClick={handleArrowClick}
                  style={{ cursor: 'pointer', transform: "scaleX(-1)" }}
                />

                <Link to="/nagyi-peksege" className="card-magic-container" onMouseEnter={() => handleMagicHover(0)} onMouseLeave={() => handleMagicLeave(0)} aria-label="Nagyi Peksege project">
                  <div className="magic-container">
                    <img src={`/images/magic${animationComplete[0] ? 1 : currentMagicFrame[0]}.svg`} alt="Magic Effect" className="magic-img" />
                  </div>
                  <div className="card-container">
                    <img src="/images/nagyicard.svg" alt="Nagyi Peksege Card" className="project-card" />
                  </div>
                </Link>

                <div className="arrow-placeholder"></div>
              </div>

              <div className="project-item middle-card">
                <Link to="/greenpulse" className="card-magic-container center-card" onMouseEnter={() => handleMagicHover(1)} onMouseLeave={() => handleMagicLeave(1)} aria-label="GreenPulse project">
                  <div className="magic-container">
                    <img src={`/images/magic${animationComplete[1] ? 1 : currentMagicFrame[1]}.svg`} alt="Magic Effect" className="magic-img" />
                  </div>
                  <div className="card-container">
                    <img src="/images/greenpulsecard.svg" alt="GreenPulse Card" className="project-card" />
                  </div>
                </Link>
              </div>

              <div className="project-item last-card">
                <div className="arrow-placeholder"></div>

                <Link to="/pet-nanny" className="card-magic-container" onMouseEnter={() => handleMagicHover(2)} onMouseLeave={() => handleMagicLeave(2)} aria-label="PetNanny project">
                  <div className="magic-container">
                    <img src={`/images/magic${animationComplete[2] ? 1 : currentMagicFrame[2]}.svg`} alt="Magic Effect" className="magic-img" />
                  </div>
                  <div className="card-container">
                    <img src="/images/petcard.svg" alt="PetNanny Card" className="project-card" />
                  </div>
                </Link>

                <img 
                  src="/images/arrow-right.svg" 
                  alt="Right" 
                  className="arrow-img right-arrow" 
                  onClick={handleArrowClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div className="divider-line-container" ref={thirdDividerLineRef}>
            <div className="divider-line">
              <img src={`/images/lineh${thirdAnimationCompletedRef.current ? 15 : thirdLineSvgIndex}.svg`} alt="Decorative divider line" className="line-svg" />
            </div>
          </div>

          <div id="contact" className="contact-section stain-relative">
            <img src="/images/coffeestain.png" alt="Coffee stain" className="coffeestain-contact-img" />
            <form className="contact-form" onSubmit={handleSendMessage}>
              <h1>Contact Me</h1>
              <input type="text" name="name" placeholder="Name" required className="contact-input" disabled={isSending} />
              <input type="email" name="email" placeholder="Email" required disabled={isSending} />
              <textarea name="message" placeholder="Message" required rows={5} disabled={isSending} />
              
              <div className="send-button-container">
                {isSending ? (
                  <div className="sending-text">Sending...</div>
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
                    onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") handleSendBtnDown(); }}
                    onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") handleSendBtnUp(); }}
                    aria-pressed={sendBtnDown}
                    role="button"
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </div>
              
              <div className="social-row">
                <a href="https://www.facebook.com/eva.kapusi/" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.svg" alt="Facebook" className="social-icon" /></a>
                <a href="https://discord.gg/evie95" target="_blank" rel="noopener noreferrer"><img src="/images/discord.svg" alt="Discord" className="social-icon" /></a>
                <a href="https://dribbble.com/Evie19950128" target="_blank" rel="noopener noreferrer"><img src="/images/dribbble.svg" alt="Dribbble" className="social-icon" /></a>
              </div>
            </form>
            <div className="contact-img-col">
              <img src={`/images/contact${currentContactFrame}.svg`} alt="Contact" className="contact-animation-img" />
            </div>
          </div>

          <div className="divider-line-container" ref={fourthDividerLineRef}>
            <div className="divider-line">
              <img src={`/images/lineh${fourthAnimationCompletedRef.current ? 15 : fourthLineSvgIndex}.svg`} alt="Decorative divider line" className="line-svg flipped" />
            </div>
          </div>

          <div className="footer-animation-container">
            <img src="/images/pencil.png" alt="Pencil" className="footer-pencil" />
            <img src="/images/eraser.png" alt="Eraser" className="footer-eraser" />
            <div className="footer-content-wrapper">
              <div className="footer-beatles-animation">
                <img src={`/images/beatles${footerFrame}.svg`} alt={`Beatles frame ${footerFrame}`} className="beatles-animation-img" />
              </div>
            </div>
          </div>
          <img 
            src="/images/theend.svg" 
            alt="theend" 
            className="theend" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;