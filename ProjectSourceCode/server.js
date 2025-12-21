const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));

const db = new sqlite3.Database(path.join(__dirname, 'contact.db'), (err) => {
    if (err) console.error("DB open error:", err);
    else console.log("Connected to SQLite DB");
});

db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`, (err) => {
    if (err) console.error("Create table error:", err);
});

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

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).send("Missing required fields.");
    }

    db.run(
        `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
        [name.trim(), email.trim(), message.trim()],
        (err) => {
            if (err) {
                console.error("DB insert error:", err);
                return res.status(500).send("Database error.");
            }
            return res.redirect('/#contact?success=1');
        }
    );
});




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



