import { useEffect, useState } from "react";

function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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
        setPosts(response.data.slice(0, 15)); // ambil 15 post biar ga kepanjangan
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Kiri: Daftar Post */}
      <div
        style={{
          flex: 1,
          borderRight: "1px solid gray",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <h2>Daftar Post</h2>
        {posts.length === 0 ? (
          <p>Tidak ada post tersedia</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              onClick={() => setSelectedPost(post)}
              style={{
                border: selectedPost?._id === post._id ? "2px solid #1E90FF" : "1px solid gray",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "background 0.2s",
                background: selectedPost?._id === post._id ? "#e6f2ff" : "white",
              }}
              onMouseEnter={(e) => {
                if (selectedPost?._id !== post._id) {
                  e.currentTarget.style.background = "#f0f0f0";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPost?._id !== post._id) {
                  e.currentTarget.style.background = "white";
                }
              }}
            >
              <h4
                style={{
                  margin: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1E90FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
              >
                {post.title}
              </h4>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                {post.body.substring(0, 40)}...
              </p>
              <small style={{ color: "#888" }}>
                By: {post.author.username}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Kanan: Detail Post */}
      <div style={{ flex: 2, padding: "20px", overflowY: "auto" }}>
        {selectedPost ? (
          <>
            <h2 style={{ color: "#000000" }}>{selectedPost.title}</h2>
            
            <div style={{ marginBottom: "15px", color: "#666" }}>
              <small>
                <strong>Author:</strong> {selectedPost.author.username} ({selectedPost.author.email})
              </small>
              <br />
              <small>
                <strong>Created:</strong> {new Date(selectedPost.createdAt).toLocaleString('id-ID')}
              </small>
              <br />
              <small>
                <strong>Updated:</strong> {new Date(selectedPost.updatedAt).toLocaleString('id-ID')}
              </small>
            </div>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <strong>Tags: </strong>
                {selectedPost.tags.map((tag, index) => (
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

            <p style={{ lineHeight: "1.6", fontSize: "16px" }}>{selectedPost.body}</p>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
            Pilih salah satu post untuk melihat detailnya
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
