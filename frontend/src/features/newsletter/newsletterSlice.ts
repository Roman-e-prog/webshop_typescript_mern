import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import newsletterService from "./newsletterService";
export interface NewsletterOrder{
    vorname:string,
    nachname:string,
    email:string,
    radiodata:string,
}
export interface InitialState{
    newsletterOrder: NewsletterOrder[],
    isSuccess:boolean,
    isError:boolean,
    isLoading:boolean,
    message:string,
}
const initialState:InitialState ={
    newsletterOrder:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
type AsyncThunkConfig ={
    state:RootState
}
export const orderNewsletter = createAsyncThunk<NewsletterOrder, object, AsyncThunkConfig>("/newsletterOrder/create" ,async (newsletterData, thunkAPI)=>{
    try{
        return await newsletterService.orderNewsletter(newsletterData);
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

const newsletterOrderSlice = createSlice({
    name:"newsletterOrder",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(orderNewsletter.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(orderNewsletter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.newsletterOrder.push(action.payload);
        })
        .addCase(orderNewsletter.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    },
})
export default newsletterOrderSlice.reducer;