import React, { useEffect, useState } from 'react';
import { createRecipe, fetchRecipe, updateRecipe } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RecipeForm({ user }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editId = searchParams.get('edit'); // detect if editing

  // 🟢 Load existing recipe if editing
  useEffect(() => {
    if (editId) {
      fetchRecipe(editId)
        .then((r) => {
          setTitle(r.title || '');
          setDesc(r.description || '');
          setIngredients((r.ingredients || []).join('\n'));
          setSteps((r.steps || []).join('\n'));
          setCategory(r.category || '');
          setImageURL(r.imageURL || '');
        })
        .catch(console.error);
    }
  }, [editId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to add or edit recipes');

    try {
      const payload = {
        title,
        description: desc,
        ingredients: ingredients.split('\n').map((s) => s.trim()).filter(Boolean),
        steps: steps.split('\n').map((s) => s.trim()).filter(Boolean),
        category,
        imageURL,
      };

      let r;
      if (editId) {
        r = await updateRecipe(editId, payload);
        alert('Recipe updated successfully!');
      } else {
        r = await createRecipe(payload);
        alert('Recipe created successfully!');
      }

      navigate(`/recipes/${r._id}`);
    } catch (err) {
      console.error(err);
      alert('Error saving recipe');
    }
  };

  return (
    <div className="card">
      <h3>{editId ? 'Edit Recipe' : 'Add New Recipe'}</h3>
      <form onSubmit={submit}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Short description"
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Ingredients (one per line)"
          rows="4"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Steps (one per line)"
          rows="6"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <input
          className="input"
          placeholder="Image URL (optional)"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button className="button" type="submit">
          {editId ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
}
