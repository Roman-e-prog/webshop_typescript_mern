import { Router, Request, Response } from "express";
const orderRouter = Router();
import Order from "../models/order";
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/jwtVerify';

orderRouter.post('/', verifyToken, async (req:Request, res:Response)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(error){
        res.status(401).json(error)
    }
});
orderRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedOrder);
    }catch(error){
        res.status(404).json("not found")
    }
});
orderRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Einkaufswagen wurde gelöscht");
    }catch(error){
        res.status(404).json("not found")
    }
});
orderRouter.get('/find/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    }catch(error){
        res.status(403).json("Forbidden");
    }
});
orderRouter.get('/find', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    }catch(error){
        res.status(404).json("Not found");
    }
});
//Get monthly income
orderRouter.get('/income', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const income = await Order.aggregate([
            {$project: {
                month: {$month: "$createdAt"},
                day:{$dayOfMonth:"$createdAt"},
                year:{$year:"$createdAt"},
                sales: "$netto",
            }},
            {$group:{
                _id: {
                    "year":"$year",
                    "month":"$month",
                    "day":"$day",  
            },
                total:{$sum: "$sales"}
            }},     
        ]);
        
        res.status(200).json(income);
    }catch(error){
        res.status(404).json("Not found");
    }
})
orderRouter.get('/townAnalyse', async (req:Request, res:Response)=>{
    try{
        const townAnalyse =  await Order.aggregate([
            {$group:{
                _id:{
                    city:"$user.city",
                    plz:"$user.plz",
                }, 
                totalNetto:{$sum: "$netto"},
                userCount:{$sum: 1}
            }}
        ])
        res.status(200).json(townAnalyse);
    } catch(error){
        res.status(404)
        console.log(error)
        throw new Error("Keine Datan gefunden")
    }
})
export default orderRouter;
