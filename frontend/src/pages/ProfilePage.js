import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage (current session)
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    // Role checking is now handled by ProtectedRoute component
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          body: content,
          tags: [] // Optional tags
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Post berhasil dibuat!");
        setTitle("");
        setContent("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Profile Saya</h2>
      {user ? (
        <div className="card">
          <p><strong>Nama:</strong> {user.name || user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3>Form Upload Post</h3>
      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;
