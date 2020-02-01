// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 65501;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const recipeRoute = require('./recipe.route');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/recipe', recipeRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});