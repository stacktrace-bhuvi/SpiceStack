const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  category: { type: String },
  imageURL: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
