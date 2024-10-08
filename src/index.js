const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars');  // Đảm bảo require đúng thư viện
const session = require('express-session');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
const hbs = expressHandlebars.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
});

app.engine('hbs', hbs.engine);  // Sử dụng hbs.engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
