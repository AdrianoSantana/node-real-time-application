const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../schemas/UserSchema')

app.set("view engine", "pug")
app.set("views", "views")

router.get("/", (req, res, next) => res.status(200).render("register"))
router.post("/", async (req, res, next) => {
  var firstName = req.body.firstName.trim()
  var lastName = req.body.lastName.trim()
  var userName = req.body.userName.trim()
  var email = req.body.email.trim()
  var password = req.body.password
  var payload = req.body

  if (firstName && lastName && userName && email && password) {
    var user = await User.findOne({
      $or: [
        { userName: userName },
        { email: email }
      ]
    })
      .catch((error) => {
        console.log(error)
        payload.errorMessage = "Something wrong"
        res.status(200).render("register", payload)
      })
    
    if (user != null) {
      if (email == user.email)
        payload.errorMessage = "Email already in use!"
      if (userName == user.userName)
        payload.errorMessage = "Username already in use!"
      
      res.status(400).render("register", payload)
    } else {
      var data = req.body
      data.password = await bcrypt.hash(password, 10)
      User.create(data)
        .then((user) => {
          req.session.user = user
          return res.redirect('/')
        })
    }


  } else {
    payload.errorMessage = "Make sure each field has a valid value."
    res.status(200).render("register", payload)
  }
})

module.exports = router


