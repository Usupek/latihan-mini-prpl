import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10)));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body.substring(0, 60)}...</p>
          <Link to={`/posts/${post.id}`} className="btn">Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default PostsList;