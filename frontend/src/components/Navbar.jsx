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

          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer' }}>
            {isOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Mobile Menu logic would go here */}
        <style dangerouslySetInnerHTML={{ __html: `
          .nav-link { 
            font-weight: 600; 
            color: var(--text-dark); 
            position: relative;
          }
          .nav-link:hover { color: var(--primary); }
          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 0;
            background-color: var(--secondary);
            transition: width 0.3s;
          }
          .nav-link:hover::after { width: 100%; }
          @media (max-width: 768px) {
            .desktop-menu { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
        `}} />
      </nav>
    </>
  );
};

export default Navbar;
