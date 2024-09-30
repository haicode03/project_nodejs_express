class SiteController {

    //[GET] /home index
    index(req, res) {
        res.render('home');
    }

    // [GET] /share
    share(req, res) {
        res.send('NEWS DETAIL!!');
    }

}

module.exports = new SiteController;