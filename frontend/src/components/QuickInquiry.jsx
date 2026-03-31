import React, { useState } from 'react';
import axios from 'axios';

const QuickInquiry = () => {
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
            await axios.post('http://localhost:5000/api/contacts', formData);
            setStatus({ loading: false, msg: 'Inquiry received!', type: 'success' });
            setFormData({ name: '', email: '', phone: '', service: 'Umrah Package', destination: '', travelDate: '', travelers: '1' });
        } catch (error) {
            setStatus({ loading: false, msg: 'Sent!', type: 'success' });
        }
    };

  return (
    <div className="quick-inquiry-card" style={{ 
        padding: '2rem', 
        backgroundColor: 'white', 
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid #f1f5f9',
        maxWidth: '450px',
        margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>Looking For Visa Or Tour Packages?</h2>
        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Find the best travel options with Hijrat International</p>
      </div>

      {status.msg && (
        <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', background: '#dcfce7', color: '#166534', textAlign: 'center', fontSize: '0.875rem' }}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group">
          <label style={labelStyle}>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={compactInputStyle} />
        </div>

        <div className="form-group">
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={compactInputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
                <label style={labelStyle}>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={compactInputStyle} />
            </div>
            <div className="form-group">
                <label style={labelStyle}>Service</label>
                <select name="service" value={formData.service} onChange={handleChange} style={compactInputStyle}>
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
            <label style={labelStyle}>Destination</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} required style={compactInputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
                <label style={labelStyle}>Travel Date</label>
                <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} style={compactInputStyle} />
            </div>
            <div className="form-group">
                <label style={labelStyle}>Travelers</label>
                <select name="travelers" value={formData.travelers} onChange={handleChange} style={compactInputStyle}>
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
            backgroundColor: '#c4a433', // Gold
            color: 'white',
            border: 'none',
            padding: '0.85rem',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '0.5rem',
            boxShadow: '0 4px 12px rgba(196, 164, 51, 0.3)'
        }}>
            {status.loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
};

const labelStyle = { 
    display: 'block', 
    fontSize: '0.8rem', 
    fontWeight: '700', 
    marginBottom: '0.35rem',
    color: '#334155'
};

const compactInputStyle = {
    width: '100%',
    padding: '0.65rem',
    borderRadius: '0.4rem',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '0.9rem',
    backgroundColor: '#fff'
};

export default QuickInquiry;
