const withGuard = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

const apiGuard = (req, res, next) => {
    if (!req.session.logged_in) {
        res.status(403).json({ message: 'You must be logged in to access this route.' });
    } else {
        next();
    }
};

const withoutGuard = (req, res, next) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = { withGuard, apiGuard, withoutGuard }