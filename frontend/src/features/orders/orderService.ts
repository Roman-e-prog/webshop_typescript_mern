import axios from "axios";

const API_URL = 'http://localhost:5001/api/orderdata/';

const createOrderdata = async (orderdata:object, token:string)=>{
    const config ={
        headers:{
            'Content_type': 'application/json',
            token:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, orderdata, config);
    return response.data;
}
const orderdataService = {
    createOrderdata
}
export default orderdataService;