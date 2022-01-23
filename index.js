const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./passport');
const { isLoggedOut, isLoggedIn } = require('./middlewares/authentication');
const flash = require('connect-flash');
const authRoute = require('./routes/auth');
const morgan = require('morgan');

app.use(morgan('common'));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/auth', authRoute);

app.get('/', isLoggedIn, (req, res) => res.render('index'));

app.listen(8000, () => console.log('Server running'));
