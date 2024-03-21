const { User, Post, Tag, Comment, Profile, PostTag } = require('../models/')
const bcrypt = require('bcrypt');
const { Op } = require("sequelize")
const session = require("express-session")
const toNumber = require('../helpers/helper')

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
            // let data = await User.findOne({
            //     where:{
            //         email
            //     }
            // })
            let data = await User.login(email)
            const flag = bcrypt.compareSync(password, data.password)
            if(flag){
                req.session.userId = data.id
                req.session.role = data.role
                res.redirect('/posts')
            }else{
                let msg = "Thy password or electronic missive thou hast supplied is incorrect"
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
            res.redirect('/login')
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
            res.render('home')
        } catch (error) {
            throw error
        }
    }
    static async posts(req, res){
        try {
            const {deleted, sort, search, error} = req.query
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
            res.render('posts', {data, deleted, error, toNumber})
        } catch (error) {
            throw error
        }
    }
    static async postDetail(req, res){
        try {
            const {id} = req.params
            const role = req.session.role
            const tags = await Tag.all()
            let data = await Post.findByPk(id, {
                include: {
                    model: Comment,
                    include: User
                }
            })
            res.render('post', {data, role, tags})
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
            res.redirect('/posts')
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
    static async handlerAddPostTag(req, res){
        try {
            const {TagId} = req.body
            const PostId = req.params.id
            await PostTag.create({
                TagId,
                PostId
            })
            res.redirect(`/posts`)
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
            const UserId = req.session.userId
            await Comment.create({
                content,
                PostId: id,
                UserId
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
            res.redirect('/posts')
        } catch (error) {
            throw error
        }
    }
    static async profile(req, res){
        try {
            const UserId = req.session.userId 
            let data = await User.findAll({ 
                where:{
                    id: UserId
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
            res.redirect(`/posts?deleted=${deleted.dataValues.title}`)
        } catch (error) {
            throw error
        }
    }
    static async logout(req, res){
        try {
            req.session.destroy((error)=>{
                if(error){
                    console.log(error);
                }else{
                    res.redirect('/login')
                }
            })
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