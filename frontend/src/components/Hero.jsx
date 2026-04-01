import React from 'react';
import QuickInquiry from './QuickInquiry';

const Hero = () => {
  return (
    <section className="hero" style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(rgba(30, 64, 175, 0.8), rgba(30, 64, 175, 0.4)), url("https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&q=100&w=2070")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      paddingTop: '120px',
      paddingBottom: '80px',
      color: 'white',
      position: 'relative'
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '4rem', 
        alignItems: 'center' 
      }}>
        <div className="hero-content" style={{ zIndex: 10 }}>
          <span style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            color: 'white', 
            padding: '0.6rem 1.4rem', 
            borderRadius: '2rem', 
            fontSize: 'max(0.7rem, 0.8vw)',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>Since 2013 • Hijrat International</span>
          <h1 style={{ 
            fontSize: 'max(3.5rem, 5.5vw)', 
            fontWeight: '900', 
            lineHeight: '1.05', 
            margin: '2rem 0',
            textShadow: '2px 4px 12px rgba(0,0,0,0.4)',
            color: '#fff'
          }}>
            Experience <br />
            Legacy Of <span style={{ color: 'var(--accent)' }}>Trust</span>
          </h1>
          <p style={{ 
            fontSize: 'max(1.1rem, 1.3vw)', 
            maxWidth: '650px', 
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '3rem',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
          }}>
            Explore the world with Asia's most trusted travel agency. Specializing in sacred journeys, global visas, and premium tour packages tailored for your dream travel.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#packages" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', borderRadius: '1rem', fontWeight: '900', fontSize: '1.1rem' }}>Premium Packages</a>
            <a href="#services" className="btn btn-glass" style={{ padding: '1.2rem 2.5rem', borderRadius: '1rem', fontWeight: '900', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', background: 'transparent' }}>Our Expertise</a>
          </div>
        </div>

        <div className="hero-form animate-fade-in-right" style={{ zIndex: 20 }}>
          <QuickInquiry />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 991px) {
            .hero { padding-top: 100px !important; text-align: center; }
            .hero-content { margin-bottom: 3rem; }
            .hero-content h1 { font-size: 3rem !important; }
            .hero-content p { margin-left: auto; margin-right: auto; }
            .hero-content div { justify-content: center; }
        }
      `}} />
    </section>
  );
};

export default Hero;
