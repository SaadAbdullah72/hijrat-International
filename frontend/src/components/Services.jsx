import React, { useState, useEffect } from 'react';
import { Send, Plane, GraduationCap, Map } from 'lucide-react';

const services = [
  {
    title: "Travel Agency",
    description: "Expertly organized sacred journeys and professional travel assistance with a decade of trust.",
    icon: <Send size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
  },
  {
    title: "Visa Consultancy",
    description: "Secure your global travel with our reliable visa documentation and consultation services.",
    icon: <Plane size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #111827, #374151)'
  },
  {
    title: "Study Abroad",
    description: "Your gateway to international education. We guide you through admissions and student visa processing.",
    icon: <GraduationCap size={32} color="#fff" />,
    image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)'
  },
  {
    title: "Rent a Car",
    description: "Providing Worldwide transportation and premium rent-a-car services, specializing in Mecca & Madina transfers.",
    icon: <Map size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #064e3b, #10b981)'
  }
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 3500); // Shorter interval (3.5s)
    return () => clearInterval(timer);
  }, [currentIndex]); // Depend on currentIndex to restart timer on manual click

  const handleNext = () => setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));

  return (
    <section id="services" className="services" style={{ backgroundColor: '#fcfcfc', overflow: 'hidden', padding: '100px 0' }}>
      <div className="container">
        <div className="section-title">
          <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Expertise</span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '10px', color: 'var(--primary)', fontWeight: '900' }}>World Class Services</h2>
          <p style={{ fontSize: '1.2rem' }}>Delivering excellence in every journey we plan and every visa we process.</p>
        </div>

        <div className="slider-container" style={{ position: 'relative', marginTop: '4rem' }}>
          
          {/* Manual Controls */}
          <button onClick={handlePrev} className="slide-nav prev" style={{ left: '0' }}>&lt;</button>
          
          <div className="services-track" style={{ 
            display: 'flex', 
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: '100%'
          }}>
            {services.map((service, index) => (
              <div key={index} style={{ minWidth: '100%', padding: '0 1rem' }}>
                <div className="service-card" style={{
                  background: 'white',
                  borderRadius: '2.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  alignItems: 'stretch',
                  minHeight: '550px',
                  border: '1px solid #f1f5f9'
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ 
                        position: 'absolute', 
                        top: '30px', 
                        left: '30px', 
                        background: service.gradient, 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '1.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                    }}>
                        {service.icon}
                    </div>
                  </div>
                  <div style={{ padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: 'min(3.5rem, 8vw)', marginBottom: '1.5rem', fontWeight: '900', color: 'var(--primary)', lineHeight: 1.1 }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '3rem' }}>{service.description}</p>
                    <a href="#contact" className="btn btn-primary" style={{ padding: '1rem 2rem', width: 'fit-content', borderRadius: '1rem' }}>Get Consultation</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleNext} className="slide-nav next" style={{ right: '0' }}>&gt;</button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '4rem' }}>
              {services.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCurrentIndex(i)}
                    style={{ 
                        width: currentIndex === i ? '60px' : '15px', 
                        height: '15px', 
                        borderRadius: '10px', 
                        background: currentIndex === i ? 'var(--primary)' : '#e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} 
                  />
              ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .slide-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            color: var(--primary);
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 50;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            transition: 0.3s;
        }
        .slide-nav:hover { background: var(--primary); color: white; }
        @media (max-width: 768px) {
            .slide-nav { display: none; }
            .service-card { grid-template-columns: 1fr !important; min-height: auto !important; }
        }
      `}} />
    </section>
  );
};

export default Services;
