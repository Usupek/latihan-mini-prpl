import { useLocation, Link } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  // Cek status login
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  // config untuk setiap halaman=  pathname, link tujuan, string
  const navConfig = {
    "/admin": {                     
      linkTo: "/profile",
      linkText: "Profile Saya"
    },
    "/profile": {
      linkTo: "/admin",
      linkText: "Admin"
    },
    "/": {
      linkTo: "/",
      linkText: "Home"
    }
  };
  
  const config = navConfig[location.pathname];
  
  if (!config) return null;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <Link to={config.linkTo}>{config.linkText}</Link>
      {isLoggedIn ? (
        <button 
          onClick={handleLogout} 
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Logout
        </button>
      ) : (
        <button 
          onClick={handleLogin} 
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
