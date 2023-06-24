import {Router, Request, Response} from 'express';
const sliderItemRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import upload from '../utils/multer';
const cloudinary = require('../utils/cloudinary');
import path from 'path'
import SliderItems from '../models/sliderItem';
sliderItemRouter.post('/',upload.single("img"), verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    
    let fileUrl = req.file!.path.replace(/\\/g, "/");
    
    try{
        const uploadResult = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "webshop_ts_mern",
            resource_type: "auto",
        })
        
        const newSliderItem = new SliderItems({
            cloudinary_id: uploadResult.public_id,
            title: req.body.title,
            alt: req.body.alt,
            img: uploadResult.secure_url,

        })
        const savedsliderItem = await newSliderItem.save();
        res.status(200).json(savedsliderItem);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
sliderItemRouter.put('/:id',upload.single("img"), verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        let updatedSliderItems = await SliderItems.findById(req.params.id);
        if(req.file){
        await cloudinary.uploader.destroy(updatedSliderItems?.cloudinary_id);
        }
       let result;
        if(req.file){
            let fileUrl = req.file!.path.replace(/\\/g, "/");
        result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "webshop_ts_mern",
            resource_type: "auto",
        })
        }
        const updatedSliderItem = {
            title: req.body.title || updatedSliderItems!.title,
            alt: req.body.alt || updatedSliderItems!.alt,
            cloudinary_id: result ? result.public_id : updatedSliderItems!.cloudinary_id,
            img: result ? result.secure_url : updatedSliderItems!.img,
        }
        updatedSliderItems = await SliderItems.findByIdAndUpdate(req.params.id, updatedSliderItem, {
            new:true,
        })
        res.status(200).json(updatedSliderItems);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
sliderItemRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        let deleteSliderItems = await SliderItems.findById(req.params.id);
        await cloudinary.uploader.destroy(deleteSliderItems!.cloudinary_id);
         await deleteSliderItems!.remove();
        res.status(200).json("SliderItem wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
sliderItemRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const sliderItem = await SliderItems.findById(req.params.id);
        res.status(200).json(sliderItem)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
sliderItemRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allsliderItem = await SliderItems.find();
        res.status(200).json(allsliderItem)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default sliderItemRouter;

