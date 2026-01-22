import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const role = user?.role;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully ✅");
    closeMenu();
    navigate("/auth");
  };

  return (
    <>
      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      <header className="nav-wrap">
        <div className="nav-inner">
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <div className="nav-logo">✓</div>
            <span className="nav-title">TravelDash</span>
          </Link>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            <NavLink to="/" className="nav-link" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/packages" className="nav-link" onClick={closeMenu}>
              Packages
            </NavLink>

            {/* ✅ ADMIN */}
            {user && role === "admin" && (
              <>
                <NavLink to="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </NavLink>

                <NavLink to="/bookings" className="nav-link" onClick={closeMenu}>
                  Bookings
                </NavLink>

                {/* ✅ Logout tab for Admin */}
                <button
                  onClick={handleLogout}
                  className="nav-link nav-link-btn"
                >
                  Logout
                </button>
              </>
            )}

            {/* ✅ CUSTOMER */}
            {user && role === "customer" && (
              <>
                <NavLink to="/bookings" className="nav-link" onClick={closeMenu}>
                  My Bookings
                </NavLink>

                <NavLink to="/wishlist" className="nav-link" onClick={closeMenu}>
                  Wishlist
                </NavLink>

                <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact
                </NavLink>

                {/* ✅ Logout tab for Customer */}
                <button
                  onClick={handleLogout}
                  className="nav-link nav-link-btn"
                >
                  Logout
                </button>
              </>
            )}

            {/* ✅ NOT LOGGED IN */}
            {!user && (
              <>
                <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact
                </NavLink>

                <NavLink to="/auth" className="nav-link nav-link-login" onClick={closeMenu}>
  Login
</NavLink>

              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
