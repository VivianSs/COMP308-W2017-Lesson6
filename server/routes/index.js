//modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let game = require('../models/games');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User;// alias for User

// define the game model
let GameModel = require('../models/games');

//function to check if the user is authenticated
function requireAuth(req, res, next){
  //check if the user is logged index
  if(!req.isAuthenticated()){
    return res.redirect('auth/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: ''
   });
});




/* GET contact page. */
router.get('/contact',(req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: ''
   });
});

module.exports = router;
