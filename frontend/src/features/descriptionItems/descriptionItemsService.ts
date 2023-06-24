import axios from "axios";

const API_URL = 'http://localhost:5001/api/descriptionItem/';

const getDescriptionItem = async (Id:string)=>{
    const getUrl = `find/${Id}`
    
    const response = await axios.get(API_URL+getUrl);
    return response.data;
}
const getAllDescriptionItem = async ()=>{
    
    const response = await axios.get(API_URL+ 'find');
    return response.data;
}

const descriptionItemService = {
    getDescriptionItem,
    getAllDescriptionItem,
}

export default descriptionItemService;