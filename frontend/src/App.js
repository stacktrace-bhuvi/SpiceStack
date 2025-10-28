import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RecipesPage from "./components/RecipesPage";
import RecipeDetails from "./components/RecipeDetails";
import RecipeForm from "./components/RecipeForm";
import Favorites from "./components/Favorites";
import { getMe } from "./services/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe(token)
        .then((u) => setUser(u))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipesPage user={user} />} />
        <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />
        <Route path="/favorites" element={<Favorites user={user} />} />
        <Route path="/add" element={<RecipeForm user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem 0",
          backgroundColor: "#f8e9d2", // soft beige to match your theme
          color: "#6b3e26", // warm brown
          fontWeight: 500,
          fontSize: "0.9rem",
          borderTop: "1px solid #e0c9a6",
          marginTop: "2rem",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 -2px 6px rgba(0,0,0,0.05)",
        }}
      >
        © 2025 <strong>CookConnect</strong>. All rights reserved. <br />
        <span style={{ fontSize: "0.8rem" }}>
          Made with ❤️ by Team SpiceStack
        </span>
      </footer>
    </Router>
  );
}


export default App;
