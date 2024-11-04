function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
}

module.exports = isAuthenticated;

