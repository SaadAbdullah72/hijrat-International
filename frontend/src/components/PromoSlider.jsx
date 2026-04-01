import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import local promotional images
import promo1 from '../assets/promotions/media__1775028528462.png';
import promo2 from '../assets/promotions/media__1775028747785.png';
import promo3 from '../assets/promotions/media__1775028788997.png';
import promo4 from '../assets/promotions/media__1775028815840.png';
import promo5 from '../assets/promotions/media__1775028842380.png';

const PromoSlider = () => {
    const [promos, setPromos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // These are YOUR actual promotional images - used as default
    const localPromos = [
        { id: 1, imageUrl: promo1, title: 'Hijrat International Travel & Tours' },
        { id: 2, imageUrl: promo2, title: 'Umrah & Hajj Packages' },
        { id: 3, imageUrl: promo3, title: 'International Services' },
        { id: 4, imageUrl: promo4, title: 'Book in Advance - Lowest Fare' },
        { id: 5, imageUrl: promo5, title: 'All Airlines Partners' }
    ];

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const apiUrl = window.location.hostname === 'localhost'
                    ? 'http://localhost:5000/api/promos'
                    : '/api/promos';
                const res = await axios.get(apiUrl);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setPromos(res.data);
                } else {
                    // No DB promos? Use local images
                    setPromos(localPromos);
                }
            } catch (err) {
                // API error? Use local images
                setPromos(localPromos);
            } finally {
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    useEffect(() => {
        if (promos.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [promos.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
    };

    if (loading || promos.length === 0) return null;

    return (
        <section className="promo-section" style={{
            padding: '0',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ padding: '4rem 2rem' }}>
                <div className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <span style={{
                        color: '#f59e0b',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '0.9rem'
                    }}>✨ Latest Updates</span>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginTop: '0.5rem',
                        color: '#ffffff',
                        fontWeight: '800'
                    }}>Special Promotions & Offers</h2>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                        margin: '1rem auto 0',
                        borderRadius: '2px'
                    }}></div>
                </div>

                <div className="slider-container" style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                    border: '3px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                        {promos.map((promo, idx) => (
                            <div key={idx} style={{
                                minWidth: '100%',
                                position: 'relative',
                                backgroundColor: '#1e293b'
                            }}>
                                <img
                                    src={promo.imageUrl}
                                    alt={promo.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        maxHeight: '550px',
                                        objectFit: 'contain',
                                        margin: '0 auto'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Left Arrow */}
                    <button onClick={prevSlide} style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255,255,255,0.2)',
                        padding: '0.8rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.3s'
                    }}>
                        <ChevronLeft size={24} color="#fff" />
                    </button>

                    {/* Right Arrow */}
                    <button onClick={nextSlide} style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255,255,255,0.2)',
                        padding: '0.8rem',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.3s'
                    }}>
                        <ChevronRight size={24} color="#fff" />
                    </button>

                    {/* Dot Indicators */}
                    <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '10px',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {promos.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                style={{
                                    width: i === currentIndex ? '28px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: i === currentIndex ? '#f59e0b' : 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    transition: '0.4s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Slide counter */}
                <p style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '1.2rem',
                    fontSize: '0.9rem'
                }}>
                    {currentIndex + 1} / {promos.length}
                </p>
            </div>
        </section>
    );
};

export default PromoSlider;
