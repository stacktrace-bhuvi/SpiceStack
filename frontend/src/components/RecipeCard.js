import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../services/api';

export default function RecipeCard({ recipe, user, onDelete }) {
  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(`/add?edit=${recipe._id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(recipe._id);
    }
  };

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

        <button
          className="button"
          onClick={handleFav}
          style={{ marginRight: 8 }}
        >
          ♡ Favorite
        </button>

        {/* ✏️ Edit Button */}
        {user && recipe.createdBy === user._id && (
          <>
            <button
              className="button"
              onClick={handleEdit}
              style={{ marginRight: 8 }}
            >
              ✏️ Edit
            </button>

            {/* 🗑️ Delete Button */}
            <button
              className="button"
              onClick={handleDelete}
              style={{ backgroundColor: 'darkred', color: 'white' }}
            >
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
