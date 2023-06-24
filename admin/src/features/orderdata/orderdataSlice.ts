import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import orderdataService from "./orderdataService";

export interface Orderdata{
    _id:string,
    id?:string,
    user:object,
    netto:number;
    amount:string,
    quantity:number,
    createdAt:Date,
    updatedAt?:Date,
    total?:number,
    year?:number,
    month?:number,
    day?:number,
}
export interface TownAnalyse{
    _id:{city:string, plz:string},
    totalNetto:number,
    userCount:number,
}
export interface InitialState{
    orderdata: Orderdata,
    allOrderdata:Orderdata[],
    income:Orderdata[],
    townAnalyse:TownAnalyse[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState = {
    orderdata:{} as Orderdata,
    allOrderdata:[],
    income:[],
    townAnalyse:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig ={
    state:RootState
}
export const deleteOrderdata = createAsyncThunk<Orderdata, string, AsyncThunkConfig>('orderdata/delete', async (orderId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await orderdataService.deleteOrderdata(orderId, token);
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
export const getOrderdata = createAsyncThunk<Orderdata, string, AsyncThunkConfig>('orderdata/find', async (orderId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await orderdataService.getOrderdata(orderId, token)
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
export const getAllOrderdata = createAsyncThunk<Orderdata[], void, AsyncThunkConfig>('orderdata/findAll', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await orderdataService.getAllOrderdata(token)
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
export const getIncome = createAsyncThunk<Orderdata[], void, AsyncThunkConfig>('orderdata/income', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await orderdataService.getIncome(token)
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
export const getTownAnalyse = createAsyncThunk<TownAnalyse[],void,AsyncThunkConfig>('orderdata/townanalyse', async (_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await orderdataService.getTownAnalyse(token)
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

export const orderdataSlice = createSlice({
    name:"orderdata",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(deleteOrderdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteOrderdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allOrderdata = state.allOrderdata.filter((item)=> item._id !== action.payload.id);
        })
        .addCase(deleteOrderdata.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getOrderdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getOrderdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.orderdata = action.payload;
        })
        .addCase(getOrderdata.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getAllOrderdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllOrderdata.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allOrderdata = action.payload;
        })
        .addCase(getAllOrderdata.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getIncome.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getIncome.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.income = action.payload;
        })
        .addCase(getIncome.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getTownAnalyse.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getTownAnalyse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.townAnalyse = action.payload;
        })
        .addCase(getTownAnalyse.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
    },
})

export default orderdataSlice.reducer;