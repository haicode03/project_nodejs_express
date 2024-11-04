const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const institutesRouter = require('./institutes');
const majorsRouter = require('./majors');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/institutes', institutesRouter);
    app.use('/majors', majorsRouter);

    app.use('/', siteRouter);
}

module.exports = route;