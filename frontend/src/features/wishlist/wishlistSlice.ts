import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import wishlistService from './wishlistService';
import { PURGE } from "redux-persist";
export interface Wishlist{
    _id:string,
    id?:string,
    product:object,
    price:number,
    userId:string,
    size:number,
    quantity:number,
    color:string,
    createdAt:Date,
    updatedAt?:Date,
    accessToken?:string,
}
export interface InitialState{
    wishlist:Wishlist[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState ={
    wishlist:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const createWishlist = createAsyncThunk<Wishlist, object, AsyncThunkConfig>('/wishlist/create', async (wishlistData, thunkAPI)=>{
    try{
    const token = thunkAPI.getState().auth.user!.accessToken;
    return await wishlistService.createWishlist(wishlistData, token);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})

export const deleteWishlist = createAsyncThunk<Wishlist, string, AsyncThunkConfig>('/wishlist/delete', async (wishlistId, thunkAPI)=>{
    try{
    const token = thunkAPI.getState().auth.user!.accessToken;
    return await wishlistService.deleteWishlist(wishlistId, token);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getAllWishlist = createAsyncThunk<Wishlist[], void, AsyncThunkConfig>('/wishlist/findAll', async (_, thunkAPI)=>{
    try{
    return await wishlistService.getAllWishlist();
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers(builder) {
        builder
        .addCase(PURGE, ()=>initialState)
        .addCase(createWishlist.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist.push(action.payload)
        })
        .addCase(createWishlist.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteWishlist.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = state.wishlist.filter((item)=>item._id !== action.payload.id)
        })
        .addCase(deleteWishlist.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllWishlist.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getAllWishlist.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
      
    },
})
export const {reset} = wishlistSlice.actions;
export default wishlistSlice.reducer;
