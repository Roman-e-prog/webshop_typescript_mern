import axios from 'axios'
import { UpdateData } from '../../pages/UserDisplay';

const API_URL = 'http://localhost:5001/api/user/';

const updateUser = async (updateData:UpdateData, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + updateData.id, updateData.userData, config);
    return response.data
}
const deleteUser = async (userId:string, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + userId, config);
    return response.data;
}
const getUser = async (userId:string, token:string)=>{
    const getUrl = API_URL + `find/${userId}`;
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.get(getUrl, config);
    return response.data;
}
const getAllUser = async (token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'find', config);
    return response.data;
}


const userService = {
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
}
export default userService;