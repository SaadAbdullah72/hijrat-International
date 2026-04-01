import axios from 'axios';
import { Lock, LayoutDashboard, LogOut, UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const Admin = () => {
    const [promos, setPromos] = useState([]);
    const [title, setTitle] = useState('');
    const [imageData, setImageData] = useState(''); // Stores base64
    const [fileName, setFileName] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [msg, setMsg] = useState('');
    const [isUploading, setIsUploading] = useState(false);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Allowed formats
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setMsg('❌ Only JPG, PNG, and WebP images are allowed.');
            setTimeout(() => setMsg(''), 3000);
            return;
        }

        // File size limit (approx 5MB)
        if (file.size > 5 * 1024 * 1024) {
             setMsg('❌ File size too large. Maximum 5MB allowed.');
             setTimeout(() => setMsg(''), 3000);
             return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageData(reader.result);
        };
    };

    const addPromo = async (e) => {
        e.preventDefault();
        if (promos.length >= 10) {
            setMsg('⚠️ Maximum 10 posters allowed. Delete some first.');
            setTimeout(() => setMsg(''), 3000);
            return;
        }
        if (!imageData) {
            setMsg('⚠️ Please select an image first.');
            setTimeout(() => setMsg(''), 3000);
            return;
        }

        setIsUploading(true);
        try {
            await axios.post(getApiUrl(), { imageData, title });
            setImageData('');
            setFileName('');
            setTitle('');
            setMsg('✅ Poster uploaded successfully!');
            setTimeout(() => setMsg(''), 3000);
            fetchPromos();
        } catch (error) {
            console.error(error);
            setMsg('❌ Error uploading poster');
            setTimeout(() => setMsg(''), 3000);
        } finally {
            setIsUploading(false);
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
                    padding: '3.5rem 3rem', width: '100%', maxWidth: '420px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                         <div style={{ background: '#eff6ff', padding: '1.2rem', borderRadius: '50%', display: 'inline-flex' }}>
                             <Lock size={36} color="#1e40af" />
                         </div>
                    </div>
                    <h2 style={{ color: '#1e40af', marginBottom: '0.4rem', fontSize: '1.8rem', fontFamily: "'Outfit', sans-serif" }}>Admin Login</h2>
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
                            transition: '0.3s', fontFamily: "'Outfit', sans-serif"
                        }}>
                            Secure Login →
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
            paddingTop: '60px', paddingBottom: '40px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
                    background: 'white', padding: '1.5rem', borderRadius: '1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                }}>
                    <div>
                        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#1e40af', fontSize: '1.8rem', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                            <LayoutDashboard size={28} /> Promotion Manager
                        </h1>
                        <p style={{ color: '#64748b', margin: '0.3rem 0 0' }}>
                            {promos.length} / 10 posters active
                        </p>
                    </div>
                    <button onClick={() => setIsAuth(false)} style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.6rem 1.2rem', background: '#fee2e2',
                        color: '#dc2626', border: 'none', borderRadius: '0.5rem',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem'
                    }}><LogOut size={16} /> Logout</button>
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
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', marginBottom: '0.5rem', fontSize: '1.3rem', fontFamily: "'Outfit', sans-serif" }}>
                        <UploadCloud size={22} /> Upload New Poster
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Upload your promotional poster directly from your device (JPG, PNG). Max 5MB.
                    </p>
                    
                    <form onSubmit={addPromo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#1e293b', fontWeight: '600', fontSize: '0.9rem' }}>Poster Title:</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Summer Umrah Package 2024"
                                required
                                style={{
                                    width: '100%', padding: '0.8rem 1rem', border: '2px solid #e2e8f0',
                                    borderRadius: '0.6rem', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#1e293b', fontWeight: '600', fontSize: '0.9rem' }}>Select Image:</label>
                            <div style={{
                                border: '2px dashed #93c5fd', borderRadius: '0.6rem', padding: '1.5rem',
                                background: '#eff6ff', textAlign: 'center', cursor: 'pointer', position: 'relative'
                            }}>
                                <input 
                                    type="file" 
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                    onChange={handleFileChange}
                                    style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        opacity: 0, cursor: 'pointer'
                                    }}
                                />
                                <span style={{ color: '#1e40af', fontWeight: '600' }}>
                                    {fileName ? `📁 ${fileName}` : '📤 Click to Browse or Drag Image Here'}
                                </span>
                            </div>
                        </div>

                        {/* Image Preview */}
                        {imageData && (
                            <div style={{
                                border: '2px solid #e2e8f0', borderRadius: '0.6rem',
                                padding: '0.5rem', textAlign: 'center', background: '#f8fafc',
                                marginTop: '0.5rem'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '600' }}>Image Preview</p>
                                <img
                                    src={imageData}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%', maxHeight: '250px',
                                        objectFit: 'contain', borderRadius: '0.4rem'
                                    }}
                                />
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isUploading}
                            style={{
                                padding: '1rem', marginTop: '0.5rem',
                                background: isUploading ? '#94a3b8' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
                                color: 'white', border: 'none', borderRadius: '0.6rem',
                                fontSize: '1.05rem', fontWeight: '700', cursor: isUploading ? 'not-allowed' : 'pointer',
                                transition: '0.3s', fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            {isUploading ? '⏳ Uploading...' : '🚀 Upload & Publish Poster'}
                        </button>
                    </form>
                </div>

                {/* Existing Posters Grid */}
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', marginBottom: '1.2rem', fontSize: '1.4rem', fontFamily: "'Outfit', sans-serif" }}>
                    <ImageIcon size={24} /> Published Posters ({promos.length})
                </h3>
                {promos.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '4rem 2rem',
                        background: 'white', borderRadius: '1rem',
                        color: '#64748b', border: '1px dashed #cbd5e1'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#cbd5e1' }}>
                            <ImageIcon size={48} />
                        </div>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No active posters found.</p>
                        <p style={{ fontSize: '0.9rem' }}>Upload your first poster above to display it on the website.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {promos.map((p, index) => (
                            <div key={p._id || index} style={{
                                background: 'white', borderRadius: '1rem',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                border: '1px solid #e2e8f0',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute', top: '10px', left: '10px',
                                    background: 'rgba(0,0,0,0.6)', color: 'white',
                                    padding: '0.2rem 0.6rem', borderRadius: '0.3rem',
                                    fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(4px)'
                                }}>
                                    Slide {index + 1}
                                </div>
                                <img
                                    src={p.imageData || p.imageUrl}
                                    alt={p.title}
                                    style={{
                                        width: '100%', height: '220px',
                                        objectFit: 'cover', display: 'block',
                                        borderBottom: '1px solid #f1f5f9'
                                    }}
                                />
                                <div style={{ padding: '1.2rem' }}>
                                    <p style={{
                                        fontWeight: '700', color: '#1e293b',
                                        marginBottom: '1rem', fontSize: '1rem',
                                        lineHeight: '1.3'
                                    }}>{p.title}</p>
                                    <button
                                        onClick={() => deletePromo(p._id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                            width: '100%', padding: '0.6rem',
                                            background: '#fef2f2', color: '#dc2626',
                                            border: '1px solid #fecaca', borderRadius: '0.5rem',
                                            cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                                            transition: '0.2s'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#fee2e2';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = '#fef2f2';
                                        }}
                                    >
                                        <Trash2 size={16} /> Delete Poster
                                    </button>
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
