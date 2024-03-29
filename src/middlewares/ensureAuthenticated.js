function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/auth/login");
    }
}

export default ensureAuthenticated;
