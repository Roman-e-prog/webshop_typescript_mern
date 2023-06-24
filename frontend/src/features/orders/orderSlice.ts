import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import orderdataService from './orderService';
export interface Orderdata{
    user:object,
    netto:number,
    amount:string, 
}
export interface InitialState{
    allOrderdata: Orderdata[],
    isLoading: boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string
}
const initialState: InitialState = {
    allOrderdata:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const createOrderdata = createAsyncThunk<Orderdata, object, AsyncThunkConfig >('/orderdata/create', async (orderdata, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken
        return await orderdataService.createOrderdata(orderdata, token);
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

const orderdataSlice = createSlice({
    name:"orderdata",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(createOrderdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createOrderdata.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allOrderdata.push(action.payload);
        })
        .addCase(createOrderdata.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
})

export default orderdataSlice.reducer;