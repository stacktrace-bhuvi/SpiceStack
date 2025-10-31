import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, user, onDelete }) {
  if (!recipes || recipes.length === 0)
    return <p className="hint">No recipes found.</p>;

  return (
    <div className="recipe-grid">
      {recipes.map((r) => (
        <RecipeCard key={r._id} recipe={r} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
}
