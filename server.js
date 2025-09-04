const path = require("path")
const express = require('express');
const session = require('cookie-session');
const { PORT, SERVER_SESSION_SECRET } = require('./config/aps.js');
const cors = require('cors')

let app = express();

app.use(cors())

app.use(session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 }));
app.use(express.static(path.join(__dirname, "wwwroot", "dist")));
app.use(require('./routes/auth.js'));
app.use(require('./routes/hubs.js'));
app.get("/", (req, res) => {
    res.redirect("/index.html")
})
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));