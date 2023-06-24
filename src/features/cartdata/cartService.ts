import axios from "axios";

const API_URL = 'http://localhost:5001/api/cartdata/'

const deleteCartdata = async (cartId:string, token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + cartId, config)
    return response.data;
}
const getCartdata = async (cartId:string, token:string)=>{
    const findUrl = `find/${cartId}`
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + findUrl, config)
    console.log(response.data);
    return response.data;
}
const getAllCartdata = async (token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'find', config)
    console.log(response.data)
    return response.data;
}
const getAllQuantity = async (token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'quantity', config)
    console.log(response.data)
    return response.data;
}
const cartService = {
    deleteCartdata,
    getCartdata,
    getAllCartdata,
    getAllQuantity,
}
export default cartService;