// recipe.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for Recipe
let Recipe = new Schema({
  "name": {
    "type": "String"
  },
  "ingredients": {
    "type": [
      "Mixed"
    ]
  },
  "instructions": {
    "type": [
      "Mixed"
    ]
  }
},{
    collection: 'recipes'
});

module.exports = mongoose.model('recipe', Recipe);