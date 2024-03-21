const { User, Post, Tag, Comment, Profile } = require('../models/')
const bcrypt = require('bcrypt');
const { Op } = require("sequelize")
const session = require("express-session")

class Controller{
    static async login(req, res){
        try {
            const {error} = req.query
            res.render('login', {error})
        } catch (error) {
            throw error
        }
    }
    static async handlerLogin(req, res){
        try {
            const {email, password} = req.body
            let data = await User.findOne({
                where:{
                    email
                }
            })
            const flag = bcrypt.compareSync(password, data.password)
            if(flag){
                console.log(req.session, "SESSION SEBELUMMMM");
                console.log(data);
                req.session.userId = data.id
                req.session.role = data.role
                console.log(req.session, "SESSION sesudahhhhhhhhhhhhhh");
                res.redirect('/home')
            }else{
                let msg = "Password / Email salah"
                res.redirect(`/login?error=${msg}`)
            }
            
        } catch (error) {
            throw error
        }
    }
    static async register(req, res){
        try {
            res.render('register')
        } catch (error) {
            throw error
        }
    }
    static async handlerRegister(req, res){
        try {
            const {email, password, username} = req.body
            await User.create({
                email,
                password,
                username
            })
            res.redirect('/home')
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let msg = error.errors.map(el=>{
                    return el.message
                })
                res.send(msg)
            }else{
                throw error
            }
        }
    }
    static async home(req, res){
        try {
            const userId = req.session.userId
            console.log(userId, "harusnya iddddddddddddddddddddd");
            const {deleted, sort, search} = req.query
            let data = await Post.findAll({order:[['vote', 'DESC']],include: Tag})
            if(sort == "date"){
                data = await Post.findAll({order:[['createdAt', 'DESC']],include: Tag})
            }
            if(search){
                data = await Post.findAll({
                    where:{
                        title:{
                            [Op.iLike]:`%${search}%`
                        }
                    },
                    include: Tag})
            }
            res.render('home', {data, deleted})
        } catch (error) {
            throw error
        }
    }
    static async postDetail(req, res){
        try {
            const {id} = req.params
            let data = await Post.findByPk(id, {
                include: {
                    model: Comment,
                    include: User
                }
            })
            res.render('post', {data})
        } catch (error) {
            throw error
        }
    }
    static async addPost(req, res){
        try {
            res.render('addPost')
        } catch (error) {
            throw error
        }
    }
    static async handlerAddPost(req, res){
        try {
            const {title, content} = req.body
            await Post.create({
                title,
                content
            })
            res.redirect('/home')
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let msg = error.errors.map(el=>{
                    return el.message
                })
                res.send(msg)
            }else{
                throw error
            }
        }
    }
    static async reply(req, res){
        try {
            const {content} = req.body
            const id = req.params.id
            await Comment.create({
                content,
                PostId: id,
                UserId: 1
            });// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< UBAH KETIKA SUDAH PAKAI MIDDLEWARE
            res.redirect(`/post/${id}`)
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                let msg = error.errors.map(el=>{
                    return el.message
                })
                res.send(msg)
            }else{
                throw error
            }
        }
    }
    static async vote(req, res){
        try {
            const {id} = req.params
            const {vote} = req.query
            await Post.increment('vote', {by:vote, where:{id}});
            res.redirect('/home')
        } catch (error) {
            throw error
        }
    }
    static async profile(req, res){
        try {
            let data = await User.findAll({ 
                where:{
                    id:2
                },
                include: Profile
            })//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GANTI KETIKA UDAH ADA SESSION
            res.render('profile', {data})
        } catch (error) {
            throw error
        }
    }
    static async editProfile(req, res){
        try {
            const {id} = req.params
            const {username} = req.body
            let data = await User.findByPk(id)
            data.dataValues.username = username
            await data.save()
            res.redirect('/profile')
        } catch (error) {
            throw error
        }
    }
    static async deletePost(req, res){
        try {
            const {id} = req.params
            let deleted = await Post.findByPk(id)
            await Post.destroy({
                where:{
                    id
                }
            })
            res.redirect(`/home?deleted=${deleted.dataValues.title}`)
        } catch (error) {
            throw error
        }
    }
    static async template(req, res){
        try {
            
        } catch (error) {
            throw error
        }
    }
}

module.exports = Controller