import React from 'react';
import { Phone, Mail, MapPin, Globe, Send, Camera, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer" style={{ 
      backgroundColor: 'var(--primary)', 
      color: 'white', 
      paddingTop: '5rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          <div className="footer-brand">
            <div style={{ height: '80px', width: '80px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logo} alt="Hijrat Logo" style={{ height: '110%', width: '110%', objectFit: 'contain' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Market leader in the field of Travel & Tours, Ticketing, and Umrah services for more than a decade. Our passion is to provide quality and competitive services to our valued clients.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer' }}><Globe size={20} /></div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer' }}><Send size={20} /></div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer' }}><Camera size={20} /></div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer' }}><User size={20} /></div>
            </div>
          </div>

          <div className="footer-links">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-services">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1rem' }}>Our Services</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>Hajj & Umrah</li>
              <li>Air Ticketing</li>
              <li>Tourism</li>
              <li>Study Abroad</li>
              <li>Hotel Booking</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1rem' }}>Contact Info</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--secondary)" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Syed Jamal Shah Plaza Opposite Barrier # 2 G.T Road Wah Cantt - Pakistan.</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="var(--secondary)" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>0092-51-4902024 / 0092-51-4910822 / 0092-322-4902024</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} color="var(--secondary)" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>hijratinternational@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <div>© 2024 Hijrat International Travel & Tours. All Rights Reserved.</div>
          <div>Developed by <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Saad</span></div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-links a:hover { color: var(--secondary); padding-left: 5px; }
        .footer-links a { color: rgba(255,255,255,0.7); transition: 0.3s; }
      `}} />
    </footer>
  );
};

export default Footer;
