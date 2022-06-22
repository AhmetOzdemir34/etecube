const {User, Team, Todo} = require('../models');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/postgres');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const validator = require("email-validator");

const login = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const markedUser = await User.findOne({where:{email:email, password:password}});
        if(!markedUser){
            return res.json({message:"Not founded matches."}).status(404);
        }
        else{
            const token = jwt.sign({id: markedUser.id}, process.env.JWT_SECRET);
        return res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).json({message:"All is well, loading..."});
        }
    }catch(e){
        return res.status(404).json({message:e.message});
    }
};


const register = async (req,res) =>{
    try{
    const {fullname, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        return res.json({message:"Failed matches of passwords."}).status(404);
    }
    if(!fullname || !email){
        return res.json({message:"Fullname and Email address are required."}).status(404);
    }
    if(!validator.validate(email)){
        return res.json({message:"Email is invalid."}).status(404);
    }
    const newUser = await User.create({
        fullname:fullname,
        email:email,
        password:password,
        img:"https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png"
    })
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET);
        return res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).json({message:"Your account just created."});
    }
    catch(e){
        return res.status(404).json({message:e.message});
    }
};


const loggedin = async (req,res) =>{
    try {
        const token = req.cookies.token;
        if (!token) return res.json({access: false}).status(404);
    
        const user = jwt.verify(token, process.env.JWT_SECRET);

        const sendUser = await User.findOne({where:{
        id:user.id
        }});

        return res.json({access: true, user: sendUser}).status(200);
      } catch (err) {
        return res.json({access: false, user:null}).status(404);
      }
};
const signout = async (req,res) =>{
    res.cookie("token","", {
        httpOnly: true,
        expires: new Date(0)
    }).json({message:"Sign out"}).status(200);
};
const editProfile = async (req,res) =>{
    try{
        const {id, fullname, img, email} = req.body;
        if(!validator.validate(email)){
            return res.json({message:"Email is invalid."}).status(404);
        }
        await User.update({
            fullname:fullname,
            email:email,
            img:img
        },{where:{id:id}})
        
        return res.json({message:"Edited your profile."}).status(200);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
};
const resetPassword = async (req,res) =>{
    try{
        const {password, confirmPassword, id} = req.body;
        if(password != confirmPassword){
            return res.json({message:"Failed matches of passwords."}).status(404);
        }
        await User.update({password:password},{where:{id:id}});
        return res.json({message:"Password was changed successfully."}).status(200);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
};
const teamsOfUser= async (req,res) => {
    try{
        const {id} = req.body;
        console.log(id);
        const teams = await Team.findAll();
        let control = false;
        const a = await teams.filter(team=>{
            control = team.members.find(member=>member==id) ? true : false;
            if(control){
                console.log(team.id);
                return team;
            }
        });
        console.log(a)
        return res.json(a);
    }catch(e){
        return res.json({message:e.message});
    }
}
module.exports = {login, register, loggedin, signout, editProfile, resetPassword, teamsOfUser}

/*
    Team.create({
        name:"Rex",
        creator:1,
        admins:[1],
        members:[1],
    })
    await Todo.create({
        text:"Rex",
        creator:1,
        team:1,
        isCompleted: false
    })*/