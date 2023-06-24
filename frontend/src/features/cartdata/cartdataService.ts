import axios from "axios";

const API_URL = 'http://localhost:5001/api/cartdata/';

const createCartdata = async (cartdata:object, token:string)=>{
    const config ={
        headers:{
            'Content_type': 'application/json',
            token:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, cartdata, config);
    return response.data;
}
const cartdataService = {
    createCartdata
}
export default cartdataService;