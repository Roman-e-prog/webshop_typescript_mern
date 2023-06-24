import axios from "axios";

const API_URL = 'http://localhost:5001/api/sliderItem/';


const getAllSliderItems = async ()=>{
    const response = await axios.get(API_URL+ 'find');
    return response.data;
}
const sliderItemService = {
    getAllSliderItems
}
export default sliderItemService;