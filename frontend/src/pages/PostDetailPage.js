import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetailPage;
