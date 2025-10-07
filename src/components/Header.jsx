import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
  };

  const navigateToHome = () => {
    navigate("/");
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Aktív oldal ellenőrzése
  const isActive = (path) => location.pathname === path;

  return (
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

      <style jsx>{`
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

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;