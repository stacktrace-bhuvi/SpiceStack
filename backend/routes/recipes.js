const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

/* ===================================================
   GET /api/recipes - list all or search
=================================================== */
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    let filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter = {
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { ingredients: regex },
        ],
      };
    }

    const recipes = await Recipe.find(filter)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/* ===================================================
   ✅ GET /api/recipes/:id - single recipe details
=================================================== */
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    console.error('❌ Error fetching recipe by ID:', err);
    res.status(500).send('Server error');
  }
});

/* ===================================================
   POST /api/recipes - create (auth)
=================================================== */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, ingredients, steps, category, imageURL } = req.body;
    if (!title) return res.status(400).json({ msg: 'Title is required' });

    const recipe = new Recipe({
      title,
      description,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients
        ? ingredients.split('\n')
        : [],
      steps: Array.isArray(steps)
        ? steps
        : steps
        ? steps.split('\n')
        : [],
      category,
      imageURL,
      createdBy: req.user.id,
    });

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/* ===================================================
   PUT /api/recipes/:id - update (auth + owner)
=================================================== */
router.put('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
    if (recipe.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: 'User not authorized' });

    const { title, description, ingredients, steps, category, imageURL } = req.body;
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = Array.isArray(ingredients)
      ? ingredients
      : ingredients
      ? ingredients.split('\n')
      : recipe.ingredients;
    recipe.steps = Array.isArray(steps)
      ? steps
      : steps
      ? steps.split('\n')
      : recipe.steps;
    recipe.category = category || recipe.category;
    recipe.imageURL = imageURL || recipe.imageURL;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/* ===================================================
   DELETE /api/recipes/:id - delete (auth + owner)
=================================================== */
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    if (recipe.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: 'User not authorized' });

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/* ===================================================
   POST /api/recipes/:id/toggle-favorite
=================================================== */
router.post('/:id/toggle-favorite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.id;
    const idx = user.favorites.findIndex((r) => r.toString() === recipeId);

    if (idx === -1) user.favorites.push(recipeId);
    else user.favorites.splice(idx, 1);

    await user.save();
    const populated = await User.findById(req.user.id).populate('favorites');
    res.json(populated.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
