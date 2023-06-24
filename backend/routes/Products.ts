import {Router, Request, Response} from 'express';
const productsRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import Products from '../models/products';
import upload from '../utils/multer';
const cloudinary = require('../utils/cloudinary');
import path from 'path'
productsRouter.post('/', upload.single('image'), verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        const uploadResult = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "webshop_ts_mern",
            resource_type: "auto",
        })
        
        const newProducts = new Products({
            cloudinary_id: uploadResult.public_id,
            title: req.body.title,
            producer: req.body.producer,
            categories: JSON.parse(req.body.categories).split(' '),
            desc: req.body.desc,
            price: req.body.price,
            currency:req.body.currency,
            colors:JSON.parse(req.body.colors).split(' '),
            sizes: JSON.parse(req.body.sizes).split(' '),
            inStock: req.body.inStock,
            sale:req.body.sale,
            image: uploadResult.secure_url,

        })
        const savedproducts = await newProducts.save();
        res.status(200).json(savedproducts);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsRouter.put('/:id',upload.single("image"), verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        let updatedProducts = await Products.findById(req.params.id);
        
        if(req.file){
        await cloudinary.uploader.destroy(updatedProducts?.cloudinary_id);
        }
       let result;
        if(req.file){
            let fileUrl = req.file?.path.replace(/\\/g, "/");
        result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "webshop_ts_mern",
            resource_type: "auto",
        })
        }
        const updatedData = {
            title: req.body.title || updatedProducts!.title,
            producer: req.body.producer || updatedProducts!.producer,
            categories: JSON.parse(req.body.categories) || updatedProducts!.categories,
            desc: req.body.desc || updatedProducts!.desc,
            price: req.body.price || updatedProducts!.price,
            currency: req.body.currency || updatedProducts!.currency,
            colors: JSON.parse(req.body.colors) || updatedProducts!.colors,
            sizes: JSON.parse(req.body.sizes) || updatedProducts!.sizes,
            inStock: req.body.inStock || updatedProducts!.inStock,
            sale: req.body.sale || updatedProducts!.sale,
            cloudinary_id: result ? result.public_id : updatedProducts!.cloudinary_id,
            image: result ? result.secure_url : updatedProducts!.image,
        }
        updatedProducts = await Products.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })
        res.status(200).json(updatedProducts);
    } catch(error){
        res.status(404)
        throw new Error('Not found')
    }
});
//delete
productsRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        let deleteProducts = await Products.findById(req.params.id);
        await cloudinary.uploader.destroy(deleteProducts!.cloudinary_id);
         await deleteProducts?.remove();
        res.status(200).json("Produkt wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const products = await Products.findById(req.params.id);
        res.status(200).json(products)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsRouter.get('/find/', async (req:Request, res:Response)=>{
        try{
        const allProducts = await Products.find()
        res.status(200).json(allProducts);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsRouter;

