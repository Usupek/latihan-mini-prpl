import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Login berhasil
        console.log('Login success:', data);
        
        // Simpan token dan user data di localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect berdasarkan role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      setError('Network error. Pastikan backend berjalan.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLihatBlog = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="page-title">Selamat Datang!</h1>
        
        <div className="login-card">
          {error && (
            <div style={{ 
              backgroundColor: '#ffebee', 
              color: '#c62828', 
              padding: '10px', 
              borderRadius: '6px', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          
          <div className="bottom-section">
            <p className="info-text">Kamu bukan admin? Boleh masuk aja langsung</p>
            <button onClick={handleLihatBlog} className="blog-btn">
              Lihat Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;