import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Képernyőméret figyelése
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    // Mobil menü bezárása
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navigateToHome = () => {
    navigate("/");
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navigateToGreenPulse = () => {
    navigate("/greenpulse");
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navigateToNagyiPeksege = () => {
    navigate("/nagyi-peksege");
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navigateToPetNanny = () => {
    navigate("/pet-nanny");
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Aktív oldal ellenőrzése
  const isActive = (path) => location.pathname === path;

  return (
    <div className="header">
      <img 
        src="/images/logo.svg" 
        alt="Logo" 
        className="header-logo" 
        onClick={navigateToHome}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Hamburger menu mobilra */}
      {isMobile && (
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      )}

      <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigateToHome();
          }}
          className={location.pathname === '/' ? 'active' : ''}
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
                style={{
                  backgroundColor: isActive('/greenpulse') ? '#f0f0f0' : 'transparent',
                  fontWeight: isActive('/greenpulse') ? 'bold' : 'normal'
                }}
              >
                GreenPulse
              </a>
              <a
                href="#nagyi"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToNagyiPeksege();
                  setIsDropdownOpen(false);
                }}
                style={{
                  backgroundColor: isActive('/nagyi-peksege') ? '#f0f0f0' : 'transparent',
                  fontWeight: isActive('/nagyi-peksege') ? 'bold' : 'normal'
                }}
              >
                Nagyi Peksege
              </a>
              <a
                href="#petnanny"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPetNanny();
                  setIsDropdownOpen(false);
                }}
                style={{
                  backgroundColor: isActive('/pet-nanny') ? '#f0f0f0' : 'transparent',
                  fontWeight: isActive('/pet-nanny') ? 'bold' : 'normal'
                }}
              >
                PetNanny
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

      {/* Overlay a mobil menühöz */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 7vw;
          font-size: clamp(1.3rem, 2vw, 2.2rem);
          font-weight: bold;
          text-transform: uppercase;
          position: relative;
         
          z-index: 1000;
        }

        .header-logo {
          width: clamp(80px, 8vw, 120px);
          height: auto;
          cursor: pointer;
          z-index: 1001;
        }

        .header-nav {
          display: flex;
          gap: clamp(18px, 4vw, 40px);
          align-items: center;
        }

        .header-nav a {
          color: black;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .header-nav a:hover,
        .header-nav a.active {
          color: #555;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-toggle {
          background: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: bold;
          text-transform: uppercase;
          color: black;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: color 0.3s ease;
        }

        .dropdown-toggle:hover {
          color: #555;
        }

        .dropdown-arrow {
          width: 20px;
          height: 20px;
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
          min-width: 200px;
          z-index: 1002;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .dropdown-menu a {
          display: block;
          padding: 10px 16px;
          color: black;
          text-decoration: none;
          font-size: 1.2rem;
          transition: background-color 0.2s ease;
          text-align: left;
        }

        .dropdown-menu a:hover {
          background-color: #f5f5f5;
        }

        /* Mobil menü stílusok */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .hamburger-line {
          display: block;
          height: 3px;
          width: 100%;
          background-color: black;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger-line:nth-child(1).open {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-line:nth-child(2).open {
          opacity: 0;
        }

        .hamburger-line:nth-child(3).open {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }

        /* Reszponzív design */
        @media (max-width: 768px) {
          .header {
            padding: 15px 5vw;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .header-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 80px 30px 30px;
            gap: 25px;
            transition: right 0.3s ease;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            z-index: 999;
          }

          .header-nav.mobile-open {
            right: 0;
          }

          .header-nav a {
            font-size: 1.4rem;
            width: 100%;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .dropdown {
            width: 100%;
          }

          .dropdown-toggle {
            width: 100%;
            justify-content: space-between;
            font-size: 1.4rem;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .dropdown-menu {
            position: static;
            width: 100%;
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 10px 0 10px 20px;
            background: #f9f9f9;
            margin-top: 5px;
          }

          .dropdown-menu a {
            font-size: 1.2rem;
            border-bottom: none;
            padding: 8px 0;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 12px 4vw;
          }

          .header-logo {
            width: 70px;
          }

          .header-nav {
            width: 85%;
            padding: 70px 20px 20px;
          }

          .header-nav a {
            font-size: 1.3rem;
          }

          .dropdown-toggle {
            font-size: 1.3rem;
          }
        }

        /* Kis mobilok */
        @media (max-width: 360px) {
          .header {
            padding: 10px 3vw;
          }

          .header-nav {
            width: 90%;
            padding: 60px 15px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;