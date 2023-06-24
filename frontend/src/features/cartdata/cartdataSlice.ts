import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import cartdataService from './cartdataService';
export interface Cartdata{
    user:object,
    cartProduct:object[],
    netto:number,
    amount:string, 
    quantity:number;
}
export interface InitialState{
    allCartdata: Cartdata[],
    isLoading: boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string
}
const initialState: InitialState = {
    allCartdata:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const createCartdata = createAsyncThunk<Cartdata, object, AsyncThunkConfig >('/cartdata/create', async (cartdata, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken
        return await cartdataService.createCartdata(cartdata, token);
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

const cartdataSlice = createSlice({
    name:"cartdata",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(createCartdata.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createCartdata.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allCartdata.push(action.payload);
        })
        .addCase(createCartdata.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
})

export default cartdataSlice.reducer;