import axios from "axios";
import { UpdateSliderItemsData } from "../../pages/SliderItemsEdit";
const API_URL = 'http://localhost:5001/api/sliderItem/';

const createSliderItem = async (sliderItemData:FormData, token:string)=>{
    const config ={
        headers:{
            'Content-Type':"multipart/form-data",
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, sliderItemData, config);
    return response.data;
}
const updateSliderItem = async (updateSliderData:UpdateSliderItemsData, token:string)=>{
    const config ={
        headers:{
            'Content-Type':"multipart/form-data",
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URL+ updateSliderData.id, updateSliderData.sliderData, config);
    console.log(response.data)
    return response.data;
}
const deleteSliderItem = async (Id:string, token:string)=>{
    const config ={
        headers:{
            token: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL+ Id, config);
    return response.data;
}
const getSliderItem = async (Id:string)=>{
    const getUrl = `find/${Id}`
    const response = await axios.get(API_URL+ getUrl);
    return response.data;
}
const getAllSliderItems = async ()=>{
    const response = await axios.get(API_URL+ 'find');
    return response.data;
}
const sliderItemService = {
    createSliderItem,
    updateSliderItem,
    deleteSliderItem,
    getSliderItem,
    getAllSliderItems
}
export default sliderItemService;