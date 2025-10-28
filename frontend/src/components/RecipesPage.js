import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import { fetchRecipes } from "../services/api";

export default function RecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>All Recipes</h2>
      <RecipeList recipes={recipes} user={user} />
    </div>
  );
}
