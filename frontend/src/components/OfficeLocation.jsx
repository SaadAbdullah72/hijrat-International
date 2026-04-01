import React from 'react';

const OfficeLocation = () => {
    return (
        <section className="office-location" style={{ backgroundColor: 'var(--bg-light)', padding: '5rem 0' }}>
            <div className="container">
                <div className="section-title">
                    <h2>Our Registered Office</h2>
                    <p>Visit us for personalized travel consultation and visa assistance.</p>
                </div>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '3rem', 
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '2rem',
                    padding: '3rem',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden'
                }}>
                    <div className="location-info">
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '1rem' }}>Headquarters</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                <strong>Hijrat International Travel & Tours</strong><br />
                                1st Floor, Office No. 12, Gold Mine Plaza,<br />
                                Ichhra, Ferozepur Road, Lahore, Pakistan.
                            </p>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-light)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)' }}>
                                    📍
                                </div>
                                <span style={{ fontWeight: '600' }}>Lahore, Punjab</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-light)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)' }}>
                                    ⏰
                                </div>
                                <span style={{ fontWeight: '600' }}>Mon - Sat: 09:00 AM - 07:00 PM</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ borderRadius: '1.5rem', overflow: 'hidden', height: '400px', boxShadow: 'var(--shadow)', position: 'relative' }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3787796796!2d74.3214829!3d31.5137887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190562e8412431%3A0xc3434685dd4760a6!2sHijrat%20International%20Travel!5e0!3m2!1sen!2s!4v1711950000000!5m2!1sen!2s" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hijrat International Travel Office Location"
                        ></iframe>
                        <a 
                            href="https://share.google/kmgRhRpzPsR2qjUfw" 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ 
                                position: 'absolute', 
                                bottom: '20px', 
                                right: '20px', 
                                background: 'var(--primary)', 
                                color: 'white', 
                                padding: '1rem 2rem', 
                                borderRadius: '1rem', 
                                fontWeight: 'bold', 
                                textDecoration: 'none',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                                zIndex: 10,
                                fontSize: '0.9rem'
                            }}
                        >
                            📍 GET DIRECTIONS
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficeLocation;
