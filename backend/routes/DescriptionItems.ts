import {Router, Request, Response} from 'express';
const descriptionItemsRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import DescriptionItem from '../models/descriptionItems';

descriptionItemsRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newDescriptionItem = new DescriptionItem(req.body);
    try{
        const savedDescriptionItems = await newDescriptionItem.save();
        res.status(200).json(savedDescriptionItems);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
descriptionItemsRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedDescriptionItem = await DescriptionItem.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedDescriptionItem);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
descriptionItemsRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await DescriptionItem.findByIdAndDelete(req.params.id);
        res.status(200).json("DescriptionItem wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
descriptionItemsRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const descriptionItems = await DescriptionItem.findById(req.params.id);
        res.status(200).json(descriptionItems)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
descriptionItemsRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allDescriptionItems = await DescriptionItem.find();
        res.status(200).json(allDescriptionItems)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default descriptionItemsRouter;

