import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.45)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Brand Name */}
      <Link
        to="/"
        style={{
          fontSize: "26px",
          fontWeight: "700",
          textDecoration: "none",
          color: "#7b4b27",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        CookConnect
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#3d2a22",
            background: "#d6bfa6",
            fontSize: "15px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#c8a989";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#d6bfa6";
            e.target.style.transform = "scale(1)";
          }}
        >
          Home
        </Link>

        <Link
          to="/recipes"
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#3d2a22",
            background: "#d6bfa6",
            fontSize: "15px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#c8a989";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#d6bfa6";
            e.target.style.transform = "scale(1)";
          }}
        >
          Recipes
        </Link>

        {user && (
          <Link
            to="/favorites"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#3d2a22",
              background: "#d6bfa6",
              fontSize: "15px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#c8a989";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#d6bfa6";
              e.target.style.transform = "scale(1)";
            }}
          >
            Favorites
          </Link>
        )}

        {/* Add Recipe button (only if logged in) */}
        {user && (
          <Link
            to="/add"
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",
              background: "#7b4b27",
              fontWeight: "600",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#8a5a36")}
            onMouseLeave={(e) => (e.target.style.background = "#7b4b27")}
          >
            + Add Recipe
          </Link>
        )}

        {/* Auth */}
        {!user ? (
          <>
            <Link
              to="/login"
              style={{
                padding: "10px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#fff",
                background: "#7b4b27",
                fontWeight: "600",
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#8a5a36")}
              onMouseLeave={(e) => (e.target.style.background = "#7b4b27")}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                padding: "10px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#fff",
                background: "#7b4b27",
                fontWeight: "600",
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#8a5a36")}
              onMouseLeave={(e) => (e.target.style.background = "#7b4b27")}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              background: "#7b4b27",
              fontWeight: "600",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#8a5a36")}
            onMouseLeave={(e) => (e.target.style.background = "#7b4b27")}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
