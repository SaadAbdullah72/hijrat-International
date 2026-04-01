import React from 'react';
import { CheckCircle, ShieldCheck, HeartPulse, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="about-section" style={{ padding: '8rem 0', backgroundColor: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="about-image" style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2021" alt="Travel" style={{ width: '100%', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)' }} />
            <div className="experience-badge glass-card" style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2rem',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>13+</div>
              <div style={{ fontSize: '0.875rem' }}>Years of Experience</div>
            </div>
          </div>

          <div className="about-content">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>A Legacy of Excellence in Global Travel</h4>
            <h2 style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '2rem' }}>About Hijrat International <span style={{ color: 'var(--secondary)' }}>Travel & Tours</span></h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.125rem', marginBottom: '1rem' }}>
              Since our establishment in 2013, Hijrat International has been a cornerstone of the travel and tourism industry in Pakistan. As a government-approved agency and a proud member of the Chamber of Commerce, we have dedicated over a decade to bridging the gap between local travelers and global destinations.
            </p>
            <p style={{ color: 'var(--text-light)', fontSize: '1.125rem', marginBottom: '2rem' }}>
              Our IATA accreditation is more than just a license; it is a seal of quality that ensures our clients receive the highest international standards of service, safety, and reliability. Whether you are planning a complex international itinerary or seeking specialized travel consultancy, our experienced team is committed to delivering seamless, world-class experiences.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle color="var(--secondary)" /> <span>DTS Licensed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle color="var(--secondary)" /> <span>GDS Advanced Systems</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle color="var(--secondary)" /> <span>24/7 Global Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle color="var(--secondary)" /> <span>Verified Partners</span>
              </div>
            </div>

            <div className="mission-box" style={{ 
              padding: '2rem', 
              background: 'var(--bg-light)', 
              borderRadius: '1rem', 
              borderLeft: '5px solid var(--primary)',
              fontStyle: 'italic',
              color: 'var(--text-dark)'
            }}>
              "We took the initiative to provide a quality and competitive services to our valued clients with a motive to Work and Trust Together." — <strong>Yasir Mehmood, CEO</strong>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .about-section h2 { font-size: 2.2rem !important; }
        }
      `}} />
    </section>
  );
};

export default AboutSection;
