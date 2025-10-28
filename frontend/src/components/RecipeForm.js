import React, { useState } from "react";
import { createRecipe } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RecipeForm({ user }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return <p className="hint" style={{ textAlign: "center" }}>Login to add recipes</p>;
  }

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description: desc,
      ingredients: ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
      steps: steps.split("\n").map((s) => s.trim()).filter(Boolean),
      category,
      imageURL,
    };
    try {
      const r = await createRecipe(payload);
      alert("Recipe created!");
      navigate(`/recipes/${r._id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating recipe");
    }
  };

  return (
    <div className="card">
      <h3>Add New Recipe</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <input className="input" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
        <textarea className="input" placeholder="Short Description" rows={3} value={desc} onChange={(e)=>setDesc(e.target.value)} />
        <textarea className="input" placeholder="Ingredients (one per line)" rows={4} value={ingredients} onChange={(e)=>setIngredients(e.target.value)} />
        <textarea className="input" placeholder="Steps (one per line)" rows={6} value={steps} onChange={(e)=>setSteps(e.target.value)} />
        <input className="input" placeholder="Image URL (optional)" value={imageURL} onChange={(e)=>setImageURL(e.target.value)} />
        <button className="button" type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
