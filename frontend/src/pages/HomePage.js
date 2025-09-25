import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [hoveredPost, setHoveredPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10))); // ambil 10 dulu biar ga kepanjangan
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Post</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            background: hoveredPost === post.id ? "#f0f0f0" : "white",
            transition: "background 0.2s",
          }}
          onMouseEnter={() => setHoveredPost(post.id)}
          onMouseLeave={() => setHoveredPost(null)}
        >
          {/* Link ke detail post */}
          <Link to={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
            <h3
              style={{
                color: hoveredPost === post.id ? "#1E90FF" : "black",
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
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
