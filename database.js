const mongoose = require('mongoose')

class Database {
  constructor() { 
    this.connect() 
  }
  
  connect() {
    mongoose.connect("mongodb+srv://mongodb:mongodb@adrianotwitterclone.2l7msxw.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log('Database connected!')
    })
    .catch(() => {
      console.log('Connection to database fails!')
    })
  }
}

module.exports = new Database()