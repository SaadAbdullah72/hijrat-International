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
        backgroundColor: 'var(--primary)', 
        color: 'white', 
        padding: '0.5rem 0',
        fontSize: '0.875rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> hijratinternational@gmail.com
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} /> 0092-322-4902024
            </span>
          </div>
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logo} alt="Hijrat Logo" style={{ height: '70px', width: 'auto' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>HIJRAT INTERNATIONAL</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--secondary)' }}>WORK & TRUST TOGETHER</span>
            </div>
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
