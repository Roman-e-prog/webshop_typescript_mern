import axios from "axios";

const API_URL = 'http://localhost:5001/api/newsletterOrder/'

const deleteNewsletterOrder = async (id:string, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
        const response = await axios.delete(API_URL + id, config);
        return response.data
    }

const getAllNewsletterOrders = async (token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
        const response = await axios.get(API_URL + 'find', config);
        return response.data
}
   
const newsletterOrderService = {
    deleteNewsletterOrder,
    getAllNewsletterOrders,
}
export default newsletterOrderService;