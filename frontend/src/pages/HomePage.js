import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then((response) => {
        // API mengembalikan object dengan property 'data'
        setPosts(response.data.slice(0, 10)); // ambil 10 dulu biar ga kepanjangan
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Daftar Post</h2>
        <div>
          <Link 
            to="/login" 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#667eea", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: "8px",
              fontWeight: "500",
              transition: "all 0.3s ease"
            }}
          >
            Login
          </Link>
        </div>
      </div>
      <div style={{ 
        marginBottom: "20px", 
        padding: "12px", 
        backgroundColor: "#fff3cd", 
        borderRadius: "6px",
        border: "1px solid #ffeaa7",
        fontSize: "14px"
      }}>
        <strong>ℹ️ Info:</strong> Profile page dan Admin dashboard hanya bisa diakses oleh admin yang sudah login.
      </div>
      {posts.length === 0 ? (
        <p>Tidak ada post tersedia</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              background: hoveredPost === post._id ? "#f0f0f0" : "white",
              transition: "background 0.2s",
            }}
            onMouseEnter={() => setHoveredPost(post._id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            {/* Link ke detail post */}
            <Link to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
              <h3
                style={{
                  color: hoveredPost === post._id ? "#1E90FF" : "black",
                  margin: 0,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#555",
                }}
              >
                {post.body.substring(0, 50)}...
              </p>
              <small style={{ color: "#888" }}>
                By: {post.author.username} | Tags: {post.tags.join(", ")}
              </small>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
