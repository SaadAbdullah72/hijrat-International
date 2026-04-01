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
                    setPromos(localPromos);
                }
            } catch (err) {
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
        <>
            <section className="promo-section" style={{
                padding: '5rem 0',
                background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background elements */}
                <div style={{
                    position: 'absolute', top: '-60px', right: '-60px',
                    width: '200px', height: '200px', borderRadius: '50%',
                    background: 'rgba(30, 64, 175, 0.05)', zIndex: 0
                }} />
                <div style={{
                    position: 'absolute', bottom: '-40px', left: '-40px',
                    width: '150px', height: '150px', borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.06)', zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Section Header */}
                    <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            color: 'var(--secondary)',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontSize: '0.85rem',
                            display: 'inline-block',
                            background: 'rgba(30, 64, 175, 0.08)',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '2rem'
                        }}>✈️ Promotions</span>
                        <h2 style={{
                            fontSize: '2.5rem',
                            marginTop: '1rem',
                            color: 'var(--primary)',
                            fontWeight: '800'
                        }}>Special Offers & Updates</h2>
                        <p style={{
                            color: 'var(--text-light)',
                            maxWidth: '550px',
                            margin: '0.8rem auto 0',
                            fontSize: '1.05rem'
                        }}>Stay updated with our latest travel deals and promotional packages</p>
                    </div>

                    {/* Slider */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '950px',
                        margin: '0 auto',
                        borderRadius: '1.2rem',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(30, 64, 175, 0.15)',
                        border: '3px solid rgba(30, 64, 175, 0.1)',
                        background: '#fff'
                    }}>
                        {/* Slides */}
                        <div style={{
                            display: 'flex',
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                            {promos.map((promo, idx) => (
                                <div key={idx} style={{
                                    minWidth: '100%',
                                    position: 'relative',
                                    background: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img
                                        src={promo.imageData || promo.imageUrl}
                                        alt={promo.title}
                                        style={{
                                            width: '100%',
                                            height: '500px',
                                            objectFit: 'contain',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Left Arrow */}
                        <button onClick={prevSlide} aria-label="Previous slide" style={{
                            position: 'absolute', left: '12px', top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'var(--primary)',
                            border: 'none', padding: '0.7rem',
                            borderRadius: '50%', cursor: 'pointer', zIndex: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35)',
                            transition: 'transform 0.2s, background 0.2s'
                        }}>
                            <ChevronLeft size={22} color="#fff" />
                        </button>

                        {/* Right Arrow */}
                        <button onClick={nextSlide} aria-label="Next slide" style={{
                            position: 'absolute', right: '12px', top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'var(--primary)',
                            border: 'none', padding: '0.7rem',
                            borderRadius: '50%', cursor: 'pointer', zIndex: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.35)',
                            transition: 'transform 0.2s, background 0.2s'
                        }}>
                            <ChevronRight size={22} color="#fff" />
                        </button>

                        {/* Dots */}
                        <div style={{
                            position: 'absolute', bottom: '14px', left: '50%',
                            transform: 'translateX(-50%)', display: 'flex', gap: '8px',
                            background: 'rgba(255,255,255,0.85)',
                            padding: '6px 14px', borderRadius: '20px',
                            backdropFilter: 'blur(6px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            {promos.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    style={{
                                        width: i === currentIndex ? '24px' : '8px',
                                        height: '8px', borderRadius: '4px',
                                        backgroundColor: i === currentIndex ? 'var(--primary)' : 'rgba(30,64,175,0.25)',
                                        cursor: 'pointer', transition: 'all 0.35s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Counter */}
                    <p style={{
                        textAlign: 'center', color: 'var(--text-light)',
                        marginTop: '1rem', fontSize: '0.85rem', fontWeight: '600'
                    }}>
                        {currentIndex + 1} / {promos.length}
                    </p>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .promo-section button:hover {
                    transform: translateY(-50%) scale(1.1) !important;
                    background-color: var(--primary-hover) !important;
                }
                @media (max-width: 768px) {
                    .promo-section .container { padding: 0 1rem !important; }
                    .promo-section img { height: 280px !important; }
                    .promo-section h2 { font-size: 1.8rem !important; }
                }
                @media (max-width: 480px) {
                    .promo-section img { height: 220px !important; }
                }
            `}} />
        </>
    );
};

export default PromoSlider;
