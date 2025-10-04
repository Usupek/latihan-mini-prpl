import { useEffect, useState } from "react";
import PostsList from "../components/PostsList";

function HomePage() {
  const [posts, setPosts] = useState([]);
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
        <PostsList 
        posts={posts} 
        limit={10}
      />
        )}
    </div>
  );
}

export default HomePage;
