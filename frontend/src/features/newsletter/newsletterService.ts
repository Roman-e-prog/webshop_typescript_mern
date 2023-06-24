import axios from "axios";

const API_URL = 'http://localhost:5001/api/newsletterOrder/';

const orderNewsletter = async (newsletterData:object)=>{
    const config = {
        headers:{
            'Content-type': 'application/json',
        }
    }
    const response =  await axios.post(API_URL, newsletterData, config);
    return response.data;
}
const newsletterService = {
    orderNewsletter,
}
export default newsletterService;