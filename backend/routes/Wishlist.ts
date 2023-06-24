import {Router, Request, Response} from 'express';
import { verifyToken } from '../middleware/jwtVerify';
import Wishlist from '../models/wishlist';
const wishlistRouter = Router();

wishlistRouter.post('/', verifyToken, async (req:Request, res:Response)=>{
    const newWishlist = new Wishlist(req.body);
    try{
        const savedWishlist = await newWishlist.save();

        res.status(200).json(savedWishlist);

    } catch(error){
        res.status(403)
        throw new Error('Aktion verboten')
    }
})

wishlistRouter.delete('/:id', verifyToken, async (req:Request, res:Response)=>{
    try{
         await Wishlist.findByIdAndDelete(req.params.id)

        res.status(200).json(`Wunschliste mit der id: ${req.params.id} wurde gelöscht`);

    } catch(error){
        res.status(404)
        throw new Error('Wishlist not found')
    }
})
wishlistRouter.get('/find', async (req:Request, res:Response)=>{
    try{
         const getAllWishlist = await Wishlist.find()
        res.status(200).json(getAllWishlist);

    } catch(error){
        res.status(404)
        throw new Error('Wishlist not found')
    }
})
export default wishlistRouter;