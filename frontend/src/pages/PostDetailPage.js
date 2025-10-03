import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil detail post');
        }
        return res.json();
      })
      .then((response) => {
        // Sesuaikan dengan struktur response dari backend
        // Jika backend mengembalikan { data: {...} }, gunakan response.data
        // Jika langsung object post, gunakan response
        setPost(response.data || response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>Error: {error}</p>
        <Link to="/">← Kembali ke Home</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Post tidak ditemukan</p>
        <Link to="/">← Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#1E90FF", marginBottom: "20px", display: "inline-block" }}>
        ← Kembali ke Home
      </Link>
      
      <h2 style={{ marginTop: "20px" }}>{post.title}</h2>
      
      <div style={{ marginBottom: "15px", color: "#666" }}>
        <small>
          By: <strong>{post.author?.username}</strong> | 
          Email: {post.author?.email} | 
          Created: {new Date(post.createdAt).toLocaleDateString('id-ID')}
        </small>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div style={{ marginBottom: "15px" }}>
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              style={{
                background: "#e0e0e0",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "5px",
                fontSize: "12px"
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <p style={{ lineHeight: "1.6", fontSize: "16px" }}>{post.body}</p>
    </div>
  );
}

export default PostDetailPage;
