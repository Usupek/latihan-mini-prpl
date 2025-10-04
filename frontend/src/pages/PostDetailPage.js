import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostDetail from "../components/PostDetail";
import PostsList from "../components/PostsList";

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
      <PostDetail post={post} loading={loading} error={error} />

      {/* related posts */}
      {post && <PostsList excludeId={id} limit={5} />}
    </div>
  );
}

export default PostDetailPage;
