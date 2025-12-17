const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

app.engine('hbs', exphbs.engine({
    extname: '.hbs', layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: false
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('pages/about', { title: 'Ryan Murray' });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'Ryan Murray' });
});

app.get('/projects', (req, res) => {
    res.render('pages/projects', { title: 'Ryan Murray' });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: 'Ryan Murray' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

