const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // Định nghĩa một route đơn giản
        
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });

    app.use('/news', newsRouter);
    app.use('/', siteRouter);

}

module.exports = route;