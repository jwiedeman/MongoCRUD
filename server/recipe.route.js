const express = require('express');
const recipeRoutes = express.Router();

// Require recipe model in our routes module
let Recipe = require('./recipe.model');



// CREATE 
recipeRoutes.route('/add').post(function (req, res) {
  let recipe = new Recipe(req.body);
  recipe.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});



// READ
recipeRoutes.route('/').get(function (req, res) {
  Recipe.find(function(err, recipes){
    if(err){
      res.json(err);
    }
    else {
      res.json(recipes);
    }
  });
});

// SEARCH 
recipeRoutes.route('/dbdump').get(function (req, res) {
  Recipe.find({}, function (err, docs) {
    res.json(docs);
 });
});


// Route to edit
recipeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Recipe.findById(id, function (err, recipe){
      if(err) {
        res.json(err);
      }
      res.json(recipe);
  });
});


//  UPDATE
recipeRoutes.route('/update/:id').post(function (req, res) {
  Recipe.findById(req.params.id, function(err, recipe) {
    if (!recipe)
      res.status(404).send("data is not found");
    else {
      recipe.name = req.body.name;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// DELETE
recipeRoutes.route('/delete/:id').delete(function (req, res) {
    Recipe.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        Recipe.find(function(err, recipes){
          if(err) res.json(err);
          else res.json(recipes);
        });
    });
});



module.exports = recipeRoutes;