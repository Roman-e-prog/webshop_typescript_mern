import axios from 'axios';
import { UpdateMessageData } from '../../components/MessagesEdit';
const API_URL = 'http://localhost:5001/api/messages/';

const createMessage = async (messageData:object, token:string)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
            token: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, messageData, config);
    return response.data
}
const updateMessage = async (updateMessageData:UpdateMessageData, token:string)=>{
    const config ={
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+updateMessageData.id, updateMessageData.userMessageData, config);
    return response.data;
}
const deleteMessage = async (id:string, token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}
const getMessage = async (id:string, token:string)=>{
    const getUrl = `find/${id}`;
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+getUrl, config);
    return response.data;
}
const getAllMessages = async (token:string)=>{
    const config = {
        headers:{
            token:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+ 'find', config);
    return response.data;
}
const messageService = {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessage,
    getAllMessages
}
export default messageService;