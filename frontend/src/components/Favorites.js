import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import { getMe } from '../services/api';

export default function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    getMe(token).then(data => {
      setFavorites(data.favorites || []);
    }).catch(console.error);
  }, []);

  if (!user) return <p className="hint">Please login to view favorites.</p>;

  return (
    <div>
      <h3>Your Favorites</h3>
      <RecipeList recipes={favorites} user={user} />
    </div>
  );
}
