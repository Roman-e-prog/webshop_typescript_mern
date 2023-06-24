import axios from "axios";

const API_URL = 'http://localhost:5001/api/orderdata/'

const deleteOrderdata = async (orderId:string, token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + orderId, config)
    return response.data;
}
const getOrderdata = async (orderId:string, token:string)=>{
    const findUrl = `find/${orderId}`
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + findUrl, config)
    console.log(response.data);
    return response.data;
}
const getAllOrderdata = async (token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'find', config)
    return response.data;
}
const getIncome = async (token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'income', config)
    return response.data;
}
const getTownAnalyse = async (token:string)=>{
    const config = {
        headers:{
            token: `Bearer ${token}`
        }
    }
    const response = axios.get(API_URL+ 'townAnalyse', config);
    return (await response).data;
}
const orderdataService = {
    deleteOrderdata,
    getOrderdata,
    getAllOrderdata,
    getIncome,
    getTownAnalyse,
}
export default orderdataService;