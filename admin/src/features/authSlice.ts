import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import authService from './authService';
//User from localstorage
const user = JSON.parse(localStorage.getItem('user') || 'false');
interface User {
  _id?:string
  vorname:string
  nachname:string
  username:string
  email:string
  street:string
  number:string
  plz:string
  city:string
  password:string
  isAdmin:boolean
  createdAt: Date
  accessToken: string;
}
interface InitialState{
  user:User | null;
  isLoading:boolean
  isSuccess:boolean
  isError:boolean
  message: string
}
const initialState: InitialState = {
    user: user ? user : null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
};

//Register
export const register = createAsyncThunk('/auth/register', async (user:object, thunkAPI)=>{
    try{
        return await authService.register(user!);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
//login
export const login = createAsyncThunk('/auth/login', async (user:object, thunkAPI)=>{
      try{
        return await authService.login(user!);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
//logout

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers:(builder)=> {
      builder
      .addCase(register.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null; 
      })
      .addCase(login.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action:PayloadAction<User>)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(login.rejected, (state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state)=>{
        state.user = null;
      })
    },
})
export const {reset} = authSlice.actions;
export default authSlice.reducer;