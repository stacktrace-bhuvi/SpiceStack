import React, { useEffect, useState } from 'react';
import { fetchRecipe, deleteRecipe, toggleFavorite } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecipeDetails({ user }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe(id).then(setRecipe).catch(console.error);
  }, [id]);

  if (!recipe) return <p className="hint">Loading...</p>;

  const handleDelete = async () => {
    if (!user || user.id !== recipe.createdBy?._id) return alert('Not authorized');
    if (!window.confirm('Delete recipe?')) return;
    await deleteRecipe(id);
    navigate('/');
  };

  const handleFav = async () => {
    if (!user) return alert('Login to favorite');
    await toggleFavorite(id);
    // naive update
    const updated = await fetchRecipe(id);
    setRecipe(updated);
    window.location.reload();
  };

  return (
    <div>
      <div className="card">
        <h2>{recipe.title}</h2>
        <p className="hint">{recipe.category} • by {recipe.createdBy?.name || 'Unknown'}</p>
        {recipe.imageURL && <img src={recipe.imageURL} alt="" style={{maxWidth:'100%', borderRadius:8}} />}
        <p>{recipe.description}</p>

        <h4>Ingredients</h4>
        <ul>{(recipe.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}</ul>

        <h4>Steps</h4>
        <ol>{(recipe.steps || []).map((s, i) => <li key={i}>{s}</li>)}</ol>

        <div style={{marginTop:10}}>
          <button className="button" onClick={handleFav}>♡ Favorite</button>
          {user && user.id === recipe.createdBy?._id && (
            <>
              <button className="button" style={{marginLeft:8}} onClick={()=>navigate(`/add?edit=${id}`)}>Edit</button>
              <button className="button" style={{marginLeft:8}} onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
