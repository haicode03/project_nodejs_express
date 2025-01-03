const newsRouter = require('./news');
const teacherRouter = require('./teacher');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const institutesRouter = require('./institutes');
const majorsRouter = require('./majors');
const classesRouter = require('./classes');
const studentsRouter = require('./students');
const student_groupsRouter = require('./student_groups')
const topicsRouter = require('./topics');
const projectsRouter = require('./projects');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);
    app.use('/news', newsRouter);
    app.use('/teacher', teacherRouter);
    app.use('/courses', coursesRouter);
    app.use('/institutes', institutesRouter);
    app.use('/majors', majorsRouter);
    app.use('/classes', classesRouter);
    app.use('/students', studentsRouter);
    app.use('/student_groups', student_groupsRouter);
    app.use('/topics', topicsRouter);
    app.use('/projects', projectsRouter);

    app.use('/', siteRouter);
}

module.exports = route;