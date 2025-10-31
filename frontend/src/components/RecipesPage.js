import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import { fetchRecipes, deleteRecipe } from "../services/api";

export default function RecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all recipes initially
  useEffect(() => {
    loadRecipes();
  }, []);

  // Function to fetch recipes (optionally filtered)
  const loadRecipes = async (query = "") => {
    try {
      setLoading(true);
      const data = await fetchRecipes(query);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search (fetch after user stops typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadRecipes(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = () => loadRecipes(search);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id);
        setRecipes(recipes.filter((r) => r._id !== id));
      } catch (error) {
        alert("You can only delete recipes you created.");
        console.error(error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "20px 0" }}>🍳 All Recipes</h2>

      {/* 🔍 Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: "8px",
            borderRadius: "6px",
            width: "250px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
            backgroundColor: "#b5651d",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* 🌀 Loading or Results */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div className="spinner"></div>
        </div>
      ) : recipes.length === 0 ? (
        <p style={{ marginTop: "40px", color: "#777", fontSize: "18px" }}>
          😕 No recipes found. Try another search!
        </p>
      ) : (
        <RecipeList recipes={recipes} user={user} onDelete={handleDelete} />
      )}
    </div>
  );
}
