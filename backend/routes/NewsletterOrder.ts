import {Router, Request, Response} from 'express';
const newsletterOrderRouter = Router();
import NewsletterOrder from '../models/newsletterOrder';

newsletterOrderRouter.post('/', async (req:Request, res:Response)=>{
    const newNewsletterOrder = new NewsletterOrder(req.body);
    try{
        const savedNewsletterOrder = await newNewsletterOrder.save();
        res.status(200).json(savedNewsletterOrder);
    } catch(error){
        res.status(403)
        throw new Error("Action failed")
    }
});
newsletterOrderRouter.delete('/:id', async (req:Request, res:Response)=>{
    try{
        await NewsletterOrder.findByIdAndDelete(req.params.id);
        res.status(200).json(`Newsletter ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Not found")
    }
});

newsletterOrderRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allNewsletterOrders = await NewsletterOrder.find();
        res.status(200).json(allNewsletterOrders);
    } catch(error){
        res.status(403)
        throw new Error("Action failed")
    }
});
export default newsletterOrderRouter;