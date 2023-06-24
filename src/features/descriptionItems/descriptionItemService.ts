import axios from "axios";
import { UpdateDescriptionData } from "../../pages/DescriptionItemsEdit";

const API_URL = 'http://localhost:5001/api/descriptionItem/';

const createDescriptionItem = async (descriptionItemData:object, token:string)=>{
    const config = {
        headers:{
            'Content-Type':"application/json",
            token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, descriptionItemData, config);
    return response.data
}
const updateDescriptionItem = async (updateDescData:UpdateDescriptionData, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+updateDescData.id, updateDescData.descriptiondata, config);
    return response.data;
}
const deleteDescriptionItem = async (Id:string, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+Id, config);
    return response.data;
}
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
    createDescriptionItem,
    updateDescriptionItem,
    deleteDescriptionItem,
    getDescriptionItem,
    getAllDescriptionItem,
}

export default descriptionItemService;