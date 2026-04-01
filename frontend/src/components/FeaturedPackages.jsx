import React from 'react';
import { Send, Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    title: "Premium Spiritual Journey",
    category: "Umrah & Hajj",
    description: "Dedicated assistance for your sacred pilgrimage with premium hotel stays and transport.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2070",
    tag: "Best Seller",
    icon: <ShieldCheck size={18} />
  },
  {
    title: "Global Visit Excellence",
    category: "International Visa",
    description: "Professional visa consultation for top global destinations with guaranteed documentation help.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070",
    tag: "Top Rated",
    icon: <Star size={18} />
  },
  {
    title: "Higher Education Gateway",
    category: "Study Abroad",
    description: "End-to-end guidance for international students, from university selection to visa approval.",
    image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Fast Track",
    icon: <Zap size={18} />
  }
];

const FeaturedPackages = () => {
  const handleWhatsApp = (title) => {
    const message = encodeURIComponent(`Hi, I am interested in the ${title}. Please provide more details.`);
    window.open(`https://wa.me/923354902024?text=${message}`, '_blank');
  };

  return (
    <section id="packages" className="packages" style={{ backgroundColor: '#fff', padding: '120px 0' }}>
      <div className="container">
        <div className="section-title">
          <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Tailor Made Experiences</span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '15px', color: 'var(--primary)', fontWeight: '900' }}>Exclusive Offerings</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '20px auto' }}>We provide specialized travel and consultancy solutions designed for your specific needs, ensuring a smooth and worry-free experience.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem',
          marginTop: '4rem'
        }}>
          {packages.map((pkg, index) => (
            <div key={index} className="package-card" style={{
              background: 'white',
              borderRadius: '2.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ 
                    position: 'absolute', 
                    top: '25px', 
                    right: '25px', 
                    background: 'var(--secondary)', 
                    color: 'white', 
                    padding: '0.6rem 1.4rem', 
                    borderRadius: '2rem',
                    fontSize: '0.85rem',
                    fontWeight: '900',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                }}>
                    {pkg.tag}
                </div>
              </div>
              <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {pkg.icon} {pkg.category}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: 'var(--primary)', fontWeight: '800' }}>{pkg.title}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', fontSize: '1.1rem', lineClamp: 3, height: '80px', overflow: 'hidden' }}>{pkg.description}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => handleWhatsApp(pkg.title)} className="btn btn-secondary" style={{ flex: 1.5, padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        WhatsApp <ArrowRight size={18} />
                    </button>
                    <Link to="/contact" className="btn" style={{ 
                        flex: 1, 
                        textAlign: 'center', 
                        border: '2px solid #f1f5f9',
                        color: 'var(--primary)',
                        padding: '1rem',
                        borderRadius: '1rem',
                        fontWeight: 'bold'
                    }}>Inquiry</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .package-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 40px 60px rgba(0,0,0,0.1);
            border-color: var(--secondary);
        }
      `}} />
    </section>
  );
};

export default FeaturedPackages;
