import React from 'react';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../services/api';

export default function RecipeCard({ recipe, user }) {
  const handleFav = async () => {
    if (!user) return alert('Login to add favorites');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await toggleFavorite(recipe._id);
        // refresh - naive: reload page
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card">
      <h4>{recipe.title}</h4>
      <p className="hint">{recipe.category} • {new Date(recipe.createdAt).toLocaleDateString()}</p>
      <p>{recipe.description ? recipe.description.slice(0, 120) + (recipe.description.length > 120 ? '...' : '') : ''}</p>
      <div style={{marginTop:8}}>
        <Link to={`/recipes/${recipe._id}`} className="button" style={{marginRight:8}}>View</Link>
        <button className="button" onClick={handleFav}>♡ Favorite</button>
      </div>
    </div>
  );
}
