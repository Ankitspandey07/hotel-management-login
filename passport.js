const passport = require('passport');
const { deleteOne } = require('./db');
const LocalSchema = require('passport-local').Strategy;
const User = require('./db');
const bcrypt = require('bcrypt');

passport.use(
	new LocalSchema(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) return done(null, false, { message: 'No user found.' });
			if (!(await bcrypt.compare(password, user.password)))
				return done(null, false, { message: 'Password incorrect.' });
			done(null, user);
		} catch (err) {
			done(err);
		}
	})
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		user ? done(null, user) : done(err);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
