import React from 'react';
import { Link } from 'react-router-dom';
import { toggleFavorite, deleteRecipe } from '../services/api';

export default function RecipeCard({ recipe, user }) {
  const handleFav = async () => {
    if (!user) return alert('Login to add favorites');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await toggleFavorite(recipe._id);
        window.location.reload(); // refresh page after toggling favorite
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await deleteRecipe(recipe._id);
      alert('Recipe deleted successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete recipe');
    }
  };

  // ✅ Only show Edit/Delete if this user created the recipe
  const isOwner =
    user &&
    recipe.createdBy &&
    (recipe.createdBy._id === user._id || recipe.createdBy === user._id);

  return (
    <div className="card">
      <h4>{recipe.title}</h4>
      <p className="hint">
        {recipe.category} • {new Date(recipe.createdAt).toLocaleDateString()}
      </p>
      <p>
        {recipe.description
          ? recipe.description.slice(0, 120) +
            (recipe.description.length > 120 ? '...' : '')
          : ''}
      </p>

      <div style={{ marginTop: 8 }}>
        <Link
          to={`/recipes/${recipe._id}`}
          className="button"
          style={{ marginRight: 8 }}
        >
          View
        </Link>

        {isOwner && (
          <>
            <Link
              to={`/add-recipe?edit=${recipe._id}`}
              className="button"
              style={{ marginRight: 8 }}
            >
              ✏️ Edit
            </Link>
            <button
              className="button"
              onClick={handleDelete}
              style={{ marginRight: 8, backgroundColor: 'darkred', color: 'white' }}
            >
              🗑️ Delete
            </button>
          </>
        )}

        <button className="button" onClick={handleFav}>
          ♡ Favorite
        </button>
      </div>
    </div>
  );
}
