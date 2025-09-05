// GreenPulse.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreenPulse = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Vissza navigálás az előző oldalra
  };

  return (
    <div className="greenpulse-page">
      <header className="greenpulse-header">
        <button onClick={handleGoBack} className="back-button">
          ← Back
        </button>
        <h1>GreenPulse Project</h1>
      </header>
      
      <main className="greenpulse-content">
        <div className="project-hero">
          <img src="/images/greenpulse-hero.png" alt="GreenPulse Project" />
        </div>
        
        <div className="project-details">
          <h2>About GreenPulse</h2>
          <p>
            GreenPulse is an innovative environmental monitoring system that tracks
            air quality, temperature, and humidity in real-time. Our solution helps
            communities stay informed about their environment and make data-driven
            decisions for a healthier future.
          </p>
          
          <h3>Features</h3>
          <ul>
            <li>Real-time environmental data monitoring</li>
            <li>Historical data analysis and trends</li>
            <li>Custom alerts and notifications</li>
            <li>User-friendly dashboard interface</li>
            <li>Mobile app companion</li>
          </ul>
          
          <h3>Technologies Used</h3>
          <div className="tech-stack">
            <span>React</span>
            <span>Node.js</span>
            <span>IoT Sensors</span>
            <span>MongoDB</span>
            <span>Chart.js</span>
          </div>
        </div>
      </main>

      <style>{`
        .greenpulse-page {
          min-height: 100vh;
          background: url('/images/background.jpg') center center / cover no-repeat;
          font-family: DiaryOfAWimpyKidFont, sans-serif;
          padding: 20px;
        }
        
        .greenpulse-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .back-button {
          background: none;
          border: 2px solid black;
          padding: 10px 20px;
          font-family: inherit;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 8px;
        }
        
        .greenpulse-header h1 {
          font-size: 2.5rem;
          margin: 0;
        }
        
        .project-hero {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .project-hero img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .project-details {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          border: 2px solid black;
        }
        
        .project-details h2 {
          font-size: 2rem;
          margin-top: 0;
        }
        
        .project-details h3 {
          font-size: 1.5rem;
          margin-top: 30px;
        }
        
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }
        
        .tech-stack span {
          background: #4CAF50;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .greenpulse-header {
            flex-direction: column;
            text-align: center;
          }
          
          .greenpulse-header h1 {
            font-size: 2rem;
          }
          
          .project-details {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default GreenPulse;