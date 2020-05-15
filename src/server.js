const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()

// mongoose.connect('mongodb+srv://Project5:Project5@cluster0-cjnp9.mongodb.net/projeto5semestre?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
mongoose.connect('mongodb+srv://gabriel:gabriel@projeto-mdbnw.mongodb.net/projeto5semestre?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
 
app.use(express.json())
app.use(cors());
app.use(routes)

app.listen(3333)