import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostsList({ excludeId, limit = 5 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((response) => {
        const allPosts = response.data || response;
        
        const filteredPosts = allPosts
          .filter(post => post._id !== excludeId)
          .slice(0, limit);
        
        setPosts(filteredPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [excludeId, limit]);

  if (loading) return <p>Loading related posts...</p>;

  return (
    <div style={{ marginTop: "40px", borderTop: "2px solid #eee", paddingTop: "20px" }}>
      <h3>Related Posts</h3>
      <div style={{ display: "grid", gap: "15px" }}>

        {posts.length === 0 ? (
          <p>Tidak ada post tersedia</p>
        ) : (
            posts.map((post) => (
              <div 
                key={post._id || post.id} 
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  transition: "box-shadow 0.3s",
                }}
              >
                <h4 style={{ marginBottom: "10px" }}>{post.title}</h4>
                <p style={{ color: "#666", marginBottom: "10px" }}>
                  {post.body?.substring(0, 100)}...
                </p>
                <Link 
                  to={`/posts/${post._id || post.id}`}
                  style={{
                    color: "#1E90FF",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  Read More →
                </Link>
              </div>
            ))

          )}
 

      </div>
    </div>
  );
}

export default PostsList;
