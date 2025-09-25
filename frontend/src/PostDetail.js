import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="post-title">{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/" className="btn">Back</Link>
    </div>
  );
}

export default PostDetail;