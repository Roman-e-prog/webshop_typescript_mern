import {Router, Request, Response} from 'express';
import { verifyTokenAndAdmin } from '../middleware/jwtVerify';
const messagesRouter = Router();
import UserMessage from '../models/messages';
messagesRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newUserMessage = new UserMessage(req.body);
    try{
        const savedUserMessage = await newUserMessage.save();
        res.status(200).json(savedUserMessage);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
messagesRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updateMessage = await UserMessage.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        }, {new:true})
        res.status(200).json(updateMessage);
    }catch(error){
        res.status(404)
        throw new Error('Not found')
    }
})
messagesRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await UserMessage.findByIdAndDelete(req.params.id);
        res.status(200).json('Nachricht wurde gelöscht')
    }catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
messagesRouter.get('/find/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
         const OneUsermessage = await UserMessage.findById(req.params.id);
        res.status(200).json(OneUsermessage)
    }catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
messagesRouter.get('/find/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
         const OneUsermessage = await UserMessage.find();
        res.status(200).json(OneUsermessage)
    }catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
export default messagesRouter;