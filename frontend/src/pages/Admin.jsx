import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [promos, setPromos] = useState([]);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (isAuth) fetchPromos();
    }, [isAuth]);

    const fetchPromos = async () => {
        try {
            const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/promos' : '/api/promos';
            const res = await axios.get(apiUrl);
            if (Array.isArray(res.data)) {
                setPromos(res.data);
            } else {
                setPromos([]); // Prevent map error
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'hijrat786') setIsAuth(true);
        else alert('Wrong Password');
    };

    const addPromo = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/promos' : '/api/promos';
            await axios.post(apiUrl, { imageUrl: url, title });
            setUrl(''); setTitle('');
            fetchPromos();
        } catch (error) {
            console.error(error);
        }
    };

    const deletePromo = async (id) => {
        try {
            const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/promos' : '/api/promos';
            await axios.delete(`${apiUrl}?id=${id}`);
            fetchPromos();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isAuth) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h2>Hijrat Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Admin Panel - Manage Promotion Posters</h1>
            <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
                <h3>Add New Poster</h3>
                <form onSubmit={addPromo} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Poster Title (e.g. Summer Umrah)" required style={{ padding: '10px' }} />
                    <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL (e.g. https://...)" required style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>Add Poster</button>
                </form>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {promos.map(p => (
                    <div key={p._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px' }}>
                        <img src={p.imageUrl} style={{ width: '100%', height: '150px', objectFit: 'cover' }} alt={p.title} />
                        <p>{p.title}</p>
                        <button onClick={() => deletePromo(p._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
