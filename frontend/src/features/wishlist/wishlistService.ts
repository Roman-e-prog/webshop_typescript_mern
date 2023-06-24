import axios from "axios";
import '../axios-interceptors';
const API_URL = 'http://localhost:5001/api/wishlist/';

const createWishlist = async (wishlistData:object, token:string)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, wishlistData, config);
    return response.data;
}
const deleteWishlist = async (Id:string, token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + Id, config);
    return response.data;
}
const getAllWishlist = async ()=>{
    const response = await axios.get(API_URL + 'find');
    return response.data;
    
}
const wishlistService = {
    createWishlist,
    deleteWishlist,
    getAllWishlist,
}
export default wishlistService;