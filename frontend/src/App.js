import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage";
import "./App.css";

function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") return null;

  if (location.pathname === "/admin") {
    return (
      <nav className="navbar">
        <Link to="/profile">Profile Saya</Link>
      </nav>
    );
  }

  if (location.pathname === "/profile") {
    return (
      <nav className="navbar">
        <Link to="/admin">Admin</Link>
      </nav>
    );
  }

  return null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
