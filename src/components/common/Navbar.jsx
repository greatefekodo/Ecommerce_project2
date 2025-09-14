import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = ApiService.isAthenticated();
  const isAdmin = ApiService.isAdmin();
  const isCustomer = ApiService.isCustomer();
  const isDeliveryPerson = ApiService.isDeliveryPerson();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to logout?");
    if (isLogout) {
      ApiService.logout();
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          Food App
        </Link>
      </div>

      {/* Hamburger / Close button */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/home" className="nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/menu" className="nav-link" onClick={toggleMenu}>Menu</Link>
        <Link to="/categories" className="nav-link" onClick={toggleMenu}>Categories</Link>

        {isAuthenticated ? (
          <>
            {isCustomer && (
              <>
                <Link to="/orders" className="nav-link" onClick={toggleMenu}>Orders</Link>
                <Link to="/cart" className="nav-link" onClick={toggleMenu}>Cart</Link>
              </>
            )}

            {isDeliveryPerson && (
              <Link to="/deliveries" className="nav-link" onClick={toggleMenu}>Deliveries</Link>
            )}

            {isAdmin && (
              <Link to="/admin" className="nav-link" onClick={toggleMenu}>Admin</Link>
            )}

            <Link to="/profile" className="nav-link" onClick={toggleMenu}>Profile</Link>

            <button className="nav-button" onClick={() => { handleLogout(); toggleMenu(); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="nav-link" onClick={toggleMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
