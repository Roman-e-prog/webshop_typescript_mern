import axios from 'axios'
import { UpdateData } from '../../pages/userEdit/UserEdit';

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
const sendPasswordReset = async (userData:object)=>{
    const response = await axios.post(API_URL + 'forgot', userData);
    return response.data;
}
const newPassword = async (passwordData:object)=>{
    const response = await axios.post(API_URL + 'reset', passwordData);
    return response.data;
}

const userService = {
    updateUser,
    deleteUser,
    getUser,
    sendPasswordReset,
    newPassword,
}
export default userService;