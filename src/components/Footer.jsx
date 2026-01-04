import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-links">
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

      {/* Social ikonok */}
      <div className="footer-social-row">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.svg" alt="Facebook" className="footer-social-icon" />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/discord.svg" alt="Discord" className="footer-social-icon" />
        </a>
        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/dribbble.svg" alt="Dribbble" className="footer-social-icon" />
        </a>
      </div>

      {/* Copyright szöveg */}
      <div className="footer-copyright">
        <p>&copy; {currentYear} Eva Kapusi. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(20px, 5vw, 40px);
          gap: clamp(15px, 2vw, 15px);
          width: 100%;
          position: relative;
          padding-bottom: 20px;
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
          font-size: clamp(14px, 2vw, 22px);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #444;
        }

        .footer-social-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
        }

        .footer-social-icon {
          width: 32px;
          height: 32px;
          transition: transform 0.2s ease;
        }

        .footer-social-icon:hover {
          transform: scale(1.1);
        }

        .footer-copyright {
          text-align: center;
        }

        .footer-copyright p {
          margin: 0 0;
          font-size: 14px;
          color: #666;
        }

        .footer-made-with {
          font-size: 12px !important;
          color: #888 !important;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .footer-copyright p {
            font-size: 12px;
          }
          
          .footer-made-with {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;