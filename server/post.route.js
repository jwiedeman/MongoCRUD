const express = require('express');
const clientRoutes = express.Router();

// Require client model in our routes module
let Client = require('./client.model');



// CREATE 
clientRoutes.route('/add').post(function (req, res) {
  let client = new Client(req.body);
  client.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});



// READ
clientRoutes.route('/').get(function (req, res) {
    Client.find(function(err, clients){
    if(err){
      res.json(err);
    }
    else {
      res.json(clients);
    }
  });
});


// READ
clientRoutes.route('/dbdump').get(function (req, res) {
  Client.find({}, function (err, docs) {
    res.json(docs);
 });
});


// Route to edit
clientRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Client.findById(id, function (err, client){
      if(err) {
        res.json(err);
      }
      res.json(client);
  });
});


//  UPDATE
clientRoutes.route('/update/:id').post(function (req, res) {
    Client.findById(req.params.id, function(err, client) {
    if (!client)
      res.status(404).send("data is not found");
    else {
        client.title = req.body.title;
        client.body = req.body.body;
        client.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// DELETE
clientRoutes.route('/delete/:id').delete(function (req, res) {
    Client.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        client.find(function(err, clients){
          if(err) res.json(err);
          else res.json(clients);
        });
    });
});



module.exports = clientRoutes;