import React, { useState, useEffect } from 'react';
import { Send, Plane, GraduationCap, Map, ShieldCheck, Users, Ticket, Globe } from 'lucide-react';

const services = [
  {
    title: "Air Ticketing",
    description: "As an IATA-accredited agency, we provide direct access to the world’s leading airlines. We offer real-time bookings, corporate travel management, and 24/7 support.",
    features: ["Real-time flight bookings", "Corporate travel management", "24/7 ticketing support"],
    icon: <Ticket size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
  },
  {
    title: "Visa Consultancy",
    description: "Expert guidance for UK, USA, Europe, and Asia visas. Document verification and up-to-date embassy regulation info.",
    features: ["Tourist & Business visas", "Document verification", "Embassy regulations info"],
    icon: <Globe size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #0f172a, #1e40af)'
  },
  {
    title: "Umrah & Hajj",
    description: "Specialized spiritual journeys with tailored packages prioritizing comfort and proximity to Holy Sites.",
    features: ["Customized Umrah plans", "Visa processing", "Hotel bookings in KSA"],
    icon: <Send size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)'
  },
  {
    title: "Holiday Packages",
    description: "Explore the world with curated vacation plans. From Northern Pakistan to international hotspots.",
    features: ["Family & Honeymoon plans", "Group & Corporate tours", "Sightseeing arrangements"],
    icon: <Map size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)'
  },
  {
    title: "Travel Insurance",
    description: "Embassy-approved insurance protecting you against medical emergencies, cancellations, and loss of baggage.",
    features: ["Medical emergencies", "Trip cancellations", "Loss of baggage/passport"],
    icon: <ShieldCheck size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #3b82f6, #1e3a8a)'
  },
  {
    title: "Manpower Services",
    description: "Bridging the gap between skilled Pakistani professionals and international employers with ethical recruitment.",
    features: ["Ethical recruitment", "Gulf & Global staffing", "Vocational solutions"],
    icon: <Users size={32} color="#fff" />,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2070",
    gradient: 'linear-gradient(135deg, #0f172a, #3b82f6)'
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
          <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Services</span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '10px', color: 'var(--primary)', fontWeight: '900' }}>Comprehensive Travel Solutions</h2>
          <p style={{ fontSize: '1.2rem' }}>At Hijrat International, we leverage over a decade of industry expertise and global partnerships to provide excellence in every journey.</p>
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
                    <h3 style={{ fontSize: 'min(3.5rem, 6vw)', marginBottom: '1.5rem', fontWeight: '900', color: 'var(--primary)', lineHeight: 1.1 }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{service.description}</p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
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
