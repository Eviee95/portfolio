import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    // Ha a főoldalon vagyunk, görbünk a section-hez
    if (location.pathname === '/') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Ha más oldalon vagyunk, először navigálunk a főoldalra, majd görbünk
      navigate("/");
      // Kis késleltetés, hogy biztosan betöltődjön a főoldal
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
    // Ha már a főoldalon vagyunk, görbünk a tetejére
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(28px, 5vw, 60px) clamp(10px, 3vw, 20px) clamp(20px, 2vw, 40px);
          margin-top: clamp(20px, 5vw, 40px);
          gap: clamp(20px, 3vw, 40px);
          width: 100%;
          position: relative;
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
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default Footer;