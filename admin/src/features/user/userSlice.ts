import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UpdateData } from '../../pages/UserDisplay';
import userService from './userService';
import { PURGE } from 'redux-persist'
export interface User{
  _id?:string,
  id?:string,
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
  updatedAt?: Date
  accessToken?: string
  total?:number
}
export interface InitialState{
    user:User[],
    allUser:User[],
    userStats:User[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState ={
    user:[],
    allUser:[],
    userStats:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",

}

type AsyncThunkConfig = {
    state: RootState
}
export const updateUser = createAsyncThunk<User[], UpdateData, AsyncThunkConfig>('/user/update', async (updateData, thunkAPI)=>{
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await userService.updateUser(updateData, token);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
});
export const deleteUser = createAsyncThunk<User, string, AsyncThunkConfig>('/user/delete', async (Id:string, thunkAPI)=>{
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await userService.deleteUser(Id, token);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
});
export const getUser = createAsyncThunk<User[], string, AsyncThunkConfig>('/user/find', async (Id:string, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await userService.getUser(Id, token);
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
export const getAllUser = createAsyncThunk<User[], void, AsyncThunkConfig>('/user/findAll', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await userService.getAllUser(token);
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers(builder) {
      builder
      .addCase(PURGE, ()=>initialState)
      .addCase(updateUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = state.user.filter((item)=>item._id !== action.payload.id)
      })
      .addCase(deleteUser.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; 
      })
      .addCase(getUser.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.allUser = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
})

export const {reset} = userSlice.actions;
export default userSlice.reducer;