import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import cartService from "./cartService";
// import User from '../user/userSlice';
export interface Cartdata{
    _id:string,
    id?:string,
    user: object,
    cartProduct:object[],
    netto:number;
    amount:string,
    quantity:number,
    createdAt:Date,
    updatedAt?:Date,
    total?:number,
    title?:string,
    size?:string,
    color?:string,
}
export interface InitialState{
    cartdata: Cartdata,
    allCartdata:Cartdata[],
    quantity:Cartdata[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState = {
    cartdata:{} as Cartdata,
    allCartdata:[],
    quantity:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig ={
    state:RootState
}
export const deleteCartdata = createAsyncThunk<Cartdata, string, AsyncThunkConfig>('cartdata/delete', async (cartId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await cartService.deleteCartdata(cartId, token);
    }catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getCartdata = createAsyncThunk<Cartdata, string, AsyncThunkConfig>('cartdata/find', async (cartId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await cartService.getCartdata(cartId, token)
    } catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
    
})
export const getAllCartdata = createAsyncThunk<Cartdata[], void, AsyncThunkConfig>('cartdata/findAll', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await cartService.getAllCartdata(token)
    } catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }   
})
export const getAllQuantity = createAsyncThunk<Cartdata[], void, AsyncThunkConfig>('cartdata/quantity', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await cartService.getAllQuantity(token)
    } catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }   
})

export const cartdataSlice = createSlice({
    name:"cartdata",
    initialState,
    reducers:{
        reset: (state)=>initialState
    },
    extraReducers(builder){
        builder
        .addCase(deleteCartdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCartdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allCartdata = state.allCartdata.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteCartdata.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getCartdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getCartdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.cartdata = action.payload;
        })
        .addCase(getCartdata.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getAllCartdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllCartdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allCartdata = action.payload;
        })
        .addCase(getAllCartdata.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getAllQuantity.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllQuantity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.quantity = action.payload;
        })
        .addCase(getAllQuantity.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
    },
})
export const {reset} = cartdataSlice.actions;
export default cartdataSlice.reducer;