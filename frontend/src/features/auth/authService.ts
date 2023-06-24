import axios from "axios";


const API_URL = 'http://localhost:5001/api/auth/';

//register
const register = async (userData:object) => {
    const response = await axios.post(API_URL + 'register',userData);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const login = async (userData:object)=>{
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const logout = ()=>{
    localStorage.removeItem('user');
}
const authService = {
    register,
    login,
    logout,
}
export default authService;
