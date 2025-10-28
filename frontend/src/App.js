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
    </Router>
  );
}

export default App;
