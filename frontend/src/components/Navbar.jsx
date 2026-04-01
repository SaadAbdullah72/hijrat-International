import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="top-bar" style={{ 
        background: 'linear-gradient(90deg, var(--primary), #0f2d6b)',
        color: 'white', 
        padding: '0.6rem 0',
        fontSize: '0.85rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="mailto:hijratinternational@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>
              <Mail size={15} color="var(--secondary)" />
              hijratinternational@gmail.com
            </a>
            <a href="tel:+923224902024" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>
              <Phone size={15} color="var(--secondary)" />
              +92 322 4902024 | +92 51 4902024 | +92 51 4910822
            </a>
          </div>
          <a 
            href="https://wa.me/923224902024?text=Hello! I need travel assistance." 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#25D366', color: 'white', padding: '0.35rem 1.1rem',
              borderRadius: '2rem', fontWeight: '700', fontSize: '0.8rem',
              textDecoration: 'none', letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(37,211,102,0.35)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
      
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '90px'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Hijrat Logo" style={{ height: '75px', width: 'auto', objectFit: 'contain' }} />
          </Link>

          <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" className="nav-link">Home</Link>
            <a href="/#about" className="nav-link">About Us</a>
            <a href="/#services" className="nav-link">Services</a>
            <a href="/#packages" className="nav-link">Packages</a>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </div>

          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div style={{
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            position: 'absolute',
            top: '90px',
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            padding: '2rem',
            gap: '1.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            zIndex: 999,
            borderTop: '1px solid #f1f5f9'
        }}>
            <Link to="/" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Home</Link>
            <a href="/#about" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>About Us</a>
            <a href="/#services" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Services</a>
            <a href="/#packages" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Packages</a>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Contact Us</Link>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .nav-link { 
            font-weight: 700; 
            color: var(--text-dark); 
            position: relative;
            text-transform: uppercase;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
          }
          .nav-link:hover { color: var(--primary); }
          @media (max-width: 991px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
        `}} />
      </nav>
    </>
  );
};

const mobileLinkStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-dark)',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '1rem',
    textTransform: 'uppercase'
};

export default Navbar;
