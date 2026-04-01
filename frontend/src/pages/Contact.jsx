import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'Umrah Package',
        destination: '',
        travelDate: '',
        travelers: '1'
    });
    const [status, setStatus] = useState({ loading: false, msg: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, msg: '', type: '' });
        
        try {
            const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/contacts' : '/api/contacts';
            await axios.post(apiUrl, formData);
            setStatus({ loading: false, msg: 'Thank you! Your inquiry has been received.', type: 'success' });
            setFormData({ name: '', email: '', phone: '', service: 'Umrah Package', destination: '', travelDate: '', travelers: '1' });
        } catch (error) {
            console.error('Contact Page Error:', error.response ? error.response.data : error.message);
            setStatus({ loading: false, msg: 'Something went wrong. Please check your fields.', type: 'error' });
        }
    };

  return (
    <section className="contact-page" style={{ paddingTop: '8rem', paddingBottom: '8rem', backgroundColor: '#f9fafb' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        
        <div className="contact-form glass-card" style={{ 
            padding: '3rem', 
            backgroundColor: 'white', 
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Looking For Visa Or Tour Packages?</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem' }}>Find the best travel options with Hijrat International Travel & Tours</p>
          </div>

          {status.msg && (
            <div style={{ padding: '1rem', marginBottom: '2rem', borderRadius: '0.5rem', background: '#dcfce7', color: '#166534', textAlign: 'center' }}>{status.msg}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} style={inputStyle}>
                        <option>Umrah Package</option>
                        <option>Visa Consultancy</option>
                        <option>Study Abroad</option>
                        <option>Tour Package</option>
                        <option>Rent a Car</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Destination</label>
                <input type="text" name="destination" value={formData.destination} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Travel Date</label>
                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} style={inputStyle} />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Travelers</label>
                    <select name="travelers" value={formData.travelers} onChange={handleChange} style={inputStyle}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6+</option>
                    </select>
                </div>
            </div>

            <button type="submit" disabled={status.loading} style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: '800',
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginTop: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.25)',
                transition: 'all 0.3s ease'
            }}>
                {status.loading ? 'Submitting...' : 'Send Inquiry Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: '#fff'
};

export default Contact;
