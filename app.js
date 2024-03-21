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
  res.redirect('/home')
})

app.get('/home', Controller.home)
app.get('/login', Controller.login)
app.post('/login', Controller.handlerLogin)
app.get('/register', Controller.register)
app.post('/register', Controller.handlerRegister)

app.use(function (req, res, next){
  if(!req.session.userId){
    const msg = "Pray, thou must be logged ere thou canst lay eyes upon such information"
    res.redirect(`/login?error=${msg}`)
  }else{
    next()
  }
})

const roleCheck = function (req, res, next){
  if(req.session.role == "god"){
    next()
  }else{
    const msg = "Verily, only the Almighty hath the power to expunge posts, thou fool"
    res.redirect(`/home?error=${msg}`)
  }
}

app.get('/profile', Controller.profile)
app.post('/profile/:id', Controller.editProfile)

app.get('/posts', Controller.posts)
app.get('/post/add', Controller.addPost)
app.post('/post/add', Controller.handlerAddPost)
app.get('/post/:id', Controller.postDetail)
app.post('/post/:id/add-tag', roleCheck, Controller.handlerAddPostTag)
app.get('/post/:id/delete', roleCheck, Controller.deletePost) //only god can delete
app.post('/post/:id/reply', Controller.reply)
app.post('/post/:id/vote', Controller.vote)
app.get('/logout', Controller.logout)

app.listen(port, () => {
  console.log(`RUNNNNNINNNNNGGG ON ${port}`)
})
