const express = require('express');
const { requiredLogin } = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser')
const database = require('./database')
const session = require('express-session')

const app = express();
const port = 3003;



app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());

app.use(session({
  secret: "my-secret",
  resave: true,
  saveUninitialized: false
}))


const loginRoutes = require('./routes/login.routes');
const registerRoutes = require('./routes/register.routes');

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.get("/",
  requiredLogin,
  (req, res, next) => {
  const payLoad = {
    pageTitle: 'home',
    userLoggedIn: req.session.user
  }
  res.status(200).render("home", payLoad)
})

const server = app.listen(port, () => console.log(`Running on port ${port}`));


