import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        body: content,
        userId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Post uploaded!\n" + JSON.stringify(data, null, 2));
        setTitle("");
        setContent("");
      });
  };

  return (
    <div className="page-container">
      <h2>Profile Saya</h2>
      {user ? (
        <div className="card">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Website:</strong> {user.website}</p>
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
