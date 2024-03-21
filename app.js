const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const session = require("express-session")

app.use(session({
  secret: 'bunyaguranyaa',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true }
}))

const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.redirect('/login')
})


app.get('/login', Controller.login)
app.post('/login', Controller.handlerLogin)
app.get('/register', Controller.register)
app.post('/register', Controller.handlerRegister)

app.get('/home', Controller.home)

app.get('/profile', Controller.profile)
app.post('/profile/:id', Controller.editProfile)

app.get('/post/add', Controller.addPost)
app.post('/post/add', Controller.handlerAddPost)
app.get('/post/:id', Controller.postDetail)
app.get('/post/:id/delete', Controller.deletePost)
app.post('/post/:id/reply', Controller.reply)
app.post('/post/:id/vote', Controller.vote)

app.listen(port, () => {
  console.log(`RUNNNNNINNNNNGGG ON ${port}`)
})
