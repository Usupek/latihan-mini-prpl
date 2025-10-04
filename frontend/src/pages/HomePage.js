import PostsList from "../components/PostsList";

function HomePage() {

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Daftar Post</h2>
      </div>
      <div style={{ 
        marginBottom: "20px", 
        padding: "12px", 
        backgroundColor: "#fff3cd", 
        borderRadius: "6px",
        border: "1px solid #ffeaa7",
        fontSize: "14px"
      }}>
        <strong>ℹ️ Info:</strong> Profile page dan Admin dashboard hanya bisa diakses oleh admin yang sudah login.
      </div>

        <PostsList  limit={10}/>
    </div>
  );
}

export default HomePage;
