import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [promos, setPromos] = useState([]);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (isAuth) fetchPromos();
    }, [isAuth]);

    const getApiUrl = () => {
        return window.location.hostname === 'localhost'
            ? 'http://localhost:5000/api/promos'
            : '/api/promos';
    };

    const fetchPromos = async () => {
        try {
            const res = await axios.get(getApiUrl());
            setPromos(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(error);
            setPromos([]);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'hijrat786') {
            setIsAuth(true);
        } else {
            setMsg('❌ Incorrect password');
            setTimeout(() => setMsg(''), 3000);
        }
    };

    const addPromo = async (e) => {
        e.preventDefault();
        if (promos.length >= 10) {
            setMsg('⚠️ Maximum 10 posters allowed. Delete some first.');
            setTimeout(() => setMsg(''), 3000);
            return;
        }
        try {
            await axios.post(getApiUrl(), { imageUrl: url, title });
            setUrl('');
            setTitle('');
            setMsg('✅ Poster added successfully!');
            setTimeout(() => setMsg(''), 3000);
            fetchPromos();
        } catch (error) {
            setMsg('❌ Error adding poster');
            setTimeout(() => setMsg(''), 3000);
        }
    };

    const deletePromo = async (id) => {
        if (!window.confirm('Are you sure you want to delete this poster?')) return;
        try {
            await axios.delete(`${getApiUrl()}?id=${id}`);
            setMsg('🗑️ Poster deleted');
            setTimeout(() => setMsg(''), 3000);
            fetchPromos();
        } catch (error) {
            setMsg('❌ Error deleting poster');
            setTimeout(() => setMsg(''), 3000);
        }
    };

    // ============ LOGIN SCREEN ============
    if (!isAuth) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
            }}>
                <div style={{
                    background: 'white', borderRadius: '1.5rem',
                    padding: '3rem', width: '100%', maxWidth: '400px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
                    <h2 style={{ color: '#1e40af', marginBottom: '0.3rem', fontSize: '1.6rem' }}>Admin Dashboard</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>Hijrat International Travel & Tours</p>
                    
                    {msg && <div style={{
                        padding: '0.7rem', marginBottom: '1rem',
                        background: '#fef2f2', color: '#dc2626',
                        borderRadius: '0.5rem', fontSize: '0.9rem'
                    }}>{msg}</div>}

                    <form onSubmit={handleLogin}>
                        <input
                            type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            style={{
                                width: '100%', padding: '0.9rem 1.2rem',
                                border: '2px solid #e2e8f0', borderRadius: '0.75rem',
                                fontSize: '1rem', marginBottom: '1rem',
                                outline: 'none', transition: '0.3s'
                            }}
                        />
                        <button type="submit" style={{
                            width: '100%', padding: '0.9rem',
                            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                            color: 'white', border: 'none', borderRadius: '0.75rem',
                            fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                            transition: '0.3s'
                        }}>
                            Login →
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ============ ADMIN DASHBOARD ============
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f1f5f9',
            paddingTop: '100px', paddingBottom: '40px'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div>
                        <h1 style={{ color: '#1e40af', fontSize: '1.8rem', margin: 0 }}>📊 Promotion Manager</h1>
                        <p style={{ color: '#64748b', margin: '0.3rem 0 0' }}>
                            {promos.length} / 10 posters active
                        </p>
                    </div>
                    <button onClick={() => setIsAuth(false)} style={{
                        padding: '0.6rem 1.2rem', background: '#fee2e2',
                        color: '#dc2626', border: 'none', borderRadius: '0.5rem',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                    }}>Logout</button>
                </div>

                {/* Status Message */}
                {msg && <div style={{
                    padding: '0.8rem 1.2rem', marginBottom: '1.5rem',
                    background: msg.includes('✅') ? '#f0fdf4' : msg.includes('🗑️') ? '#fffbeb' : '#fef2f2',
                    color: msg.includes('✅') ? '#16a34a' : msg.includes('🗑️') ? '#d97706' : '#dc2626',
                    borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.9rem'
                }}>{msg}</div>}

                {/* Add New Poster Card */}
                <div style={{
                    background: 'white', borderRadius: '1rem',
                    padding: '2rem', marginBottom: '2rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                    border: '1px solid #e2e8f0'
                }}>
                    <h3 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.2rem' }}>➕ Add New Poster</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        📌 Paste any image link — Facebook, Imgur, Google Drive, or any direct URL works!
                    </p>
                    <form onSubmit={addPromo} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Poster Title (e.g. Summer Umrah Package)"
                            required
                            style={{
                                padding: '0.8rem 1rem', border: '2px solid #e2e8f0',
                                borderRadius: '0.6rem', fontSize: '0.95rem', outline: 'none'
                            }}
                        />
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Image URL (Facebook, Imgur, or any image link)"
                            required
                            style={{
                                padding: '0.8rem 1rem', border: '2px solid #e2e8f0',
                                borderRadius: '0.6rem', fontSize: '0.95rem', outline: 'none'
                            }}
                        />
                        {/* Image Preview */}
                        {url && (
                            <div style={{
                                border: '2px dashed #e2e8f0', borderRadius: '0.6rem',
                                padding: '0.5rem', textAlign: 'center', background: '#f8fafc'
                            }}>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Preview:</p>
                                <img
                                    src={url}
                                    alt="Preview"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                    style={{
                                        maxWidth: '100%', maxHeight: '200px',
                                        objectFit: 'contain', borderRadius: '0.4rem'
                                    }}
                                />
                            </div>
                        )}
                        <button type="submit" style={{
                            padding: '0.8rem',
                            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                            color: 'white', border: 'none', borderRadius: '0.6rem',
                            fontSize: '1rem', fontWeight: '700', cursor: 'pointer'
                        }}>
                            Add Poster
                        </button>
                    </form>
                </div>

                {/* Existing Posters Grid */}
                <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.2rem' }}>
                    📋 Current Posters ({promos.length})
                </h3>
                {promos.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '3rem',
                        background: 'white', borderRadius: '1rem',
                        color: '#94a3b8'
                    }}>
                        No posters yet. Add your first one above!
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.2rem'
                    }}>
                        {promos.map(p => (
                            <div key={p._id} style={{
                                background: 'white', borderRadius: '0.8rem',
                                overflow: 'hidden',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                                border: '1px solid #e2e8f0',
                                transition: 'transform 0.2s'
                            }}>
                                <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    style={{
                                        width: '100%', height: '180px',
                                        objectFit: 'cover', display: 'block'
                                    }}
                                />
                                <div style={{ padding: '1rem' }}>
                                    <p style={{
                                        fontWeight: '600', color: '#1e293b',
                                        marginBottom: '0.6rem', fontSize: '0.95rem'
                                    }}>{p.title}</p>
                                    <button
                                        onClick={() => deletePromo(p._id)}
                                        style={{
                                            width: '100%', padding: '0.5rem',
                                            background: '#fef2f2', color: '#dc2626',
                                            border: '1px solid #fecaca', borderRadius: '0.4rem',
                                            cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                                        }}
                                    >🗑️ Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
