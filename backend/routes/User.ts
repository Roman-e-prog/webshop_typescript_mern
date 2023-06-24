import { Router, Request, Response} from "express";
const userRouter = Router();
import User from '../models/user';
const randomToken = require('random-token');
import bcrypt from 'bcrypt';
import PasswordReset from "../models/passwordReset";
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: '0.0.0.0',
    port:   1025,
})
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.TESTMAIL,
//         pass: process.env.TESTMAIL_PASSWORD,
//     },
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.TESTMAIL,
//         clientId: process.env.OAUTH_CLIENT_ID,
//         clientSecret: process.env.OAUTH_CLIENT_KEY,
//         refreshToken: 'YOUR_REFRESH_TOKEN',
//         accessToken: 'YOUR_ACCESS_TOKEN'
//     }
// })
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/jwtVerify';

userRouter.put('/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body,
    },{new:true})
        res.status(200).json(updatedUser);
    } catch(error){
        res.status(404)
        throw new Error("Benutzer nicht gefunden");
    }
});
userRouter.delete('/:id', verifyTokenAndAuthorization, async(req:Request, res:Response)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Benutzer wurde gelöscht');
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
});
userRouter.get('/find/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user?._doc;
        res.status(200).json(others);
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
})
userRouter.get('/find', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
});
//forgotten
userRouter.post('/forgot', async (req:Request, res:Response)=>{
    try{
        const email = req.body.email;
        const token = randomToken(16);
        const newPassword = new PasswordReset({
            email,
            token,
        })
        await newPassword.save();

        const url = `http://localhost:3000/reset/${token}`
        await transporter.sendMail({
            from:'admin@example.com',
            to:email,
            subject:'Reset your password',
            html: `Klicken Sie<a href="${url}"> hier</a> um Ihr Passwort zu resetten`
        })
        res.status(200).json({
            message:"Rufen Sie bitte Ihre E-mail auf"
        })
    } catch(error){
        console.log(error)
        res.status(404).json("Benutzer nicht gefunden");
    }
});
userRouter.post('/reset', async (req:Request, res:Response)=>{
    if(req.body.password !== req.body.password_confirm){
        res.status(400).json({
            message:"Passwörter müssen übereinstimmen"
        });
    }
    const passwordReset = await PasswordReset.findOne({token:req.body.token})
    const {email} = await passwordReset!.toJSON();
    const user = await User.findOne({filter:{email}})
    if(!user){
        res.status(404).json({
            message:"User wurde nicht gefunden",
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user!.password = hash;
    user!.save();
    res.status(200).json("Passwort wurde erfolgreich geändert");
})


export default userRouter;

