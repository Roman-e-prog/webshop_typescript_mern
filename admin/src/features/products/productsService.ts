import axios from 'axios';
import { UpdateProductData } from '../../pages/ProductEdit';
const API_URL = 'http://localhost:5001/api/products/';

const createProduct = async (productData:FormData, token:string)=>{
    const config = {
        headers:{
            'Content-Type':"multipart/form-data",
            token: `Bearer ${token}`,
        }
    }
    const response =  await axios.post(API_URL, productData, config);
    return response.data;
}
const updateProduct = async (updateProductData:UpdateProductData, token:string)=>{
    const config ={
        headers:{
            'Content-Type':"multipart/form-data",
            token:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+updateProductData.id, updateProductData.productData, config);
    return response.data;
}
const deleteProduct = async (id:string, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}
const getProduct = async (id:string)=>{
    const getUrl = `find/${id}`;
    const response = await axios.get(API_URL+getUrl);
    return response.data;
}
const getAllProducts = async ()=>{
    const response = await axios.get(API_URL+ 'find');
    return response.data;
}
const productsService = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}
export default productsService;