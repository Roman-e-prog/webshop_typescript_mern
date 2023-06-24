import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import newsletterOrderService from './newsletterOrderService';
export interface NewsletterOrders{
    _id?:string,
    id?:string,
    vorname:string,
    nachname:string,
    email:string,
    radiodata:string,
}
export interface InitialState{
    newsletterOrder: NewsletterOrders[],
    newsletterOrders: NewsletterOrders[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState ={
    newsletterOrder: [],
    newsletterOrders: [],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const deleteNewsletterOrder = createAsyncThunk<NewsletterOrders, string, AsyncThunkConfig>('/newsletterOrders/find', async ( newsletterID, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken
        return await newsletterOrderService.deleteNewsletterOrder(newsletterID, token);
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

export const getAllNewsletterOrders = createAsyncThunk<NewsletterOrders[], void, AsyncThunkConfig>('/newsletterOrders/findAll', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken
        return await newsletterOrderService.getAllNewsletterOrders(token);
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
export const newsletterOrderSlice = createSlice({
    name:"newsletterOrders",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(deleteNewsletterOrder.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteNewsletterOrder.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletterOrder = state.newsletterOrder.filter((item)=>item.id !== action.payload._id);
        })
        .addCase(deleteNewsletterOrder.rejected, (state,action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllNewsletterOrders.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllNewsletterOrders.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletterOrders = action.payload;
        })
        .addCase(getAllNewsletterOrders.rejected, (state,action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
})
export default newsletterOrderSlice.reducer;