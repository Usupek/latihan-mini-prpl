import { useEffect, useState } from "react";

function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 15))); // ambil 15 post biar ga kepanjangan
  }, []);

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
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
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
            <p>{post.body.substring(0, 40)}...</p>
          </div>
        ))}
      </div>

      {/* Kanan: Detail Post */}
      <div style={{ flex: 2, padding: "20px" }}>
        {selectedPost ? (
          <>
            <h2 style={{ color: "#000000" }}>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
          </>
        ) : (
          <p>Pilih salah satu post untuk melihat detailnya</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
