const express = require('express');
const { requiredLogin } = require('./middleware');
const app = express();
const port = 3003;

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.json());
const loginRoutes = require('./routes/login.routes')

app.use("/login", loginRoutes);

app.get("/",
  requiredLogin,
  (req, res, next) => {
  const payLoad = {
    pageTitle: 'home'
  }
  res.status(200).render("home", payLoad)
})

const server = app.listen(port, () => console.log(`Running on port ${port}`));


