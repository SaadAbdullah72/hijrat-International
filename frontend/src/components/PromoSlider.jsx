import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromoSlider = () => {
    const [promos, setPromos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const fallbackPromos = [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d142b638?w=800', title: 'Summer Special' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1565552643954-1eb047c6e003?w=800', title: 'Umrah Package' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', title: 'London Tour' }
    ];

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/promos' : '/api/promos';
                const res = await axios.get(apiUrl);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setPromos(res.data);
                } else {
                    setPromos(fallbackPromos);
                }
            } catch (err) {
                console.error('Error fetching promos:', err);
                setPromos(fallbackPromos);
            } finally {
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [promos.length, currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
    };

    if (loading) return null;

    return (
        <section className="promo-section" style={{ padding: '0', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
            <div className="container" style={{ padding: '4rem 2rem' }}>
                <div className="section-title">
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Latest Updates</span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Special Promotions & Offers</h2>
                </div>

                <div className="slider-container" style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', transform: `translateX(-${currentIndex * 100}%)`, transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        {promos.map((promo, idx) => (
                            <div key={idx} style={{ minWidth: '100%', height: 'auto', position: 'relative' }}>
                                <img src={promo.imageUrl} alt={promo.title} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>

                    <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} color="#1e40af" /></button>
                    <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} color="#1e40af" /></button>

                    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                        {promos.map((_, i) => (
                            <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: i === currentIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: '0.3s' }} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSlider;
