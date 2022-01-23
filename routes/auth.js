const router = require('express').Router();
const { isLoggedOut } = require('../middlewares/authentication');
const passport = require('../passport');
const User = require('../db');
const bcrypt = require('bcrypt');

router.get('/login', isLoggedOut, (req, res) => {
  res.render('login', { msg: req.flash('error')[0] });
});

router.get('/register', isLoggedOut, (req, res) => {
  res.render('register', { msg: req.flash('register-error')[0] });
});

router.post('/register', isLoggedOut, async (req, res) => {
  try {
    const { username, password, password2 } = req.body;
    if (password !== password2) {
      req.flash('register-error', 'Passwords do not match.');
      return res.redirect('register');
    }
    if (await User.findOne({ username })) {
      req.flash('register-error', 'Username already exists');
      return res.redirect('register');
    }
    await User.create({
      username,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
    });
    res.redirect('login');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post(
  '/login',
  isLoggedOut,
  passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true,
    failureRedirect: 'login',
  })
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('login');
});

module.exports = router;
