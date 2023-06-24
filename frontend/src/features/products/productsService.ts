import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products/';

const getProduct = async (Id:string)=>{
    const getUrl = `find/${Id}`;
    const response = await axios.get(API_URL+ getUrl);
    return response.data
}
const getAllProducts = async ()=>{
    const response = await axios.get(API_URL+'find');
    return response.data
}
const productsService = {
    getProduct,
    getAllProducts
}
export default productsService;