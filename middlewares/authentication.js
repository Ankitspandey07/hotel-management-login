const isLoggedIn = (req, res, next) =>
	req.isAuthenticated() ? next() : res.redirect('/auth/login');

const isLoggedOut = (req, res, next) =>
	!req.isAuthenticated() ? next() : res.send('Logout first');

const isCustomer = (req, res, next) => {
	const { isOwner, isManager, isReceptionist } = req.user;
	isOwner || isManager || isReceptionist ? res.status(404) : next();
};

const isOwner = (req, res, next) => {
	const { isOwner } = req.user;
	isOwner ? next() : res.status(404);
};

const isManager = (req, res, next) => {
	const { isManager } = req.user;
	isManager ? next() : res.status(404);
};

const isReceptionist = (req, res, next) => {
	const { isReceptionist } = req.user;
	isReceptionist ? next() : res.status(404);
};

module.exports = { isLoggedIn, isLoggedOut, isCustomer, isManager, isOwner, isReceptionist };
