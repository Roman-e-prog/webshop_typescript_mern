import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req:Request, res:Response, next:NextFunction)=>{
    const sec:string = process.env.JWT_SEC as string;
    const authHeader = req.headers.token;
    if(authHeader){
        const token = (authHeader as string).split(' ')[1];
        jwt.verify(token, sec, async (err, user)=>{
            if(err){
                res.status(403).json('Token not valid');
            }
            if(!user) return res.status(400).json({error:"Not authorized"})
            if(user){
               req.user = <any>user;
            }
            next();
        })
    } else{
        return res.status(401).json('Not authorized');
    }
};
export const verifyTokenAndAuthorization = (req:Request, res:Response, next:NextFunction)=>{
    verifyToken(req,res, ()=>{
        if(req.user){
            if(req.user.id === req.params.id || req.user.isAdmin){
                next();
            }
            else{
                res.status(403).json("Sie sind nicht für diese Operation authorisiert");
            }
        }
       
    })
}
export const verifyTokenAndAdmin = (req:Request, res:Response, next:NextFunction)=>{
    verifyToken(req,res, ()=>{
        if(req.user){
            if(req.user.isAdmin){
                next();
            }
            else{
                res.status(403).json("Sie sind nicht für diese Operation authorisiert");
            }
        }  
    })
}
