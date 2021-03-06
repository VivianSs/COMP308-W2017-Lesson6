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
function requireAuth(req, res, next) {
  //check if the user is logged index
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
 console.log("user: "+ req.user);
 
  res.render('content/index', {
    title: 'Home',
    games: '',
    displayName: req.user ? req.user.displayName : ''
  });
});




/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET /login - render the login view */
router.get('/login', (req, res, next) => {
  // check to see if the user is already logged index
  if (!req.user) {
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      game: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/games');
  }
});

//POST /login - process the login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureFlash: true
}));

//GET /register - render the register view
router.get('/register', (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    //render the register page 
    res.render('auth/register', {
      title: 'Register',
      game: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;

  }
});

// POST /register - process the register page
router.post('/register', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('Error insterting new user');
        if (err.name == 'UserExistsError') {
          req.flash('registerMessage', 'Registration Error: User Already Exists!');
        }
        return res.render('auth/register', {
          title: 'Register',
          game: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/games');
      });
    });

});


//GET /logout - logout th euser and redirect to the home page
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); //redirect to home page
});




module.exports = router;
